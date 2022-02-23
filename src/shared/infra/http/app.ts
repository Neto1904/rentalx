import cors from 'cors'
import env from 'dotenv-safe'
import express from 'express'
import 'express-async-errors'
import swagger from 'swagger-ui-express'

import upload from '@config/upload'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter'

import '../typeorm'

import swaggerFile from '../../../../docs/hidro.json'
import '../../container'
import { checkError } from '../../errors/checkError'
import { routes } from './routes/index.routes'

env.config()

const app = express()

app.use(rateLimiter)

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
})

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

app.use(express.json())

app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile))
app.use('/avatar', express.static(`${upload.folder}/avatar`))
app.use('/cars', express.static(`${upload.folder}/cars`))
app.use(cors())
app.use(routes)
app.use(Sentry.Handlers.errorHandler())
app.use(checkError)

export { app }
