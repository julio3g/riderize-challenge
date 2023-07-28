import { PrismaRidesRepository } from '../../repositories/prisma/prismaRidesRepository'
import { FetchRidesByCreatorIdUseCase } from '../fetchRidesByCreatorId'

export function makeFetchRidesByCreatorIdUseCase() {
  const prismaRidesRepository = new PrismaRidesRepository()
  const fetchRidesByCreatorIdUseCase = new FetchRidesByCreatorIdUseCase(
    prismaRidesRepository,
  )
  return fetchRidesByCreatorIdUseCase
}
