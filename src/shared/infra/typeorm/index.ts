import { createConnection, getConnectionOptions } from 'typeorm'

interface IOptions {
  host: string
  port: number
  database: string
}

getConnectionOptions().then((options) => {
  const newOptions = options as IOptions
  newOptions.port = process.env.NODE_ENV === 'test' ? 5433 : 5432
  newOptions.database = process.env.NODE_ENV === 'test' ? 'rentx-test' : 'rentx'
  createConnection({
    ...options,
  })
})
