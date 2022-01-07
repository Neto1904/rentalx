import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

class ListAvailableCarsController {
  async handle(request: Request, response: Response) {
    const { brand, name, categoryId } = request.query

    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)

    const cars = await listAvailableCarsUseCase.execute({
      brand: brand ? String(brand) : null,
      name: name ? String(name) : null,
      categoryId: categoryId ? String(categoryId) : null,
    })

    return response.json(cars)
  }
}

export { ListAvailableCarsController }
