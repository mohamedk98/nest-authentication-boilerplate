import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from "@nestjs/common"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { plainToInstance } from "class-transformer"

//An interface to allow only DTOs to be used
interface ClassConstructor {
    new(...args: any[]): {};
}

//Custom Decorator to use in serialize
export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))

}
export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) { }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        //This Run before request

        //This run before response is sent
        return next.handle().pipe(
            map((data: any) => {
                return plainToInstance(this.dto, data, { excludeExtraneousValues: true })
            })
        )
    }
}