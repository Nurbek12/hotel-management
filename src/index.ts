import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { port } from './config/keys'
import cors from 'cors'
import userRouter from './routes/user.router'
import typeRouter from './routes/type.router'
import roomRouter from './routes/room.router'
import bookingRouter from './routes/booking.router'
import infoRouter from './routes/info.router'
import chatRouter from './routes/chat.router'
import socket from './config/socket'
import { join } from 'path'
// import { PeerServer } from 'peer'

const app = express()
const server = createServer(app)
// const perserver = PeerServer({host: 'localhost', path: '/myapp', port: 9000})

app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(express.static(join(__dirname, '../', 'client/dist')))
    .use('/api/user', userRouter)
    .use('/api/room', roomRouter)
    .use('/api/types', typeRouter)
    .use('/api/booking', bookingRouter)
    .use('/api/info', infoRouter)
    .use('/api/chat', chatRouter)
    .use('*', async (_, res) => {
        res.sendFile(join(__dirname, '../', 'client/dist/index.html'))
    })
// .get('/peerjs', perserver)

const io = new Server(server, { 
    cors: {
        origin: 'http://localhost:5173',
        credentials: true 
    },
    path: '/socket.io' 
})

socket(io)

server
    .listen(port, () => console.log("Server started..."))