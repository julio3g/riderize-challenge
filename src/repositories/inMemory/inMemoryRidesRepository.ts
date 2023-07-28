import { Prisma, Ride } from '@prisma/client'
import { randomUUID } from 'crypto'
import { RidesRepository } from '../ridesRepository'

export class InMemoryRidesRepository implements RidesRepository {
  public items: Ride[] = []

  async findById(id: string): Promise<Ride | null> {
    const ride = this.items.find((item) => item.id === id)
    if (!ride) return null
    return ride
  }

  async findMany(): Promise<Ride[]> {
    const all = this.items
    return all
  }

  async findManyByCreatorId(creatorId: string): Promise<Ride[]> {
    const rides = this.items.filter((item) => item.creatorId === creatorId)
    return rides
  }

  async create(data: Prisma.RideUncheckedCreateInput): Promise<Ride> {
    const ride = {
      id: data.id ?? randomUUID(),
      name: data.name,
      start_date: new Date(data.start_date),
      start_date_registration: new Date(data.start_date_registration),
      end_date_registration: new Date(data.end_date_registration),
      additional_information: data.additional_information || null,
      start_place: data.start_place,
      participants_limit: data.participants_limit ?? null,
      creatorId: data.creatorId,
    }

    this.items.push(ride)

    return ride
  }
}
