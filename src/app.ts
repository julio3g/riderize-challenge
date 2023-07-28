import { ApolloServer } from 'apollo-server-express'
import 'dotenv/config'
import express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { authMiddleware } from './http/middlewares/authMiddleware'
import { BookingResolver } from './resolvers/BookingResolver'
import { RideResolver } from './resolvers/RideResolver'
import { UserResolver } from './resolvers/UserResolver'

export async function server() {
  const app = express()

  const schema = await buildSchema({
    resolvers: [UserResolver, RideResolver, BookingResolver],
    authChecker: ({ context: { req } }) => {
      return !!req.user
    },
  })

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context = {
        req,
        token: req?.headers?.authorization,
      }
      return context
    },
  })

  app.use(authMiddleware)

  apolloServer.start().then(() => {
    apolloServer.applyMiddleware({ app })
  })

  app.listen(4000, () => console.log('server started on :4000'))
}
