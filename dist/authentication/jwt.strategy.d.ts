import { Repository } from 'typeorm';
import { Strategy } from "passport-jwt";
import { Authentication } from "src/authentication.entity";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authenticationRepository;
    constructor(authenticationRepository: Repository<Authentication>);
    validate(payload: any): Promise<any>;
}
export {};
