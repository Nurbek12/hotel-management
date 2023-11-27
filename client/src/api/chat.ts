import api from './index'

export const get_chats = (id: string) => api.get(`/api/chat/${id}`)

export const add_chats = (data: any) => api.post(`/api/chat`, data)

export const delete_chat = (id: string) => api.delete(`/api/chat/delete/${id}`)

export const get_messages = (id: string) => api.get(`/api/chat/messages/${id}`)

export const send_message = (message: any) => api.post(`/api/chat/message`, message)

export const edit_message = (id: string, message: any) => api.put(`/api/chat/message/${id}`, message)

export const delete_messages = (messages: any) => api.delete(`/api/chat/messages?ids=${messages}`)