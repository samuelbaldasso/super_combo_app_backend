import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './auth/entities/user.entity';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { Product } from './restaurants/entities/product.entity';
import { Coupon } from './coupons/entities/coupon.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const userRepository = dataSource.getRepository(User);
  const restaurantRepository = dataSource.getRepository(Restaurant);
  const productRepository = dataSource.getRepository(Product);
  const couponRepository = dataSource.getRepository(Coupon);

  console.log('Seeding started...');

  // Users
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

  // Restaurants
  const restaurants = [];
  for (let i = 1; i <= 10; i++) {
    const restaurant = restaurantRepository.create({
      name: `Restaurant ${i}`,
      description: `Description for Restaurant ${i}`,
      image_url: `https://example.com/res${i}.jpg`,
      address: `Address ${i}`,
      latitude: 40.7128 + (Math.random() - 0.5) * 0.1, // Near NYC
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

  // Products
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

  // Coupons
  for (let i = 1; i <= 5; i++) {
    const coupon = couponRepository.create({
      code: `SAVE${i}0`,
      title: `${i}0% Off`,
      description: `Save ${i}0% on your order`,
      discount_percentage: i * 10,
      min_purchase: 20.00,
      expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
      is_active: true,
    });
    await couponRepository.save(coupon);
  }
  console.log('5 Coupons created');

  console.log('Seeding completed!');
  await app.close();
}

bootstrap();
