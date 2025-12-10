import { IsString, IsNumber, IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class CreateCouponDto {
  @IsString()
  code: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  discount_percentage: number;

  @IsNumber()
  min_purchase: number;

  @IsDateString()
  expiry_date: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
