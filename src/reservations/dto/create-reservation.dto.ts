import { IsString, IsNumber, IsDateString, IsOptional, Min } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  restaurant_id: string;

  @IsDateString()
  date_time: string; // ISO date string

  @IsNumber()
  @Min(1)
  party_size: number;

  @IsString()
  @IsOptional()
  special_requests?: string;
}
