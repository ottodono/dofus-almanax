import { Almanax } from './almanax-dto.model';

export interface Builder {
  date(date: Date): Builder;
  type(type: string): Builder;
  bonus(bonus: string): Builder;
  offer(offer: string): Builder;
  image(image: string): Builder;
  build(): Almanax;
}

export class AlmanaxBuilder implements Builder {
  private _date: Date;
  private _type: string;
  private _bonus: string;
  private _offer: string;
  private _image: string;

  date(date: Date): Builder {
    this._date = date;
    return this;
  }

  type(type: string): Builder {
    this._type = type;
    return this;
  }

  bonus(bonus: string): Builder {
    this._bonus = bonus;
    return this;
  }

  offer(offer: string): Builder {
    this._offer = offer;
    return this;
  }

  image(image: string): Builder {
    this._image = image;
    return this;
  }

  build(): Almanax {
    return new Almanax(
      this._date,
      this._type,
      this._bonus,
      this._offer,
      this._image,
    );
  }
}
