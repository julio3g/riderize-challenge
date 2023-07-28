import { Booking, Prisma } from '@prisma/client'

export interface BookingsRepository {
  findById(id: string): Promise<Booking | null>
  findByRideId(rideId: string): Promise<Booking | null>
  findMany(): Promise<Booking[]>
  findManyByUserId(userId: string): Promise<Booking[]>
  create(data: Prisma.BookingUncheckedCreateInput): Promise<Booking>
}
