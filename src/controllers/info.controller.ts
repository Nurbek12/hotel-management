import { Request, Response } from 'express'
import prisma from '../config/database'

export const fetchInfoData = async (req: Request, res: Response) => {
    try {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1; // January is 0 in JavaScript
        const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

        const bookedRooms = await prisma.room.count({ where: { booked: true } })
        const emptyRooms = await prisma.room.count({ where: { booked: false } })
        const users = await prisma.user.count({})

        const dailyBookings = await prisma.booking.count({
            where: { created_at: { gte: today } },
        });
        const weeklyBookings = await prisma.booking.count({
            where: { created_at: { gte: oneWeekAgo } },
        });
        const monthlyBookings = await prisma.booking.count({
            where: { created_at: { gte: oneMonthAgo } },
        });

        const countRoomsByType = await prisma.roomType.findMany({
            select: {
                id: true,
                name: true,
                _count: {
                    select: { booking: true }
                }
            }
        })

        const bookingsCountByDay = await prisma.booking.groupBy({
            by: ['check_in'],
            _count: {
                check_in: true
            },
            where: {
                check_in: {
                    gte: `${currentYear}-${currentMonth}-01T00:00:00.000Z`,
                    lt: `${currentYear}-${currentMonth + 1}-01T00:00:00.000Z`
                }
            }
        })

        const bookingCounts = Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const count = bookingsCountByDay.find((booking) => {
              const checkInDate = new Date(booking.check_in);
              return checkInDate.getDate() === day;
            })?._count?.check_in ?? 0;
            return count;
          });

        const totalPayment = await prisma.booking.aggregate({
            _sum: { total_price: true }
        })

        return res.status(200).json({ status: "ok", 
            bookedRooms, 
            emptyRooms, 
            allRooms: bookedRooms + emptyRooms,
            users,
            dailyBookings,
            weeklyBookings,
            monthlyBookings,
            countRoomsByType,
            bookingCounts,
            totalPayment: Number(totalPayment._sum.total_price).toLocaleString(),
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}