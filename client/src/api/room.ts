import api from './index'

export const get_rooms = (query: any) => api.get(`/api/room?${query}`)

export const get_rooms_by_type = (id: string) => api.get(`/api/room/type/${id}`)

export const create_room = (data: any) => api.post('/api/room', data)

export const update_room = (id: string, data: any) => api.put(`/api/room/${id}`, data)

export const discharge_room = (id: string) => api.put(`/api/room/discharge/${id}`)

export const delete_room = (id: string) => api.delete(`/api/room/${id}`)
