import { Controller, Get, Query } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Almanax } from '../models/almanax-dto.model';
import { AlmanaxService } from '../services/almanax.service';
import { AlmanaxDto } from './almanax-dto.model';

@Controller()
export class AppController {
  constructor(private readonly almanaxService: AlmanaxService) {}

  @Get('v1/almanax')
  fetchAlmanax(@Query('date') queryDate: string): Observable<AlmanaxDto> {
    const date: Date = !queryDate ? new Date() : new Date(queryDate);
    return this.almanaxService
      .fetchAlamanax(date)
      .pipe(map((almanax: Almanax) => this.map(almanax)));
  }

  private map(almanax: Almanax): AlmanaxDto {
    return {
      date: almanax.date.toISOString(),
      type: almanax.type,
      bonus: almanax.bonus,
      offer: almanax.offer,
      image: almanax.image,
    };
  }
}
