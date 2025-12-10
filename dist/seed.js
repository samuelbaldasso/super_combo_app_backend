"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const user_entity_1 = require("./auth/entities/user.entity");
const restaurant_entity_1 = require("./restaurants/entities/restaurant.entity");
const product_entity_1 = require("./restaurants/entities/product.entity");
const coupon_entity_1 = require("./coupons/entities/coupon.entity");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const dataSource = app.get(typeorm_1.DataSource);
    const userRepository = dataSource.getRepository(user_entity_1.User);
    const restaurantRepository = dataSource.getRepository(restaurant_entity_1.Restaurant);
    const productRepository = dataSource.getRepository(product_entity_1.Product);
    const couponRepository = dataSource.getRepository(coupon_entity_1.Coupon);
    console.log('Seeding started...');
    const password = await bcrypt.hash('password123', 10);
    for (let i = 1; i <= 5; i++) {
        const user = userRepository.create({
            name: `User ${i}`,
            email: `user${i}@example.com`,
            password,
            phone: `123456789${i}`,
        });
        await userRepository.save(user);
    }
    console.log('5 Users created');
    const restaurants = [];
    for (let i = 1; i <= 10; i++) {
        const restaurant = restaurantRepository.create({
            name: `Restaurant ${i}`,
            description: `Description for Restaurant ${i}`,
            image_url: `https://example.com/res${i}.jpg`,
            address: `Address ${i}`,
            latitude: 40.7128 + (Math.random() - 0.5) * 0.1,
            longitude: -74.0060 + (Math.random() - 0.5) * 0.1,
            rating: 4.5,
            review_count: 10 + i,
            cuisine_type: i % 2 === 0 ? 'Italian' : 'American',
            categories: ['Lunch', 'Dinner'],
            is_open: true,
        });
        const saved = await restaurantRepository.save(restaurant);
        restaurants.push(saved);
    }
    console.log('10 Restaurants created');
    for (const restaurant of restaurants) {
        for (let j = 1; j <= 3; j++) {
            const product = productRepository.create({
                restaurant_id: restaurant.id,
                name: `${restaurant.name} Item ${j}`,
                description: `Delicious item ${j}`,
                price: 10.00 + j,
                category: j === 1 ? 'Starter' : 'Main',
                is_available: true,
            });
            await productRepository.save(product);
        }
    }
    console.log('30 Products created');
    for (let i = 1; i <= 5; i++) {
        const coupon = couponRepository.create({
            code: `SAVE${i}0`,
            title: `${i}0% Off`,
            description: `Save ${i}0% on your order`,
            discount_percentage: i * 10,
            min_purchase: 20.00,
            expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            is_active: true,
        });
        await couponRepository.save(coupon);
    }
    console.log('5 Coupons created');
    console.log('Seeding completed!');
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map