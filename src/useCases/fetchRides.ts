import { Ride } from '@prisma/client'
import { RidesRepository } from '../repositories/ridesRepository'

interface FetchRidesUseCaseRequest {}

export class FetchRidesUseCase {
  constructor(private ridesRepository: RidesRepository) {}

  async execute({}: FetchRidesUseCaseRequest): Promise<Ride[]> {
    const rides = await this.ridesRepository.findMany()
    return rides
  }
}
