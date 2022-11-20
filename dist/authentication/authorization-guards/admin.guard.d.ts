import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare function UseAuthorizationGuard(role: string): MethodDecorator & ClassDecorator;
export declare class AuthorizationGuard implements CanActivate {
    private role;
    constructor(role: string);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
