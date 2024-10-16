import { SecurityService } from '../services/SecurityServices';
import { Security } from '../models/Security';
import { Price } from '../models/Price';

// The SecurityController class handles the business logic for fetching securities and their prices
export class SecurityController {
    private securityService: SecurityService;

    constructor() {
        this.securityService = new SecurityService();
    }

    // Fetches the list of securities
    async getSecurities(): Promise<Security[]> {
        return await this.securityService.getSecurities();
    }

    // Fetches the list of prices by security ID
    async getPricesBySecurityId(security_id: number): Promise<Price[]> {
        return await this.securityService.getPricesBySecurityId(security_id);
    }
    
    
    // Fetches security details by its ticker symbol
    async getSecurityByTicker(ticker: string): Promise<Security | null> {
        return await this.securityService.getSecurityByTicker(ticker);
    }
}
