import { SecurityService } from '../services/SecurityServices';
import { Security } from '../models/Security';
import { Price } from '../models/Price';

export class SecurityController {
    private securityService: SecurityService;

    constructor() {
        this.securityService = new SecurityService();
    }

    async getSecurities(): Promise<Security[]> {
        return await this.securityService.getSecurities();
    }

    async getPricesBySecurityId(security_id: number): Promise<Price[]> {
        return await this.securityService.getPricesBySecurityId(security_id);
    }
    
    async getSecurityByTicker(ticker: string): Promise<Security | null> {
        return await this.securityService.getSecurityByTicker(ticker);
    }
}
