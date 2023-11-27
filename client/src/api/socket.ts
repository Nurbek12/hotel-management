import { io } from 'socket.io-client'
import { uri } from './index'

const socket = io(uri)

export const joinchat = (id: string) => socket.emit('join-chat', id)

export const sendmessage = (message: any) => socket.emit('send-message', message)

export const deletemessage = (data: any) => socket.emit('delete-message', data)

export const deleteinmessage = (cb: any) => socket.on('delete-in-message', data => cb(data))

export const editmessage = (data: any) => socket.emit('edit-message', data)

export const editinmessage = (cb: any) => socket.on('edit-in-message', data => cb(data))

export const getmessage = (cb: any) => socket.on('get-message', message => cb(message))

export const addchat = (chat: any, userid: string) => socket.emit('add-chat', chat, userid)

export const getchat = (cb: any) => socket.on('get-chat', chat => cb(chat))

export const removechat = (id: string) => socket.emit('remove-chat', id)

export const removeinchat = (cb: any) => socket.on('remove-in-chat', id => cb(id))



export const userconnected = (cb: any) => socket.on('user-connected', id => cb(id))

export const userdisconnect = (cb: any) => socket.on('user-disconnected', id => cb(id))

export const joinvideochat = (roomid: string, id: string) => socket.emit('join-room', roomid, id)