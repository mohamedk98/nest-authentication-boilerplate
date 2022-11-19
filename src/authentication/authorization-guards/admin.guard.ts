import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
 export class AdminGuard implements CanActivate {
  constructor (private role: string) {}
  canActivate (
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    return request.user.userType === this.role ? true : false
  }
}

