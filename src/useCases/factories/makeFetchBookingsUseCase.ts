import { PrismaBookingsRepository } from '../../repositories/prisma/prismaBookingRepository'
import { FetchBookingsUseCase } from '../fetchBookings'

export function makeFetchBookingsUseCase() {
  const prismaBookingsRepository = new PrismaBookingsRepository()
  const fetchBookingsUseCase = new FetchBookingsUseCase(
    prismaBookingsRepository,
  )
  return fetchBookingsUseCase
}
