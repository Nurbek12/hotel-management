import { Request, Response } from 'express'
import prisma from '../config/database'
import { AppRequest } from '../middlewares/auth.middleware'

export const getChats = async (req: AppRequest, res: Response) => {
    try {
        const result = await prisma.chat.findMany({
            where: {
                users: {
                    some: {
                        id: String(req.params.id)
                    }
                }
            },
            include: {
                users: {
                    select: {
                        id: true,
                        email: true,
                        image: true,
                        name: true,
                        role: true,
                    },
                    where: {
                        id: {
                            not: String(req.params.id)
                        }
                    }
                },
                messages: {
                    select: {
                        id: true, file: true, fileName: true,
                        created_at: true, fileSize: true, sender: true,
                        type: true, text: true, updated_at: true,
                    },
                    orderBy: {
                        created_at: 'desc'
                    },
                    take: 1
                },
            },
            orderBy: {
                messages: {
                    // created_at: "desc"
                    _count: "desc"
                }
            }
        })
        return res.status(200).json({ status: "ok", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const createChat = async (req: AppRequest, res: Response) => {
    try {
        const { user1, user2, type } = req.body
        const handleCreate = {}

        if(type) Object.assign(handleCreate, { users: {connect: [{id: user1}]}, type })
        else Object.assign(handleCreate, { users: {connect: [{id: user1},{id: user2}] }})

        const result = await prisma.chat.create({
            data: handleCreate,
            select: {
                users: {
                    select: {
                        id: true,
                        email: true,
                        image: true,
                        name: true,
                        role: true,
                    },
                },
                id: true,
                type: true,
                name: true
            }
        })
        return res.status(200).json({ status: "ok", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const deleteChat = async (req: AppRequest, res: Response) => {
    try {
        await prisma.message.deleteMany({ where: { chat_id: String(req.params.id) } })
        await prisma.chat.delete({
            where: { id: String(req.params.id) },
        })
        return res.status(200).json({ status: "ok" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const getMessages = async (req: AppRequest, res: Response) => {
    try {
        const page = Number(req.query?.page || 1)
        const result = await prisma.message.findMany({
            where: { chat_id: String(req.params.chatid) },
            select: {
                id: true, file: true, fileName: true, chat_id: true,
                created_at: true, fileSize: true, sender: {
                    select: {
                        id: true,
                        email: true,
                        image: true,
                        name: true,
                        role: true,
                    }
                },
                type: true, text: true, updated_at: true,
            },
            // orderBy: {
            //     created_at: "desc"
            // },
            skip: (page - 1) * 40,
            take: 40
        })
        return res.status(200).json({ status: "ok", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const createMessage = async (req: AppRequest, res: Response) => {
    try {
        const result = await prisma.message.create({
            data: req.body,
            select: {
                id: true, file: true, fileName: true,
                created_at: true, fileSize: true, sender: {
                    select: {
                        id: true,
                        email: true,
                        image: true,
                        name: true,
                        role: true,
                    }
                }, chat_id: true,
                type: true, text: true, updated_at: true,
            }
        })
        return res.status(200).json({ status: "ok", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const editMessage = async (req: AppRequest, res: Response) => {
    try {
        const result = await prisma.message.update({
            where: { id: Number(req.params.id) },
            data: {
                text: req.body.text,
            }
        })
        return res.status(200).json({ status: "ok", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const deleteMessage = async (req: AppRequest, res: Response) => {
    try {
        const ids: number[] = (req.query.ids as string).split(',').map(id => Number(id))

        await prisma.message.deleteMany({
            where: { 
                id: { in: ids }
            },
        })
        return res.status(200).json({ status: "ok" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}