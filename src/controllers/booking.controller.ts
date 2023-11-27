import { Request, Response } from 'express'
import prisma from '../config/database'
import { AppRequest } from '../middlewares/auth.middleware'

export const fetchBookings = async (req: AppRequest, res: Response) => {
    try {
        const page: number = Number(req.query.page) || 1
        const perpage: number = Number(req.query.perpage) || 25
        const searchQuery: string = String(req.query.search || '')
        const skip = (page - 1) * perpage;
        let searchHandler = {}
        
        if(searchQuery){
            Object.assign(searchHandler, {
                where: {
                    client: {
                        contains: searchQuery,
                        mode: "insensitive"
                    }
                }
            })
        }

        const totalCount = await prisma.booking.count(searchHandler)
        const totalPages = Math.ceil(totalCount / perpage)
        
        const result = await prisma.booking.findMany({
            orderBy: {
                created_at: "desc"
            },
            skip,
            take: perpage,
            select: {
                id: true,
                address: true,
                check_in: true,
                check_out: true,
                client: true,
                email: true,
                phone: true,
                room: true,
                room_type: true,
                total_price: true
            },
            ...searchHandler,
        })
        return res.status(200).json({ status: "ok", result, page, totalPages, totalCount })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}       

export const fetchBookingForStaff = async (req: AppRequest, res: Response) => {
    try {
        const page: number = Number(req.query.page) || 1
        const perpage: number = Number(req.query.perpage) || 25
        const searchQuery: string = String(req.query.search || '')
        const skip = (page - 1) * perpage;

        const today = new Date();
        const dateParts = [
            today.getFullYear().toString().substring(0),
            (today.getMonth() + 1).toString().padStart(2, '0'),
            today.getDate().toString().padStart(2, '0'),
        ];
        const todayString = dateParts.join('-');

        let searchHandler = {
            where: {
                OR: [
                    { check_in: { equals: todayString } },
                    { check_out: { equals: todayString } }
                ]
            }
        }
        
        if(searchQuery){
            Object.assign(searchHandler.where, {
                client: {
                    contains: searchQuery,
                    mode: "insensitive"
                }
            })
        }

        const totalCount = await prisma.booking.count(searchHandler)
        const totalPages = Math.ceil(totalCount / perpage)
        
        const result = await prisma.booking.findMany({
            orderBy: {
                created_at: "desc"
            },
            skip,
            take: perpage,
            select: {
                id: true,
                address: true,
                check_in: true,
                check_out: true,
                client: true,
                email: true,
                phone: true,
                room: true,
                room_type: true,
                total_price: true
            },
            ...searchHandler,
        })
        return res.status(200).json({ status: "ok", result, page, totalPages, totalCount })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const createBooking = async (req: AppRequest, res: Response) => {
    try {
        const { room, room_type, ...otherData } = req.body
        await prisma.room.update({
            where: { id: Number(req.body.room_id) },
            data: { booked: true }
        })
        const result = await prisma.booking.create({
            data: otherData,
            select: {
                id: true,
                address: true,
                check_in: true,
                check_out: true,
                client: true,
                email: true,
                phone: true,
                room: true,
                room_type: true,
                total_price: true
            }
        })

        return res.status(200).json({ status: "ok", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}