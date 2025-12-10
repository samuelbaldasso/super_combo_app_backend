import { CouponsService } from './coupons.service';
export declare class CouponsController {
    private readonly couponsService;
    constructor(couponsService: CouponsService);
    findActive(): Promise<import("./entities/coupon.entity").Coupon[]>;
    redeem(code: string): Promise<{
        code: string;
        discount_percentage: number;
        min_purchase: number;
        message: string;
    }>;
}
