import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../restaurants/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from '../auth/entities/user.entity';
export declare class OrdersService {
    private orderRepository;
    private orderItemRepository;
    private productRepository;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>, productRepository: Repository<Product>);
    create(createOrderDto: CreateOrderDto, user: User): Promise<Order>;
    findByUser(user: User, page?: number, limit?: number): Promise<{
        data: Order[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
        };
    }>;
}
