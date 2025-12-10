import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { User } from '../auth/entities/user.entity';
export declare class ReservationsService {
    private reservationRepository;
    constructor(reservationRepository: Repository<Reservation>);
    create(createReservationDto: CreateReservationDto, user: User): Promise<Reservation>;
    findByUser(user: User, page?: number, limit?: number): Promise<{
        data: Reservation[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
        };
    }>;
    cancel(id: string, user: User): Promise<Reservation>;
}
