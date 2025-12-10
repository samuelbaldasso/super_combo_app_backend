import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../restaurants/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async create(createOrderDto: CreateOrderDto, user: User) {
    // Validate products and calculate subtotal
    const productIds = createOrderDto.items.map(i => i.product_id);
    const products = await this.productRepository.findBy({ id: In(productIds) });

    if (products.length !== productIds.length) {
      throw new BadRequestException('Some products not found');
    }

    const productMap = new Map(products.map(p => [p.id, p]));
    let subtotal = 0;

    const items: OrderItem[] = [];

    for (const itemDto of createOrderDto.items) {
      const product = productMap.get(itemDto.product_id);
      if (!product) {
        throw new BadRequestException(`Product ${itemDto.product_id} not found`);
      }
      if (product.restaurant_id !== createOrderDto.restaurant_id) {
        throw new BadRequestException('All items must be from the same restaurant');
      }
      subtotal += Number(product.price) * itemDto.quantity;

      const orderItem = new OrderItem();
      orderItem.product_id = product.id;
      orderItem.product_name = product.name;
      orderItem.price = Number(product.price);
      orderItem.quantity = itemDto.quantity;
      orderItem.notes = itemDto.notes || null;
      items.push(orderItem);
    }

    const tax = subtotal * 0.10;
    const delivery_fee = 5.00;
    const total = subtotal + tax + delivery_fee;

    const order = this.orderRepository.create({
      user_id: user.id,
      restaurant_id: createOrderDto.restaurant_id,
      subtotal,
      tax,
      delivery_fee,
      total,
      status: 'pending',
      notes: createOrderDto.notes,
      items,
    });

    return this.orderRepository.save(order);
  }

  async findByUser(user: User, page: number = 1, limit: number = 20) {
    const [data, total] = await this.orderRepository.findAndCount({
      where: { user_id: user.id },
      relations: ['items', 'restaurant'],
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' }, // id or created_at if added
    });

    return {
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        total_pages: Math.ceil(total / limit),
      },
    };
  }
}
