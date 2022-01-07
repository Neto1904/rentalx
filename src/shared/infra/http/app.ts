import express from 'express'
import 'express-async-errors'
import swagger from 'swagger-ui-express'

import upload from '@config/upload'

import '../typeorm'
import swaggerFile from '../../../../docs/hidro.json'
import '../../container'
import { checkError } from '../../errors/checkError'
import { routes } from './routes/index.routes'

const app = express()

app.use(express.json())
app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile))
app.use('/avatar', express.static(`${upload.folder}/avatar`))
app.use('/cars', express.static(`${upload.folder}/cars`))
app.use(routes)
app.use(checkError)

export { app }
