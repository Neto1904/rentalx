import env from 'dotenv-safe'
import { NextFunction, Request, Response } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import * as redis from 'redis'

import { AppError } from '@shared/errors/AppError'

env.config()

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  legacyMode: true,
})

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 10, // 10 requests
  duration: 1, // per 1 second by IP
})

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await redisClient.connect()
    await limiter.consume(request.ip)
    return next()
  } catch (err) {
    console.log(err)
    throw new AppError('Too many requests', 429)
  }
}
