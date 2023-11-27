import { Router } from 'express'
import { createType, deleteType, fetchTypes, updateType } from '../controllers/type.controller'
import { auth } from '../middlewares/auth.middleware'

export default Router()
    .get('/', auth, fetchTypes)
    .post('/', auth, createType)
    .put('/:id', auth, updateType)
    .delete('/:id', auth, deleteType)