import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/usersRepository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<User> {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) throw new Error('E-mail already exists.')

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    })
    return user
  }
}
