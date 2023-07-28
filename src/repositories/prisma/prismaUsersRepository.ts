import { Prisma, User } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { UsersRepository } from '../usersRepository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } })
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } })
  }

  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({ data })
  }
}
