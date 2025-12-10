import { Order } from './order.entity';
export declare class OrderItem {
    id: string;
    order_id: string;
    order: Order;
    product_id: string;
    product_name: string;
    price: number;
    quantity: number;
    notes: string | null;
}
