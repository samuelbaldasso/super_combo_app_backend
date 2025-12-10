import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
export declare class ReservationsController {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    create(createReservationDto: CreateReservationDto, req: any): Promise<import("./entities/reservation.entity").Reservation>;
    findAll(req: any, page: number, limit: number): Promise<{
        data: import("./entities/reservation.entity").Reservation[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
        };
    }>;
    cancel(id: string, req: any): Promise<import("./entities/reservation.entity").Reservation>;
}
