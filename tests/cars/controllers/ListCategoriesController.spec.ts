import { hash } from 'bcrypt'
import moment from 'moment'
import request from 'supertest'
import { Connection, createConnection, getConnectionOptions } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import { app } from '@shared/infra/http/app'

let connection: Connection

describe('List categories controller', () => {
  beforeAll(async () => {
    const options = await getConnectionOptions()
    Object.assign(options, {
      host: 'localhost',
      port: 5433,
      database: 'rentx-test',
    })
    connection = await createConnection({
      ...options,
    })
    await connection.runMigrations()
    const id = uuidv4()
    const password = await hash('admin', 8)
    const date = moment().toISOString()

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license) 
        VALUES('${id}', 'admin', 'admin@rentx.com', '${password}', true, '${date}', 'admin')`
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should list all categories', async () => {
    const {
      body: { refreshToken: token },
    } = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    })

    await request(app)
      .post('/categories')
      .send({
        name: 'test',
        description: 'test',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const response = await request(app).get('/categories')

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
  })
})
