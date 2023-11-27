import { Router } from 'express'
import { createRoom, fetchRoomsByType, dischargeRoom, deleteRoom, fetchRooms, updateRoom } from '../controllers/room.controller'
import { auth } from '../middlewares/auth.middleware'

export default Router()
    .get('/', auth, fetchRooms)
    .get('/type/:id', auth, fetchRoomsByType)
    .post('/', auth, createRoom)
    .put('/:id', auth, updateRoom)
    .put('/discharge/:id', auth, dischargeRoom)
    .delete('/:id', auth, deleteRoom)