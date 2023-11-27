import { Request, Response } from 'express'
import prisma from '../config/database'

export const fetchRooms = async (req: Request, res: Response) => {
    try {
        const page: number = Number(req.query.page) || 1
        const perpage: number = Number(req.query.perpage) || 25
        const searchQuery: string = String(req.query.search || '')
        const skip = (page - 1) * perpage;
        let searchHandler = {}
        
        if(searchQuery){
            Object.assign(searchHandler, {
                where: {
                    name: {
                        contains: searchQuery,
                        mode: "insensitive"
                    }
                }
            })
        }
        
        const totalCount = await prisma.room.count(searchHandler)
        const totalPages = Math.ceil(totalCount / perpage)
        
        const result = await prisma.room.findMany({
            skip,
            take: perpage,
            select: {
                type: true,
                price: true,
                name: true,
                booked: true,
                id: true,
            },
            ...searchHandler
        })
        return res.status(200).json({ status: "ok", result, page, totalPages, totalCount })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const fetchRoomsByType = async (req: Request, res: Response) => {
    try {
        const result = await prisma.room.findMany({
            where: {
                AND: [
                    // { booked: false },
                    { type_id: Number(req.params.id) }
                ]
            },
            select: {
                type: true,
                price: true,
                name: true,
                id: true,
                booked: true,
            },
        })
        return res.status(200).json({ status: "ok", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const createRoom = async (req: Request, res: Response) => {
    try {
        const { name, type, price } = req.body
        const result = await prisma.room.create({
            data: { name, type_id: type, price: Number(price) },
            select: {
                id: true,
                name: true,
                booked: true,
                price: true,
                type: true,
            }
        })

        return res.status(200).json({ status: "ok", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const updateRoom = async (req: Request, res: Response) => {
    try {
        const { name, price, booked } = req.body

        const result = await prisma.room.update({
            where: { id: Number(req.params.id) },
            data: { name, price: Number(price), booked }
        })

        return res.status(200).json({ status: "ok", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const dischargeRoom = async (req: Request, res: Response) => {
    try {
        await prisma.room.update({
            where: { id: Number(req.params.id) },
            data: { booked: false }
        })

        return res.status(200).json({ status: "ok" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const deleteRoom = async (req: Request, res: Response) => {
    try {
        await prisma.room.delete({
            where: { id: Number(req.params.id) },
        })

        return res.status(200).json({ status: "ok" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}