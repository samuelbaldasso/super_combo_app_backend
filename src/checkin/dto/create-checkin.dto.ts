import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCheckInDto {
  @IsString()
  restaurant_id: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;
}
