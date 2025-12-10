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
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurant_entity_1 = require("./entities/restaurant.entity");
const product_entity_1 = require("./entities/product.entity");
let RestaurantsService = class RestaurantsService {
    restaurantRepository;
    productRepository;
    constructor(restaurantRepository, productRepository) {
        this.restaurantRepository = restaurantRepository;
        this.productRepository = productRepository;
    }
    async findAll(query) {
        const { lat, lng, radius, category, page = 1, limit = 20 } = query;
        const skip = (page - 1) * limit;
        const qb = this.restaurantRepository.createQueryBuilder('restaurant');
        if (lat && lng && radius) {
            qb.addSelect(`(6371 * acos(cos(radians(:lat)) * cos(radians(restaurant.latitude)) * cos(radians(restaurant.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(restaurant.latitude))))`, 'distance')
                .having('distance < :radius')
                .setParameter('lat', lat)
                .setParameter('lng', lng)
                .setParameter('radius', radius)
                .orderBy('distance', 'ASC');
        }
        if (category) {
            qb.andWhere(':category = ANY(restaurant.categories)', { category });
        }
        qb.skip(skip).take(limit);
        const [data, total] = await qb.getManyAndCount();
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
    async findOne(id) {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id },
            relations: ['products'],
        });
        if (!restaurant)
            throw new common_1.NotFoundException('Restaurant not found');
        return restaurant;
    }
    async findMenu(id) {
        const restaurant = await this.findOne(id);
        const products = await this.productRepository.find({ where: { restaurant_id: id } });
        const categoriesMap = new Map();
        products.forEach((p) => {
            if (!categoriesMap.has(p.category)) {
                categoriesMap.set(p.category, []);
            }
            categoriesMap.get(p.category).push(p);
        });
        const categories = [];
        categoriesMap.forEach((items, name) => {
            categories.push({ name, items });
        });
        return { categories };
    }
};
exports.RestaurantsService = RestaurantsService;
exports.RestaurantsService = RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RestaurantsService);
//# sourceMappingURL=restaurants.service.js.map