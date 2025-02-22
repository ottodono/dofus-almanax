import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Almanax } from 'src/models/almanax-dto.model';
import * as cheerio from 'cheerio';
import { off } from 'process';

@Injectable()
export class AlmanaxService {
  constructor(private readonly httpService: HttpService) {}

  fetchAlamanax(date: Date): Observable<Almanax> {
    return this.httpService
      .get(`https://www.krosmoz.com/fr/almanax/${this.formatDate(date)}`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        },
      })
      .pipe(
        map((response) => {
          if (response.status !== 200) {
            throw new Error(
              'Unexpected error while calling ' + response.config.url,
            );
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const $ = cheerio.load(response.data);
          const type = $('.mid')
            .contents()
            .filter(function () {
              return this.nodeType === 3; // Select text nodes
            })
            .text()
            .trim();
          console.log(this.sanitizeType(type));
          // const bonus = $($('#achievement_dofus .mid .more')[0]).text();
          // const almanax = $($('#achievement_dofus .more-infos-content')[0]);
          // const offer = almanax.find('p').text().trim();
          // const image = almanax.find('img').attr('src');
          // console.log(`${type}, ${bonus}, ${offer}, ${image}`);
          return (
            Almanax.builder()
              .date(date)
              .type(this.sanitizeType(type))
              // .bonus(this.sanitizeBonus(bonus))
              // .offer(this.sanitizeOffer(offer))
              // .image(image || '')
              .build()
          );
        }),
      );
  }

  private formatDate(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  private sanitizeType(bonus: string): string {
    return bonus.split(':')[1].trim();
  }

  private sanitizeBonus(bonus: string): string {
    return bonus.substring(0, bonus.indexOf('Quête')).trim();
  }

  private sanitizeOffer(offer: string): string {
    return offer
      .replace('Récupérer ', '')
      .replace(" et rapporter l'offrande à Théodoran Ax", '');
  }
}
