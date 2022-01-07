import { Router } from 'express'

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'

import { checkAuth } from '../middlewares/checkAuth'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.use(checkAuth)
specificationsRoutes.post('/', createSpecificationController.handle)

export { specificationsRoutes }
