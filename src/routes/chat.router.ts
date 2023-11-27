import { Router } from "express"
import { getChats, createChat, getMessages, deleteChat, createMessage, deleteMessage, editMessage } from '../controllers/chat.controller'
import { localeUpload, cloudUpload } from '../middlewares/file.middleware'
import { auth } from '../middlewares/auth.middleware'

export default Router()
    .get('/:id', auth, getChats)
    .post('/', auth, createChat)
    .delete('/delete/:id', auth, deleteChat)

    .get('/messages/:chatid', auth, getMessages)
    .post('/message', auth, localeUpload.single('file'), cloudUpload, createMessage)
    .put('/message/:id', auth, localeUpload.single('file'), cloudUpload, editMessage)
    .delete('/messages', auth, deleteMessage)