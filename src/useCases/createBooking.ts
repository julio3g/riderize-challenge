import { Booking } from '@prisma/client'
import { BookingsRepository } from '../repositories/bookingsRepository'
import { RidesRepository } from '../repositories/ridesRepository'

interface CreateBookingUseCaseRequest {
  rideId: string
  userId: string
}

export class CreateBookingUseCase {
  constructor(
    private bookingsRepository: BookingsRepository,
    private ridesRepository: RidesRepository,
  ) {}

  async execute({
    rideId,
    userId,
  }: CreateBookingUseCaseRequest): Promise<Booking> {
    const ride = await this.ridesRepository.findById(rideId)
    const subscription_date = new Date()

    if (!ride) throw new Error('ride not found')

    if (subscription_date > ride.end_date_registration)
      throw new Error('Registration period has ended')

    const existingBooking = await this.bookingsRepository.findByRideId(rideId)

    if (existingBooking) throw new Error('User already booked this ride')

    const booking = await this.bookingsRepository.create({
      rideId,
      userId,
      subscription_date,
    })

    return booking
  }
}
