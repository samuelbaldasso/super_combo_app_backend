import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        user: any;
        access_token: string;
        refresh_token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            photo_url: string;
            created_at: Date;
            updated_at: Date;
            reservations: import("../reservations/entities/reservation.entity").Reservation[];
            orders: import("../orders/entities/order.entity").Order[];
            checkins: import("../checkin/entities/checkin.entity").CheckIn[];
        };
        access_token: string;
        refresh_token: string;
    }>;
    google(body: {
        id_token: string;
    }): Promise<{
        message: string;
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    apple(body: {
        id_token: string;
    }): Promise<{
        message: string;
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    logout(): {
        message: string;
    };
    forgotPassword(body: {
        email: string;
    }): {
        message: string;
    };
}
