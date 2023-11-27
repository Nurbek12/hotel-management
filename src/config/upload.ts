import fs from 'fs'
import url from 'url'
import { join } from 'path'
import ImageKit from 'imagekit'
import { urlEndpoint, privateKey, publicKey } from './keys'

const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint })

export const uploadImage = (file: any, cb: any) => fs.readFile(join(__dirname, '../', '../', 'uploaded', file.filename), (_, data) => {
    imagekit.upload({ file: data, fileName: file.filename, folder: "hotelmanage" }, (_, resp) => cb(resp))
})

export const fileurl = (req: any, file: any) => `${url.format({ protocol: req.protocol, host: req.get('host') })}/${file.filename}`