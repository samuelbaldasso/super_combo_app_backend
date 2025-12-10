import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
export declare class CouponsService {
    private couponRepository;
    constructor(couponRepository: Repository<Coupon>);
    findActive(): Promise<Coupon[]>;
    redeem(code: string): Promise<{
        code: string;
        discount_percentage: number;
        min_purchase: number;
        message: string;
    }>;
}
