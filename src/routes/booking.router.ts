import { Router } from 'express'
import { createBooking, fetchBookings, fetchBookingForStaff } from '../controllers/booking.controller'
import { auth } from '../middlewares/auth.middleware'

export default Router()
    .get('/', auth, fetchBookings)
    .get('/staff', auth, fetchBookingForStaff)
    .post('/', auth, createBooking)