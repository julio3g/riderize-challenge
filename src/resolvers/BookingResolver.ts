import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Context } from '../context'
import { Booking } from '../schema'
import { makeCreateBookingUseCase } from '../useCases/factories/makeCreateBookingUseCase'
import { makeFetchBookingsByUserIdUseCase } from '../useCases/factories/makeFetchBookingsByUserIdUseCase'
import { makeFetchRidesUseCase } from '../useCases/factories/makeFetchRidesUseCase'

@Resolver(Booking)
export class BookingResolver {
  @Query(() => [Booking])
  @Authorized()
  async bookings() {
    const fetchBookingsUseCase = makeFetchRidesUseCase()
    return fetchBookingsUseCase.execute({})
  }

  @Query(() => [Booking])
  @Authorized()
  async bookingsByUser(@Ctx() context: Context) {
    const userId = context.req.user!.userId
    const fetchBookingsByUserIdUseCase = makeFetchBookingsByUserIdUseCase()
    return await fetchBookingsByUserIdUseCase.execute({ userId })
  }

  @Mutation(() => Booking)
  @Authorized()
  async createBooking(
    @Arg('rideId', () => String) rideId: string,
    @Ctx() context: Context,
  ) {
    const userId = context.req.user!.userId
    const createBookingUseCase = makeCreateBookingUseCase()
    return await createBookingUseCase.execute({ rideId, userId })
  }
}
