import { IsString, IsNumber, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image_url?: string;

  @IsString()
  address: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  cuisine_type: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  categories?: string[];

  @IsBoolean()
  @IsOptional()
  is_open?: boolean;

  @IsOptional()
  opening_hours?: any;
}
