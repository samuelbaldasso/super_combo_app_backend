import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ReservationsModule } from './reservations/reservations.module';
import { OrdersModule } from './orders/orders.module';
import { CheckinModule } from './checkin/checkin.module';
import { CouponsModule } from './coupons/coupons.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { User } from './auth/entities/user.entity';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { Product } from './restaurants/entities/product.entity';
import { Reservation } from './reservations/entities/reservation.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { CheckIn } from './checkin/entities/checkin.entity';
import { Coupon } from './coupons/entities/coupon.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true, // Set to false in production
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    RestaurantsModule,
    ReservationsModule,
    OrdersModule,
    CheckinModule,
    CouponsModule,
    RecommendationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
