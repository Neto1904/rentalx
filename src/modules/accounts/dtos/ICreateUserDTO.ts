interface ICreateUserDTO {
  name: string
  password: string
  driverLicense: string
  email: string
  avatar?: string
  id?: string
}

export { ICreateUserDTO }
