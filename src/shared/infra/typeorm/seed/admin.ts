import { hash } from 'bcrypt'
import moment from 'moment'
import { createConnection } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

async function create() {
  const connection = await createConnection()
  const id = uuidv4()
  const password = await hash('admin', 8)
  const date = moment().toISOString()

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license) 
      VALUES('${id}', 'admin', 'admin@rentx.com', '${password}', true, '${date}', 'admin')`
  )

  console.log('Admin user created')
}

create()
