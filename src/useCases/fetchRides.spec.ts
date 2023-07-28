import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRidesRepository } from '../repositories/inMemory/inMemoryRidesRepository'
import { FetchRidesUseCase } from './fetchRides'

let ridesRepository: InMemoryRidesRepository
let sut: FetchRidesUseCase

describe('Fetch Rides Use Case', () => {
  beforeEach(() => {
    ridesRepository = new InMemoryRidesRepository()
    sut = new FetchRidesUseCase(ridesRepository)
  })

  it('should be able to list rides', async () => {
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

    const rides = await sut.execute({})

    expect(rides).toHaveLength(2)
    expect(rides).toEqual([
      expect.objectContaining({ name: 'Ride example 1' }),
      expect.objectContaining({ name: 'Ride example 2' }),
    ])
  })
})
