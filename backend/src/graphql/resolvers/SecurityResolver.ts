import { Query, Resolver, Arg } from 'type-graphql';
import { SecurityController } from '../controllers/SecurityController';
import { Security } from '../models/Security';
import { Price } from '../models/Price';

const securityController = new SecurityController();

@Resolver()
export class SecurityResolver {
    @Query(() => [Security])
    async getSecurities(): Promise<Security[]> {
        try {
            const securities = await securityController.getSecurities();
            console.log(`Fetched securities: ${JSON.stringify(securities)}`);
            return securities;
        } catch (error) {
            console.error("Error fetching securities:", error);
            throw new Error("Error fetching securities");
        }
    }

    @Query(() => [Price])
    async getPricesBySecurityId(@Arg('security_id') security_id: number): Promise<Price[]> {
        console.log(`Received security_id: ${security_id}`);
        if (Number.isInteger(security_id)) {
            const prices = await securityController.getPricesBySecurityId(security_id);
            console.log(`Fetched prices for security_id ${security_id}: ${JSON.stringify(prices)}`);
            return prices;
        } else {
            throw new Error("security_id must be an integer");
        }
    }

    @Query(() => Security)
    async getSecurityByTicker(@Arg('ticker') ticker: string): Promise<Security | null> {
        try {
            const security = await securityController.getSecurityByTicker(ticker);
            console.log(`Fetched security by ticker: ${JSON.stringify(security)}`);
            return security;
        } catch (error) {
            console.error(`Error fetching security by ticker: ${ticker}`, error);
            throw new Error("Error fetching security by ticker");
        }
    }
}   
