import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Context } from '../context'
import { Ride } from '../schema'
import { makeCreateRideUseCase } from '../useCases/factories/makeCreateRideUseCase'
import { makeFetchRidesByCreatorIdUseCase } from '../useCases/factories/makeFetchRidesByCreatorId'
import { makeFetchRidesUseCase } from '../useCases/factories/makeFetchRidesUseCase'

@Resolver(Ride)
export class RideResolver {
  @Query(() => [Ride])
  @Authorized()
  async rides() {
    const fetchRidesUseCase = makeFetchRidesUseCase()
    return await fetchRidesUseCase.execute({})
  }

  @Query(() => [Ride])
  @Authorized()
  async ridesByUser(@Ctx() context: Context) {
    const fetchRidesByCreatorIdUseCase = makeFetchRidesByCreatorIdUseCase()
    return await fetchRidesByCreatorIdUseCase.execute({
      creatorId: context.req.user!.userId,
    })
  }

  @Mutation(() => Ride)
  async createRide(
    @Arg('name') name: string,
    @Arg('startDate', () => String) start_date: string,
    @Arg('startDateRegistration', () => String) start_date_registration: string,
    @Arg('endDateRegistration', () => String) end_date_registration: string,
    @Arg('additionalInformation', () => String, { nullable: true })
    additional_information: string,
    @Arg('startPlace', () => String) start_place: string,
    @Arg('participantsLimit', () => Number, { nullable: true })
    participants_limit: number,
    @Ctx() context: Context,
  ) {
    if (!context.req.user)
      throw new Error('You must be authenticated to create a ride')

    const createRideUseCase = makeCreateRideUseCase()
    return await createRideUseCase.execute({
      name,
      start_date: new Date(start_date),
      start_date_registration: new Date(start_date_registration),
      end_date_registration: new Date(end_date_registration),
      additional_information,
      start_place,
      participants_limit,
      creatorId: context.req.user.userId,
    })
  }
}
