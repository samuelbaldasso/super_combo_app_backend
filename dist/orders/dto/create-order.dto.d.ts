export declare class CreateOrderItemDto {
    product_id: string;
    quantity: number;
    notes?: string;
}
export declare class CreateOrderDto {
    restaurant_id: string;
    items: CreateOrderItemDto[];
    notes?: string;
}
