import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { ProfileUserController } from '@modules/accounts/useCases/profileUser/ProfileUserController'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'

import { checkAuth } from '../middlewares/checkAuth'

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const profileUserController = new ProfileUserController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  checkAuth,
  updateUserAvatarController.handle
)
usersRoutes.get('/profile', checkAuth, profileUserController.handle)

export { usersRoutes }
