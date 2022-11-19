import { Authentication } from 'src/authentication.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt/dist';
export declare class AuthenticationService {
    private authenticationRepository;
    private jwtService;
    constructor(authenticationRepository: Repository<Authentication>, jwtService: JwtService);
    create(body: CreateUserDto): Promise<Authentication>;
    login({ email, password }: {
        email: any;
        password: any;
    }): Promise<{
        token: string;
    }>;
    findOne(id: any): Promise<Authentication>;
}
