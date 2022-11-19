import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { AuthenticationService } from './authentication.service';
import { Request } from 'express';
export declare class AuthenticationController {
    private authenticationService;
    private jwtService;
    constructor(authenticationService: AuthenticationService, jwtService: JwtService);
    register(body: CreateUserDto): Promise<import("../authentication.entity").Authentication>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
    }>;
    access(req: Request): string;
}
