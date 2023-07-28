import { PrismaBookingsRepository } from '../../repositories/prisma/prismaBookingRepository'
import { PrismaRidesRepository } from '../../repositories/prisma/prismaRidesRepository'
import { CreateBookingUseCase } from '../createBooking'

export function makeCreateBookingUseCase() {
  const prismaRidesRepository = new PrismaRidesRepository()
  const prismaBookingsRepository = new PrismaBookingsRepository()
  const createBookingUseCase = new CreateBookingUseCase(
    prismaBookingsRepository,
    prismaRidesRepository,
  )
  return createBookingUseCase
}
