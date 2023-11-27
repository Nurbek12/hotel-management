import { Router } from 'express'
import { createUser, updateUser, fetchUsers, deleteUser, loginUser } from '../controllers/user.conroller'
import { auth } from '../middlewares/auth.middleware'
import { localeUpload, cloudUpload } from '../middlewares/file.middleware'

export default Router()
    .get('/', auth, fetchUsers)
    .post('/create', auth, localeUpload.single('file'), cloudUpload, createUser)
    .post('/login', loginUser)
    .put('/:id', auth, localeUpload.single('file'), cloudUpload, updateUser)
    .delete('/:id', auth, deleteUser)