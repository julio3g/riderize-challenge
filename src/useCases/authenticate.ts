import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { UsersRepository } from '../repositories/usersRepository'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<User> {
    const user = await this.usersRepository.findByEmail(email.toLowerCase())

    if (!user) throw new Error('Invalid credentials.')

    const doestPasswordMatches = await compare(password, user.password)

    if (!doestPasswordMatches) throw new Error('Invalid credentials.')

    return user
  }
}
