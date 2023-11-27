import { Request, Response } from 'express'
import prisma from '../config/database'

export const fetchTypes = async (_: Request, res: Response) => {
    try {
        const types = await prisma.roomType.findMany({})
        return res.status(200).json({ status: "ok", types })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const createType = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        const result = await prisma.roomType.create({
            data: { name }
        })

        return res.status(200).json({ status: "ok", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const updateType = async (req: Request, res: Response) => {
    try {
        const { name } = req.body

        const result = await prisma.roomType.update({
            where: { id: Number(req.params.id) },
            data: { name }
        })

        return res.status(200).json({ status: "ok", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const deleteType = async (req: Request, res: Response) => {
    try {
        await prisma.roomType.delete({
            where: { id: Number(req.params.id) },
        })

        return res.status(200).json({ status: "ok" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}