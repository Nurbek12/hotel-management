import multer from 'multer'
import { v4 as uuid } from 'uuid'
import { join, extname } from 'path'
import { uploadImage, fileurl } from '../config/upload'
import { Request, Response, NextFunction } from 'express'

const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, join(__dirname, '../', '../', 'uploaded')),
    filename: (_, file, cb) => cb(null, `f-${uuid()}${extname(file.originalname)}`)
})

export const localeUpload = multer({ storage })

export const cloudUpload = async (req: Request, _: Response, next: NextFunction) => {
    if(req.query?.offile){
        if(req.file) {
            req.body.file = fileurl(req, req.file)
            return next()
        }
    }else{
        if(req.file) return uploadImage(req.file, (result: any) => {
            req.body.file = result.url
            next()
        })
    }
    next()
}