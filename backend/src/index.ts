// src/index.ts
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import { AppDataSource } from './db'; 

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

AppDataSource.initialize()
    .then(() => {
        return server.listen();
    })
    .then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    })
    .catch((error) => {
        console.error("Error starting the server:", error);
    });
