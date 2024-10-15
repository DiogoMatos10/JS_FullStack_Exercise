import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { SecurityResolver } from './graphql/resolvers/SecurityResolver';
import { AppDataSource } from './db';

AppDataSource.initialize()
    .then(async () => {
        const schema = await buildSchema({
            resolvers: [SecurityResolver],
        });

        const server = new ApolloServer({
            schema,
            context: ({ req }) => {
                return { headers: req.headers };
            },
        });

        server.listen().then(({ url }) => {
            console.log(`Server ready at ${url}`);
        });
    })
    .catch((error) => console.error("Error during Data Source initialization:", error));
