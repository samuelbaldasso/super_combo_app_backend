import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Coupon } from './entities/coupon.entity';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
  ) { }

  async findActive() {
    return this.couponRepository.find({
      where: {
        is_active: true,
        expiry_date: MoreThanOrEqual(new Date()),
      },
    });
  }

  async redeem(code: string) {
    const coupon = await this.couponRepository.findOne({ where: { code } });
    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }
    if (!coupon.is_active) {
      throw new BadRequestException('Coupon is inactive');
    }
    if (new Date() > coupon.expiry_date) {
      throw new BadRequestException('Coupon expired');
    }

    // Return discount info
    return {
      code: coupon.code,
      discount_percentage: coupon.discount_percentage,
      min_purchase: coupon.min_purchase,
      message: 'Coupon applied successfully'
    };
  }
}
