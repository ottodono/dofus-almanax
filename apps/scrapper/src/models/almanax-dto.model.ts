import {
  AlmanaxBuilder as AlmanaxBuilder,
  Builder,
} from './almanax-dto-builder.model';

export class Almanax {
  private _date: Date;
  private _type: string;
  private _bonus: string;
  private _offer: string;
  private _image: string;

  constructor(
    date: Date,
    type: string,
    bonus: string,
    offer: string,
    image: string,
  ) {
    this._date = date;
    this._type = type;
    this._bonus = bonus;
    this._offer = offer;
    this._image = image;
  }

  public static builder(): Builder {
    return new AlmanaxBuilder();
  }

  public get date(): Date {
    return this._date;
  }

  public get type(): string {
    return this._type;
  }

  public get bonus(): string {
    return this._bonus;
  }

  public get offer(): string {
    return this._offer;
  }

  public get image(): string {
    return this._image;
  }
}
