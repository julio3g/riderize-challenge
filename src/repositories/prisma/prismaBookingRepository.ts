import { Booking, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { BookingsRepository } from '../bookingsRepository'

export class PrismaBookingsRepository implements BookingsRepository {
  async findById(id: string): Promise<Booking | null> {
    const booking = await prisma.booking.findUnique({ where: { id } })
    return booking
  }

  async findByRideId(rideId: string): Promise<Booking | null> {
    const booking = await prisma.booking.findFirst({ where: { rideId } })
    return booking
  }

  async findManyByUserId(userId: string): Promise<Booking[]> {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: { ride: true },
    })
    return bookings
  }

  async findMany(): Promise<Booking[]> {
    const all = await prisma.booking.findMany({ include: { ride: true } })
    return all
  }

  async create(data: Prisma.BookingUncheckedCreateInput): Promise<Booking> {
    const booking = await prisma.booking.create({ data })
    return booking
  }
}
