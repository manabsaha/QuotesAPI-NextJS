import { Injectable } from '@nestjs/common';
import { QUOTES } from 'src/data/quotes.data';

@Injectable()
export class QuotesService {

  getDailyQuotes(): string[] {
    return this.getDailyQuotesHelper();
  }

  getRandomQuote(): string {
    return QUOTES[Math.floor(Math.random() * QUOTES.length)];
  }

  private getDailyQuotesHelper(): string[] {
    const dateSeed = new Date().toISOString().split('T')[0]; // Use date as seed
    const hash = [...dateSeed].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return QUOTES.sort((a, b) => (a.length + hash) % QUOTES.length - (b.length + hash) % QUOTES.length).slice(0, 10);
  }
  
}