import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  data: T;
  meta: Record<string, unknown> | null;
  error: null;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor
{
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((response) => {
        if (response?.data !== undefined) {
          return {
            data: response.data,
            meta: response.meta ?? null,
            error: null,
          };
        }

        return {
          data: response,
          meta: null,
          error: null,
        };
      }),
    );
  }
}