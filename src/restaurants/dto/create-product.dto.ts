import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  image_url?: string;

  @IsString()
  category: string;

  @IsBoolean()
  @IsOptional()
  is_available?: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  allergens?: string[];
}
