import { Prisma, Ride } from '@prisma/client'

export interface RidesRepository {
  findById(id: string): Promise<Ride | null>
  findMany(): Promise<Ride[]>
  findManyByCreatorId(creatorId: string): Promise<Ride[]>
  create(data: Prisma.RideUncheckedCreateInput): Promise<Ride>
}
