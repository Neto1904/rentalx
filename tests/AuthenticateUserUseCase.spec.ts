import { AppError } from "@errors/AppError"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/AunthenticateUserUseCase"
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
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

  it('should not be able tor authenticate a non-existing user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@example',
        password: '123',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate user with incorrect password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driverLicense: '00000',
        email: 'user@example',
        name: 'user',
        password: '123',
      }
      await createUserUseCase.execute(user)
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong-password',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
