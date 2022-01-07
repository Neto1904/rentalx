import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory'
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser/AunthenticateUserUseCase'
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase'
import { DayJsDateProvider } from '@shared/container/providers/dateProvider/implementations/DayJsDateProvider'
import { AppError } from '@shared/errors/AppError'

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayJsDateProvider

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayJsDateProvider()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driverLicense: '00000',
      email: 'user@example',
      name: 'user',
      password: '123',
    }
    await createUserUseCase.execute(user)
    const authorization = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })
    expect(authorization).toHaveProperty('token')
  })

  it('should not be able tor authenticate a non-existing user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@example',
        password: '123',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'))
  })

  it('should not be able to authenticate user with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driverLicense: '00000',
      email: 'user@example',
      name: 'user',
      password: '123',
    }
    await createUserUseCase.execute(user)
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong-password',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'))
  })
})
