import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRidesRepository } from '../repositories/inMemory/inMemoryRidesRepository'
import { CreateRideUseCase } from './createRide'

let ridesRepository: InMemoryRidesRepository
let sut: CreateRideUseCase

describe('Create Ride Use Case', () => {
  beforeEach(() => {
    ridesRepository = new InMemoryRidesRepository()
    sut = new CreateRideUseCase(ridesRepository)
  })

  it('should to create ride', async () => {
    const ride = await sut.execute({
      name: 'Ride example',
      start_date: new Date('2023-01-20'),
      start_date_registration: new Date('2023-01-15'),
      end_date_registration: new Date('2023-01-30'),
      additional_information: 'additional information',
      start_place: 'place examples',
      participants_limit: 10,
      creatorId: 'creator-1',
    })

    expect(ride.id).toEqual(expect.any(String))
  })
})
