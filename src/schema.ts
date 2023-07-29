import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  name!: string

  @Field(() => String)
  email!: string

  @Field(() => String)
  password!: string

  @Field(() => [Ride], { nullable: true })
  rides?: Ride[]

  @Field(() => [Booking], { nullable: true })
  bookings?: Booking[]
}

@ObjectType()
export class Ride {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  name!: string

  @Field(() => String)
  start_date!: string

  @Field(() => String)
  start_date_registration!: string

  @Field(() => String)
  end_date_registration!: string

  @Field(() => String, { nullable: true })
  additional_information?: string

  @Field(() => String)
  start_place!: string

  @Field(() => Int, { nullable: true })
  participants_limit?: number

  @Field(() => String)
  creatorId!: string

  @Field(() => User)
  creator?: User

  @Field(() => [Booking], { nullable: true })
  bookings?: Booking[]
}

@ObjectType()
export class Booking {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  rideId!: string

  @Field(() => String)
  userId!: string

  @Field(() => String)
  subscription_date!: string

  @Field(() => User)
  user?: User

  @Field(() => Ride)
  ride?: Ride
}
