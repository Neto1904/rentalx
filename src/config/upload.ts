import crypto from 'crypto'
import multer from 'multer'
import { resolve } from 'path'

const folder = resolve(__dirname, '..', '..', 'tmp')

export default {
  folder,
  storage: multer.diskStorage({
    destination: folder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`
      return callback(null, fileName)
    },
  }),
}
