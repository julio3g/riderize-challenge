import { PrismaRidesRepository } from '../../repositories/prisma/prismaRidesRepository'
import { CreateRideUseCase } from '../createRide'

export function makeCreateRideUseCase() {
  const prismaRidesRepository = new PrismaRidesRepository()
  const createRideUseCase = new CreateRideUseCase(prismaRidesRepository)
  return createRideUseCase
}
