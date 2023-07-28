import { sign } from 'jsonwebtoken'
import { Arg, Mutation, Resolver } from 'type-graphql'
import { auth } from '../env/auth'
import { User } from '../schema'
import { makeAuthenticateUseCase } from '../useCases/factories/makeAuthenticateUseCase'
import { makeRegisterUseCase } from '../useCases/factories/makeRegisterUseCase'

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const registerUseCase = makeRegisterUseCase()
    return await registerUseCase.execute({ name, email, password })
  }

  @Mutation(() => String)
  async session(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const authenticateUseCase = makeAuthenticateUseCase()
    const user = await authenticateUseCase.execute({ email, password })

    return sign({ userId: user.id }, auth.secretJwt, {
      expiresIn: auth.expiresToken,
    })
  }
}
