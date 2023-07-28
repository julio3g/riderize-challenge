import { Booking } from '@prisma/client'
import { BookingsRepository } from '../repositories/bookingsRepository'

interface FetchBookingsByUserIdUseCaseRequest {
  userId: string
}

export class FetchBookingsByUserIdUseCase {
  constructor(private bookingsRepository: BookingsRepository) {}

  async execute({
    userId,
  }: FetchBookingsByUserIdUseCaseRequest): Promise<Booking[]> {
    const bookings = await this.bookingsRepository.findManyByUserId(userId)
    return bookings
  }
}
