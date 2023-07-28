export class DateAgo {
  constructor(unit: string, value: number) {
    this.unit = unit;
    this.value = value;
  }
  readonly unit: string;
  readonly value: number;

  public static readonly second = 'second';
  public static readonly minute = 'minute';
  public static readonly hour = 'hour';
  public static readonly day = 'day';
  public static readonly month = 'month';
  public static readonly year = 'year';

  public get unitIndex() {
    switch (this.unit) {
      case DateAgo.second: return 0;
      case DateAgo.minute: return 1;
      case DateAgo.hour: return 2;
      case DateAgo.day: return 3;
      case DateAgo.month: return 4;
      case DateAgo.year: default: return 5;
    }
  }
}
