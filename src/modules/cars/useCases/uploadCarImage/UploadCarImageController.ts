import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UploadCarImageUseCase } from './UploadCarImageUseCase'

interface IFiles {
  filename: string
}

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const files = request.files as IFiles[]
    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase)
    const fileNames = files.map((file) => file.filename)
    await uploadCarImageUseCase.execute({ carId: id, imageNames: fileNames })
    return response.status(201).send()
  }
}

export { UploadCarImageController }
