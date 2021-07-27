import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'
import { ImportCategoriesController } from './importCategoriesController'
import { ImportCategoriesUseCase } from './importCategoriesUseCase'

/* const categoryRepository = CategoriesRepository.getInstance()
const importCategoriesUseCase = new ImportCategoriesUseCase(categoryRepository)
const importCategoriesController = new ImportCategoriesController(
  importCategoriesUseCase
) */

const importCategoriesController = new ImportCategoriesController(
  new ImportCategoriesUseCase(CategoriesRepository.getInstance())
)
export { importCategoriesController }
