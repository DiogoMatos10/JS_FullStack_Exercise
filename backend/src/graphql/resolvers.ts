// src/graphql/resolvers.ts
import { Resolver, Query, Arg } from 'type-graphql';
import { Security } from './models/Security';
import { Price } from './models/Price';
import { AppDataSource } from '../db';

@Resolver()
export class SecurityResolver {
    
    // Resolver para buscar todas as Securities
    @Query(() => [Security])
    async getSecurities() {
        try {
            const securities = await AppDataSource.getRepository(Security).find({
                relations: [], 
            });
            return securities;
        } catch (error) {
            console.error("Error fetching securities:", error);
            throw new Error("Error fetching securities");
        }
    }

    // Resolver para buscar os Prices de uma Security pelo ID
    @Query(() => [Price])
    async getPricesBySecurityId(@Arg('securityId') securityId: number) {
        try {
            const prices = await AppDataSource.getRepository(Price).find({
                where: { security: { id: securityId } },
            });
            return prices;
        } catch (error) {
            console.error("Error fetching prices:", error);
            throw new Error("Error fetching prices");
        }
    }
}

// Exporte um objeto que inclua seus resolvers
export const resolvers = {
    Query: {
        getSecurities: (SecurityResolver.prototype.getSecurities).bind(SecurityResolver.prototype),
        getPricesBySecurityId: (SecurityResolver.prototype.getPricesBySecurityId).bind(SecurityResolver.prototype),
    },
};
