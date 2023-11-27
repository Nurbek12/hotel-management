import api from './index'

export const get_users = (query: string) => api.get(`/api/user?${query}`)

export const create_user = (data: any) => api.post('/api/user/create', data)

export const update_user = (id: string, data: any) => api.put(`/api/user/${id}`, data)

export const delete_user = (id: string) => api.delete(`/api/user/${id}`)