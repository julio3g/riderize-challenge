import { PrismaBookingsRepository } from '../../repositories/prisma/prismaBookingRepository'
import { FetchBookingsByUserIdUseCase } from '../fetchBookingsByUser'
// import { FetchBookingsByUserIdUseCase } from '../fetchBookingsByUser'

export function makeFetchBookingsByUserIdUseCase() {
  const prismaBookingsRepository = new PrismaBookingsRepository()
  const fetchBookingsByUserIdUseCase = new FetchBookingsByUserIdUseCase(
    prismaBookingsRepository,
  )
  return fetchBookingsByUserIdUseCase
}
