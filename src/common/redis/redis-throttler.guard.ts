import { Injectable, ExecutionContext } from '@nestjs/common'
import { ThrottlerGuard } from '@nestjs/throttler'
import type { ThrottlerModuleOptions, ThrottlerStorage } from '@nestjs/throttler'
import { Reflector } from '@nestjs/core'
import { RedisService } from './redis.service'

@Injectable()
export class RedisThrottlerGuard extends ThrottlerGuard {
  constructor(
    options: ThrottlerModuleOptions,
    storageService: ThrottlerStorage,
    reflector: Reflector,
    private readonly redisService: RedisService,
  ) {
    super(options, storageService, reflector)
  }

  protected async getTracker(req: Record<string, any>): Promise<string> {
    return req.ip
  }

  protected async increment(key: string, ttl: number): Promise<number> {
    const redis = this.redisService.getClient()

    const count = await redis.incr(key)

    if (count === 1) {
      await redis.expire(key, ttl)
    }

    return count
  }
}