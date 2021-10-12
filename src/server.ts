import express from 'express'
import 'express-async-errors'
import swagger from 'swagger-ui-express'

import './database'
import swaggerFile from '../docs/hidro.json'
import './shared/container'
import { checkError } from './errors/checkError'
import { routes } from './routes/index.routes'

const app = express()

app.use(express.json())
app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile))
app.use(routes)
app.use(checkError)

app.listen(3333, () => {
  console.log('Server is running')
})
