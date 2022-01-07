import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory'
import { SendForgotPasswordMailUseCase } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMail.UseCase'
import { DayJsDateProvider } from '@shared/container/providers/dateProvider/implementations/DayJsDateProvider'
import { MailProviderInMemory } from '@shared/container/providers/mailProvider/in-memory/MailProviderInMemory'
import { AppError } from '@shared/errors/AppError'

let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayJsDateProvider
let mailProvider: MailProviderInMemory

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase

describe('Send forgot password email', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayJsDateProvider()
    mailProvider = new MailProviderInMemory()
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  it('should send a forgot password email', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail')

    await usersRepositoryInMemory.create({
      driverLicense: '12345',
      email: 'test@example.com',
      name: 'test',
      password: 'testpassword',
    })

    await sendForgotPasswordMailUseCase.execute('test@example.com')

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not send a forgot password email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('test@example.com')
    ).rejects.toEqual(new AppError('User does not exists'))
  })

  it('should create a new user token', async () => {
    const created = jest.spyOn(usersTokensRepositoryInMemory, 'create')

    await usersRepositoryInMemory.create({
      driverLicense: '12345',
      email: 'test@example.com',
      name: 'test',
      password: 'testpassword',
    })

    await sendForgotPasswordMailUseCase.execute('test@example.com')

    expect(created).toHaveBeenCalled()
  })
})
