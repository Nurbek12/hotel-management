import { secret } from '../config/keys'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export interface AppRequest extends Request {
    user?: { name: string, email: string, id: string, image: string }
}

export const auth = (req: AppRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    if(!authorization) return res.status(401).json({ status: "warning", message: "You can't call this request!" })
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, secret!, (err, payload: any) => {
        if(err) return res.status(401).json({ status: "warning", message: "You can't call this request!" })
        req.user = payload
        next()
    })
}