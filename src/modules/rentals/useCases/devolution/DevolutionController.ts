import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DevolutionUseCase } from './DevolutionUseCase'

class DevolutionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: rentalId } = request.params
    const { id: userId } = request
    const devolutionUseCase = container.resolve(DevolutionUseCase)
    const rental = await devolutionUseCase.execute({
      rentalId,
      userId,
    })

    return response.status(200).json(rental)
  }
}

export { DevolutionController }
