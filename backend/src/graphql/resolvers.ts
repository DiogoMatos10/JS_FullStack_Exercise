// src/graphql/resolvers.ts
import { Query, Resolver } from 'type-graphql';
import { Security } from './models/Security';
import { AppDataSource } from '../db';

@Resolver()
export class SecurityResolver {
    @Query(() => [Security])
    async getSecurities() {
        try {
            const securities = await AppDataSource.getRepository(Security).find();
            console.log("Securities fetched from DB:", securities);
            return securities;
        } catch (error) {
            console.error("Error fetching securities:", error);
            throw new Error("Error fetching securities");
        }
    }
}

// Exporte um objeto que inclua seu resolver
export const resolvers = {
    Query: {
        getSecurities: (SecurityResolver.prototype.getSecurities).bind(SecurityResolver.prototype),
    },
};
