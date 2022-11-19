import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from "passport-jwt";
import { Authentication } from "src/authentication.entity";


/**
 * A JWT strategy that verify and validate the JWT and decode it
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(@InjectRepository(Authentication) private authenticationRepository: Repository<Authentication>) {
        super({ secretOrKey: "#2b$100c$fgG29wf1IbGlI7hOHkhaJO43ZUTlohNH9tXHNJKJJ1zg899FN3sK", jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() })
    }

    async validate(payload: any): Promise<any> {
        const { id, email, userType } = payload
        const user = await this.authenticationRepository.findOne({ where: { email } })

        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}