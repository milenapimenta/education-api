import { RedisService } from './redis.service'

export class RedisThrottlerStorage {
  constructor(private readonly redisService: RedisService) {}

  async increment(key: string, ttl: number): Promise<number> {
    const client = this.redisService.getClient()

    const count = await client.incr(key)

    if (count === 1) {
      await client.expire(key, ttl)
    }

    return count
  }

  async get(key: string): Promise<number> {
    const client = this.redisService.getClient()

    const value = await client.get(key)

    return value ? parseInt(value) : 0
  }
}