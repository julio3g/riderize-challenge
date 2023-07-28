import { Ride } from '@prisma/client'
import { RidesRepository } from '../repositories/ridesRepository'

interface FetchRidesByCreatorIdUseCaseRequest {
  creatorId: string
}

export class FetchRidesByCreatorIdUseCase {
  constructor(private ridesRepository: RidesRepository) {}

  async execute({
    creatorId,
  }: FetchRidesByCreatorIdUseCaseRequest): Promise<Ride[]> {
    const rides = await this.ridesRepository.findManyByCreatorId(creatorId)
    return rides
  }
}
