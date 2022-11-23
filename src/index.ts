import config from 'config'
import 'reflect-metadata'
import express from 'express'
import { buildSchema } from 'type-graphql'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageProductionDefault } from 'apollo-server-core/dist/plugin/landingPage/default'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

import { resolvers } from './resolvers'
import { connectedDatabase } from './utils/mongo'
import { verifyJwt } from './utils/jwt'
import Context from './types/context'
import { User } from "./schema/user.schema"

const main = async () => {
    const schema = await buildSchema({
      resolvers,
      emitSchemaFile: true,
      validate: false,
    });
  
    const app = express()

    app.use(cookieParser())
    // create apollo server

    const server = new ApolloServer({
        schema,
        context: (ctx: Context) => {
          const context = ctx;
    
          if (ctx.req.cookies.accessToken) {
            const user = verifyJwt<User>(ctx.req.cookies.accessToken);
            context.User = user;
          }
          return context.next()
        },
        plugins: [
            config.get('environment') === 'production' ? ApolloServerPluginLandingPageProductionDefault() :
            ApolloServerPluginLandingPageGraphQLPlayground
        ]
      })

    // connect to mongo DB
    connectedDatabase()

    await server.start()

    // apply middleware to server
    server.applyMiddleware({ app })

    // app.listen on express
    app.listen({ port: config.get('port') })
}

main().catch((error) => {
    // console.log(error, 'error');
  });