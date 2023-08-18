/* eslint-disable @typescript-eslint/ban-types */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';

interface ClassConstructor {
  new(...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto))
}


@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: ClassConstructor) { }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // * Run something before the request handel by the Handler
    console.log('I am run before the request handel');


    return next.handle().pipe(
      map((data: any) => {
        // * Run something before the response is sent out
        console.log(
          'I am running before the response is sent out'
        );
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        })
      })
    );
  }
}
