import { Router } from 'express'

import { checkAuth } from '../middlewares/checkAuth'
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.use(checkAuth)
specificationsRoutes.post('/', createSpecificationController.handle)

export { specificationsRoutes }
