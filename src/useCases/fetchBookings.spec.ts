import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryBookingsRepository } from '../repositories/inMemory/inMemoryBookingsRepository'
import { FetchBookingsUseCase } from './fetchBookings'

let bookingsRepository: InMemoryBookingsRepository
let sut: FetchBookingsUseCase

describe('Fetch Bookings Use Case', () => {
  beforeEach(() => {
    bookingsRepository = new InMemoryBookingsRepository()
    sut = new FetchBookingsUseCase(bookingsRepository)
  })

  it('should be able to list rides', async () => {
    await bookingsRepository.create({
      rideId: 'ride-id-1',
      userId: 'user-id-1',
      subscription_date: new Date(),
    })

    await bookingsRepository.create({
      rideId: 'ride-id-2',
      userId: 'user-id-1',
      subscription_date: new Date(),
    })

    const bookings = await sut.execute({})

    expect(bookings).toHaveLength(2)
    expect(bookings).toEqual([
      expect.objectContaining({ rideId: 'ride-id-1' }),
      expect.objectContaining({ rideId: 'ride-id-2' }),
    ])
  })
})
