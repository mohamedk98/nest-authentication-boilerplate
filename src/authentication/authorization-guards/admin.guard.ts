import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators'
import { Observable } from 'rxjs'
import { UserTypes } from 'src/utils/user-types'

export function UseAuthorizationGuard (role: string) {
  return UseGuards(new AuthorizationGuard(role))
}

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor (private role: string) {}
  canActivate (
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    return request.user.userType === this.role ? true : false
  }
}
