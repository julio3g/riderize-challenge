import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field()
  id!: string

  @Field()
  name!: string

  @Field()
  email!: string

  @Field()
  password!: string

  @Field(() => [Ride])
  rides?: Ride[]

  @Field(() => [Booking])
  bookings?: Booking[]
}

@ObjectType()
export class Ride {
  @Field()
  id!: string

  @Field()
  name!: string

  @Field()
  start_date!: Date

  @Field()
  start_date_registration!: Date

  @Field()
  end_date_registration!: Date

  @Field({ nullable: true })
  additional_information?: string

  @Field()
  start_place!: string

  @Field(() => Int, { nullable: true })
  participants_limit?: number

  @Field()
  creatorId!: string

  @Field(() => User)
  creator?: User

  @Field(() => [Booking])
  bookings?: Booking[]
}

@ObjectType()
export class Booking {
  @Field()
  id!: string

  @Field()
  rideId!: string

  @Field()
  userId!: string

  @Field()
  subscription_date!: Date

  @Field(() => User)
  user?: User

  @Field(() => Ride)
  ride?: Ride
}
