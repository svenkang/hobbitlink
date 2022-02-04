import { Injectable } from '@nestjs/common';
import { addDays } from 'date-fns';
import { DAYS_TO_EXPIRATION } from './expiration.interface';

@Injectable()
export class ExpirationService {
  public getExpirationDate(today: Date = new Date()): Date {
    return addDays(today, DAYS_TO_EXPIRATION);
  }
}
