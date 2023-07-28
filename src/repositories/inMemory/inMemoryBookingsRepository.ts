import { Booking, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { BookingsRepository } from '../bookingsRepository'

export class InMemoryBookingsRepository implements BookingsRepository {
  public items: Booking[] = []

  async findById(id: string): Promise<Booking | null> {
    const booking = this.items.find((item) => item.id === id)
    if (!booking) return null
    return booking
  }

  async findByRideId(rideId: string): Promise<Booking | null> {
    const booking = this.items.find((item) => item.rideId === rideId)
    if (!booking) return null
    return booking
  }

  async findMany(): Promise<Booking[]> {
    const all = this.items
    return all
  }

  async findManyByUserId(userId: string): Promise<Booking[]> {
    const rides = this.items.filter((item) => item.userId === userId)
    return rides
  }

  async create(data: Prisma.BookingUncheckedCreateInput): Promise<Booking> {
    const ride = {
      id: data.id ?? randomUUID(),
      rideId: data.rideId,
      userId: data.userId,
      subscription_date: new Date(),
    }

    this.items.push(ride)

    return ride
  }
}
