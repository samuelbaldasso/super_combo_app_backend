export declare class CreateCouponDto {
    code: string;
    title: string;
    description: string;
    discount_percentage: number;
    min_purchase: number;
    expiry_date: string;
    is_active?: boolean;
}
