import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string

  @Field()
  name!: string

  @Field()
  email!: string

  @Field()
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

  @Field()
  name!: string

  @Field()
  start_date!: string

  @Field()
  start_date_registration!: string

  @Field()
  end_date_registration!: string

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

  @Field(() => [Booking], { nullable: true })
  bookings?: Booking[]
}

@ObjectType()
export class Booking {
  @Field(() => ID)
  id!: string

  @Field()
  rideId!: string

  @Field()
  userId!: string

  @Field()
  subscription_date!: string

  @Field(() => User)
  user?: User

  @Field(() => Ride)
  ride?: Ride
}
