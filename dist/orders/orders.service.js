"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const product_entity_1 = require("../restaurants/entities/product.entity");
let OrdersService = class OrdersService {
    orderRepository;
    orderItemRepository;
    productRepository;
    constructor(orderRepository, orderItemRepository, productRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
    }
    async create(createOrderDto, user) {
        const productIds = createOrderDto.items.map(i => i.product_id);
        const products = await this.productRepository.findBy({ id: (0, typeorm_2.In)(productIds) });
        if (products.length !== productIds.length) {
            throw new common_1.BadRequestException('Some products not found');
        }
        const productMap = new Map(products.map(p => [p.id, p]));
        let subtotal = 0;
        const items = [];
        for (const itemDto of createOrderDto.items) {
            const product = productMap.get(itemDto.product_id);
            if (!product) {
                throw new common_1.BadRequestException(`Product ${itemDto.product_id} not found`);
            }
            if (product.restaurant_id !== createOrderDto.restaurant_id) {
                throw new common_1.BadRequestException('All items must be from the same restaurant');
            }
            subtotal += Number(product.price) * itemDto.quantity;
            const orderItem = new order_item_entity_1.OrderItem();
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
    async findByUser(user, page = 1, limit = 20) {
        const [data, total] = await this.orderRepository.findAndCount({
            where: { user_id: user.id },
            relations: ['items', 'restaurant'],
            skip: (page - 1) * limit,
            take: limit,
            order: { id: 'DESC' },
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
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map