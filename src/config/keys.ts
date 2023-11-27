import { config } from 'dotenv'

config()

export const pguri = process.env.DATABASE_URL
export const port = process.env.PORT
export const secret = process.env.SECRET

export const privateKey = process.env.IMAGEKIT_PPV_KEY!
export const publicKey = process.env.IMAGEKIT_PUB_KEY!
export const urlEndpoint = process.env.IMAGEKIT_URL_END!