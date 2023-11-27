import prisma from '../config/database'
import { Request, Response } from 'express'
import { secret } from '../config/keys'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { AppRequest } from '../middlewares/auth.middleware'

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role, phone } = req.body

        const findUser = await prisma.user.findUnique({
            where: { email }
        })

        if(findUser) {
            return res.status(400).json({ status: "warning", message: "Login or Password incorrect!" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                role: role || "STAFF",
                image: req.body.file || '',
                password: hashpassword
            }
        })

        return res.status(200).json({ status: "ok", user: newUser })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        const searchUniqueUser = await prisma.user.findMany({
            where: {
                AND: [
                    { email: { equals: req.body.email } },
                    { id: { not: req.params.id } }
                ]
            },
        })

        if(searchUniqueUser.length > 0) return res.status(300).json({ status: "warning", message: "This Email is Already used" });
        

        if(req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        const { file, ...otherData } = req.body

        const result = await prisma.user.update({
            where: { id: String(userId) },
            data: {
                ...otherData,
                image: file || req.body.image
            },
            select: {
                id: true,
                image: true,
                name: true,
                email: true,
                role: true,
                phone: true,
            }
        })

        return res.status(200).json({ status: "ok", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await prisma.user.delete({
            where: { id: String(req.params.id) },
        })

        return res.status(200).json({ status: "ok" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const fetchUsers = async (req: AppRequest, res: Response) => {
    try {
        const page: number = Number(req.query.page) || 1
        const perpage: number = Number(req.query.perpage) || 25
        const searchQuery: string = String(req.query.search || '')
        const skip = (page - 1) * perpage;
        let searchHandler = { where: {} }
        
        if(searchQuery){
            Object.assign(searchHandler.where, {
                name: {
                    contains: searchQuery,
                    mode: "insensitive"
                }
            })
        }
        if(req.query?.broadcast) {
            Object.assign(searchHandler.where, {
                id: { not: String(req.user?.id) }
            })
        }
        
        const totalCount = await prisma.user.count(searchHandler)
        const totalPages = Math.ceil(totalCount / perpage)

        const users = await prisma.user.findMany({
            skip,
            take: perpage,
            select: {
                id: true,
                email: true,
                image: true,
                name: true,
                role: true,
                phone: true,
            },
            ...searchHandler
        })
        return res.status(200).json({ status: "ok", users, page, totalCount, totalPages })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const findUser = await prisma.user.findUnique({ where: { email } })
        if(!findUser) return res.status(404).json({ status: "warnig", message: "Login or Password incorrect!" })
        
        const isMatch = await bcrypt.compare(password, findUser.password!)
        if(!isMatch) return res.status(402).json({ status: "warnig", message: "Login or Password incorrect!" })
        
        const { id, name, role, phone } = findUser
        const token = jwt.sign({ id, name, role, email }, secret!, { expiresIn: "5h" })

        return res.status(200).json({ status: "ok", token, user: { id, name, role, email, phone, image: findUser.image } })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}