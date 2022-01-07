import { createConnection, getConnectionOptions } from 'typeorm'

interface IOptions {
  host: string
  port: number
  database: string
}

getConnectionOptions().then((options) => {
  const newOptions = options as IOptions
  newOptions.host =
    process.env.NODE_ENV === 'test' ? 'localhost' : 'database_ignite' // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
  newOptions.port = process.env.NODE_ENV === 'test' ? 5433 : 5432
  newOptions.database = process.env.NODE_ENV === 'test' ? 'rentx-test' : 'rentx'
  createConnection({
    ...options,
  })
})
