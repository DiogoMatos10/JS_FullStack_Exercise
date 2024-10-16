import { AppDataSource } from '../../db';
import { Security } from '../models/Security';
import { Price } from '../models/Price';

// The SecurityService class provides methods to interact with the database
export class SecurityService {
    // Fetches all securities from the database
    async getSecurities(): Promise<Security[]> {
        try {
            return await AppDataSource.getRepository(Security).find();
        } catch (error) {
            console.error("Error fetching securities:", error);
            throw new Error("Error fetching securities");
        }
    }

    // Fetches prices by security ID from the database
    async getPricesBySecurityId(security_id: number): Promise<Price[]> {
        try {
            return await AppDataSource.getRepository(Price).find({
                where: { security: { id: security_id } },
                relations: ['security'],
            });
        } catch (error) {
            console.error("Error fetching prices:", error);
            throw new Error("Error fetching prices");
        }
    }
    
    // Fetches security by ticker from the database
    async getSecurityByTicker(ticker: string): Promise<Security | null> {
        try {
            return await AppDataSource.getRepository(Security).findOne({ where: { ticker } });
        } catch (error) {
            console.error("Error fetching security by ticker:", error);
            throw new Error("Error fetching security by ticker");
        }
    }
}
