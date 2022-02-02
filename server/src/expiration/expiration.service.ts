import { Injectable } from '@nestjs/common';
import { addDays } from 'date-fns';

export const DAYS_TO_EXPIRATION = 1;

@Injectable()
export class ExpirationService {
  public getExpirationDate(today: Date = new Date()): Date {
    return addDays(today, DAYS_TO_EXPIRATION);
  }
}
