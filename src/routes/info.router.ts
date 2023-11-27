import { Router } from 'express'
import { fetchInfoData } from '../controllers/info.controller'
import { auth } from '../middlewares/auth.middleware'

export default Router()
    .get('/data', auth, fetchInfoData)