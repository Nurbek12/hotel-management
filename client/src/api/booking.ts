import api from './index'

export const get_bookings = (query: string) => api.get(`/api/booking?${query}`)

export const get_staff_bookings = (query: string) => api.get(`/api/booking/staff?${query}`)

export const create_booking = (data: any) => api.post('/api/booking', data)
