import { Router } from 'express'

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController'
import { DevolutionController } from '@modules/rentals/useCases/devolution/DevolutionController'
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController'

import { checkAuth } from '../middlewares/checkAuth'

const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionController = new DevolutionController()
const listRentalsByUserController = new ListRentalsByUserController()

rentalRoutes.post('/', checkAuth, createRentalController.handle)
rentalRoutes.post('/devolution/:id', checkAuth, devolutionController.handle)
rentalRoutes.get('/user', checkAuth, listRentalsByUserController.handle)

export { rentalRoutes }
