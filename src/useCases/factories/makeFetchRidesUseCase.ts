import { PrismaRidesRepository } from '../../repositories/prisma/prismaRidesRepository'
import { FetchRidesUseCase } from '../fetchRides'

export function makeFetchRidesUseCase() {
  const prismaRidesRepository = new PrismaRidesRepository()
  const fetchRidesUseCase = new FetchRidesUseCase(prismaRidesRepository)
  return fetchRidesUseCase
}
