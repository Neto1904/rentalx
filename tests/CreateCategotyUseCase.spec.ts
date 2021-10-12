import { AppError } from "@errors/AppError"
import { ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository"
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "@modules/cars/useCases/createCategory/CreateCategoryUseCase"


let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    )
  })

  it('should be able to create a category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Description Test',
    }
    await createCategoryUseCase.execute(category)
    const createdCategory = await categoriesRepositoryInMemory.findByName(
      category.name
    )
    expect(createdCategory).toHaveProperty('id')
  })

  it('should not be able to create a new category when name already exists', async () => {
    expect(async () => {
      const category: ICreateCategoryDTO = {
        name: 'Category Test',
        description: 'Description Test',
      }
      await createCategoryUseCase.execute(category)
      await createCategoryUseCase.execute(category)
    }).rejects.toBeInstanceOf(AppError)
  })
})
