import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRidesRepository } from '../repositories/inMemory/inMemoryRidesRepository'
import { FetchRidesByCreatorIdUseCase } from './fetchRidesByCreatorId'

let ridesRepository: InMemoryRidesRepository
let sut: FetchRidesByCreatorIdUseCase

describe('Fetch Rides By Creator Id Use Case', () => {
  beforeEach(() => {
    ridesRepository = new InMemoryRidesRepository()
    sut = new FetchRidesByCreatorIdUseCase(ridesRepository)
  })

  it('should be able to list rides by creator', async () => {
    await ridesRepository.create({
      name: 'Ride example 1',
      start_date: new Date('2023-01-20'),
      start_date_registration: new Date('2023-01-15'),
      end_date_registration: new Date('2023-01-30'),
      additional_information: 'additional information',
      start_place: 'place examples',
      participants_limit: 10,
      creatorId: 'creator-1',
    })

    await ridesRepository.create({
      name: 'Ride example 2',
      start_date: new Date('2023-01-20'),
      start_date_registration: new Date('2023-01-15'),
      end_date_registration: new Date('2023-01-30'),
      additional_information: 'additional information',
      start_place: 'place examples',
      participants_limit: 10,
      creatorId: 'creator-1',
    })

    const rides = await sut.execute({
      creatorId: 'creator-1',
    })

    expect(rides).toHaveLength(2)
    expect(rides).toEqual([
      expect.objectContaining({ name: 'Ride example 1' }),
      expect.objectContaining({ name: 'Ride example 2' }),
    ])
  })
})
