import { Injectable, Logger } from '@nestjs/common';
import { QUOTES } from 'src/data/quotes.data';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QuotesService {
  private readonly redis = new Redis({
    host: 'redis',  // Get this from .env
    port: 6379,    // Get this from .env
  });

  constructor(private readonly configService: ConfigService) { }

  async getDailyQuotes(): Promise<string[]> {
    const cacheKey = 'daily_quotes';
    const cachedQuotes = await this.redis.get(cacheKey);
    Logger.log('getDailyQuotes called');

    if (cachedQuotes) {
      Logger.log("Retrieved from Redis cache");
      return JSON.parse(cachedQuotes);
    }

    const dateSeed = new Date().toISOString().split('T')[0];
    const hash = [...dateSeed].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const dailyQuotes = QUOTES.sort((a, b) => (a.length + hash) % QUOTES.length - (b.length + hash) % QUOTES.length).slice(0, 10);

    await this.redis.set(cacheKey, JSON.stringify(dailyQuotes), 'EX', this.getSecondsUntilMidnight());

    return dailyQuotes;
  }

  getRandomQuote(): string {
    Logger.log('getRandomQuote called');
    return QUOTES[Math.floor(Math.random() * QUOTES.length)];
  }

  // Calculate seconds until midnight
  private getSecondsUntilMidnight(): number {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight.getTime() - now.getTime()) / 1000);
  }
  
}