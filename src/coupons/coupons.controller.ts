import { Controller, Get, Post, Param } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) { }

  @Get('active')
  @ApiOperation({ summary: 'List active coupons' })
  findActive() {
    return this.couponsService.findActive();
  }

  @Post(':code/redeem')
  @ApiOperation({ summary: 'Redeem coupon' })
  redeem(@Param('code') code: string) {
    return this.couponsService.redeem(code);
  }
}
