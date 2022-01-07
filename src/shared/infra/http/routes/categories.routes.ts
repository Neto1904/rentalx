import { Router } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoriesController } from '../../../../modules/cars/useCases/importCategories/importCategoriesController'
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController'
import { checkAdmin } from '../middlewares/checkAdmin'
import { checkAuth } from '../middlewares/checkAuth'

const categoriesRoutes = Router()

const upload = multer({
  dest: './tmp',
})

const createCategoryController = new CreateCategoryController()
const importCategoriesController = new ImportCategoriesController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post(
  '/',
  checkAuth,
  checkAdmin,
  createCategoryController.handle
)

categoriesRoutes.get('/', listCategoriesController.handle)

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoriesController.handle
)

export { categoriesRoutes }
