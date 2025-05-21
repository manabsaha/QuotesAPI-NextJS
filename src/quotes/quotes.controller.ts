import { Controller, Get } from '@nestjs/common';
import { QuotesService } from './quotes.service';

/**
 * @controller QuotesController
 * @description Handles quote-related requests
 */
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  /**
   * @route GET /quotes/daily
   * @description Returns a list of top 10 quotes for the day
   * @returns {string[]} Array of quotes
   */
  @Get('daily')
  async getDailyQuotes(): Promise<string[]> {
    return this.quotesService.getDailyQuotes();
  }

  /**
   * @route GET /quotes/random
   * @description Returns a random quote
   * @returns {string} A single random quote
   */
  @Get('random')
  getRandomQuote(): string {
    return this.quotesService.getRandomQuote();
  }
}