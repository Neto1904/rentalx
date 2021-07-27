import { SpecificationRepository } from '../../repositories/implementations/SpecificationRepository'

interface IRequest {
  name: string
  description: string
}

class CreateSpecificationUseCase {
  constructor(private specificationRepository: SpecificationRepository) {}
  execute({ name, description }: IRequest): void {
    const specification = this.specificationRepository.findByName(name)
    if (specification) {
      throw new Error('Specification already exists')
    }
    this.specificationRepository.create({ name, description })
  }
}

export { CreateSpecificationUseCase }
