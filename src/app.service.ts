import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      message: 'Quotes Application Routes',
      routes: [
        { method: 'GET', path: '/quotes/random', description: 'Fetch a random quote' },
        { method: 'GET', path: '/quotes/daily', description: 'Fetch daily quotes' }
      ]
    };
  }
}
