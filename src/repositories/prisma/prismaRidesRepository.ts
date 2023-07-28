import { Prisma, Ride } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { RidesRepository } from '../ridesRepository'

export class PrismaRidesRepository implements RidesRepository {
  async findById(id: string): Promise<Ride | null> {
    const ride = await prisma.ride.findUnique({ where: { id } })
    return ride
  }

  async findMany(): Promise<Ride[]> {
    const all = await prisma.ride.findMany()
    return all
  }

  async findManyByCreatorId(creatorId: string): Promise<Ride[]> {
    const rides = await prisma.ride.findMany({ where: { creatorId } })
    return rides
  }

  async create(data: Prisma.RideUncheckedCreateInput): Promise<Ride> {
    const ride = await prisma.ride.create({ data })
    return ride
  }
}
