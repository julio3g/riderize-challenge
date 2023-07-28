import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryBookingsRepository } from '../repositories/inMemory/inMemoryBookingsRepository'
import { InMemoryRidesRepository } from '../repositories/inMemory/inMemoryRidesRepository'
import { CreateBookingUseCase } from './createBooking'

let bookingsRepository: InMemoryBookingsRepository
let ridesRepository: InMemoryRidesRepository
let sut: CreateBookingUseCase

describe('Create Booking Use Case', () => {
  beforeEach(() => {
    bookingsRepository = new InMemoryBookingsRepository()
    ridesRepository = new InMemoryRidesRepository()
    sut = new CreateBookingUseCase(bookingsRepository, ridesRepository)
  })

  it('should to create a booking', async () => {
    await ridesRepository.create({
      id: 'ride-id-1',
      name: 'Ride example',
      start_date: new Date('2023-01-20'),
      start_date_registration: new Date('2023-07-15'),
      end_date_registration: new Date('2023-08-30'),
      additional_information: 'additional information',
      start_place: 'place examples',
      participants_limit: 10,
      creatorId: 'user-id-1',
    })

    const booking = await sut.execute({
      rideId: 'ride-id-1',
      userId: 'user-id-1',
    })

    expect(booking.id).toEqual(expect.any(String))
  })

  it('should not be able to create an existing booking', async () => {
    await ridesRepository.create({
      id: 'ride-id-1',
      name: 'Ride example',
      start_date: new Date('2023-01-20'),
      start_date_registration: new Date('2023-07-15'),
      end_date_registration: new Date('2023-08-30'),
      additional_information: 'additional information',
      start_place: 'place examples',
      participants_limit: 10,
      creatorId: 'user-id-1',
    })

    await sut.execute({
      rideId: 'ride-id-1',
      userId: 'user-id-1',
    })

    await expect(() =>
      sut.execute({
        rideId: 'ride-id-1',
        userId: 'user-id-1',
      }),
    ).rejects.toEqual(new Error('User already booked this ride'))
  })

  it('should not be able to create an booking registration period has ended', async () => {
    await ridesRepository.create({
      id: 'ride-id-1',
      name: 'Ride example',
      start_date: new Date('2023-01-20'),
      start_date_registration: new Date('2023-01-15'),
      end_date_registration: new Date('2023-01-30'),
      additional_information: 'additional information',
      start_place: 'place examples',
      participants_limit: 10,
      creatorId: 'user-id-1',
    })

    await expect(() =>
      sut.execute({
        rideId: 'ride-id-1',
        userId: 'user-id-1',
      }),
    ).rejects.toEqual(new Error('Registration period has ended'))
  })
})
