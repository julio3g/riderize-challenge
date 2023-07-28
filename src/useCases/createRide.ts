import { Ride } from '@prisma/client'
import { RidesRepository } from '../repositories/ridesRepository'

interface CreateRideUseCaseRequest {
  name: string
  start_date: Date
  start_date_registration: Date
  end_date_registration: Date
  additional_information: string
  start_place: string
  participants_limit: number
  creatorId: string
}

export class CreateRideUseCase {
  constructor(private ridesRepository: RidesRepository) {}

  async execute({
    name,
    start_date,
    start_date_registration,
    end_date_registration,
    additional_information,
    start_place,
    participants_limit,
    creatorId,
  }: CreateRideUseCaseRequest): Promise<Ride> {
    const ride = await this.ridesRepository.create({
      name,
      start_date,
      start_date_registration,
      end_date_registration,
      additional_information,
      start_place,
      participants_limit,
      creatorId,
    })

    return ride
  }
}
