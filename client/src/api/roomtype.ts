import api from './index'

export const get_types = () => api.get('/api/types')

export const create_type = (data: any) => api.post('/api/types', data)

export const update_type = (id: string, data: any) => api.put(`/api/types/${id}`, data)

export const delete_type = (id: string) => api.delete(`/api/types/${id}`)