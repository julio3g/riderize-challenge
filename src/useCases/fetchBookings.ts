import { Booking } from '@prisma/client'
import { BookingsRepository } from '../repositories/bookingsRepository'

interface FetchBookingsUseCaseRequest {}

export class FetchBookingsUseCase {
  constructor(private bookingsRepository: BookingsRepository) {}

  async execute({}: FetchBookingsUseCaseRequest): Promise<Booking[]> {
    const bookings = await this.bookingsRepository.findMany()
    return bookings
  }
}
