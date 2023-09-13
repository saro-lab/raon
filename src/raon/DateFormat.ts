import {DateAgo} from "./DateAgo";

export class DateFormat {
  private readonly date: Date = new Date();

  constructor(date?: Date) {
    if (date) {
      this.date = new Date(date.getTime());
    }
  }

  public onlyDate(): DateFormat {
    const date = this.toDate();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return new DateFormat(date);
  }

  public plusYears(years: number): DateFormat {
    return this.plusMonths(years * 12);
  }

  public plusMonths(months: number): DateFormat {
    const date = this.toDate();
    const day = date.getDate();
    date.setDate(1);
    date.setMonth(date.getMonth() + months + 1);
    date.setDate(0);
    date.setDate(Math.min(date.getDate(), day));
    return DateFormat.parseByTimeMillis(date.getTime());
  }

  public plusDays(days: number): DateFormat {
    return DateFormat.parseByTimeMillis(this.timeMillis + (days * 86400000));
  }

  public plusHours(hours: number): DateFormat {
    return DateFormat.parseByTimeMillis(this.timeMillis + (hours * 3600000));
  }

  public plusMinutes(minutes: number): DateFormat {
    return DateFormat.parseByTimeMillis(this.timeMillis + (minutes * 60000));
  }

  public plusSeconds(seconds: number): DateFormat {
    return DateFormat.parseByTimeMillis(this.timeMillis + (seconds * 1000));
  }

  public plusTimeMillis(timeMillis: number): DateFormat {
    return DateFormat.parseByTimeMillis(this.timeMillis + timeMillis);
  }

  public minusYears(years: number): DateFormat { return this.plusYears(-years); }
  public minusMonths(months: number): DateFormat { return this.plusMonths(-months); }
  public minusDays(days: number): DateFormat { return this.plusDays(-days); }
  public minusHours(hours: number): DateFormat { return this.plusHours(-hours); }
  public minusMinutes(minutes: number): DateFormat { return this.plusMinutes(-minutes); }
  public minusSeconds(seconds: number): DateFormat { return this.plusSeconds(-seconds); }
  public minusTimeMillis(timeMillis: number): DateFormat { return this.plusTimeMillis(-timeMillis); }

  public get year(): number { return this.date.getFullYear(); }
  public get month(): number { return this.date.getMonth(); }
  public get dayOfMonth(): number { return this.date.getDate(); }
  public get hour(): number { return this.date.getHours(); }
  public get minute(): number { return this.date.getMinutes(); }
  public get second(): number { return this.date.getSeconds(); }
  public get millisecond(): number { return this.date.getMilliseconds(); }
  public get timeMillis(): number { return this.date.getTime(); }
  public get unixTime(): number { return Math.floor(this.timeMillis / 1000); }
  public get lastDayOfMonth(): number {
    const date = new Date(this.date.getTime());
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    return date.getDate();
  }

  public get ago(): DateAgo {
    let time = Math.floor(this.date.getTime() / 1000);
    let now = Math.floor(new Date().getTime() / 1000);

    if (time >= now) {
      return new DateAgo(DateAgo.second, 0);
    }
    if ((time + 60) > now) { // in 60 seconds
      return new DateAgo(DateAgo.second, now - time);
    }
    now = Math.floor(now / 60);
    time = Math.floor(time / 60);
    if ((time + 60) > now) { // in 60 minutes
      return new DateAgo(DateAgo.minute, now - time);
    }
    now = Math.floor(now / 60);
    time = Math.floor(time / 60);
    if ((time + 24) > now) { // in 24 hours
      return new DateAgo(DateAgo.hour, now - time);
    }
    now = Math.floor(now / 24);
    time = Math.floor(time / 24);
    if ((time + 30) > now) { // in 24 hours
      return new DateAgo(DateAgo.day, now - time);
    }
    now = Math.floor(now / 30);
    time = Math.floor(time / 30);
    if ((time + 12) > now) { // in 24 hours
      return new DateAgo(DateAgo.month, now - time);
    }
    now = Math.floor(now / 12);
    time = Math.floor(time / 12);
    return new DateAgo(DateAgo.year, now - time);
  }

  public diffDays(date: DateFormat): number {
    return Math.floor((date.onlyDate().timeMillis - this.onlyDate().timeMillis) / 86400000);
  }

  public format(format: string): string {
    let rv = format;
    rv = rv.replace(/yyyy/g, this.year.toString());
    rv = rv.replace(/MM/g, (`0${this.month + 1}`.slice(-2)));
    rv = rv.replace(/dd/g, (`0${this.dayOfMonth}`.slice(-2)));
    rv = rv.replace(/HH/g, (`0${this.hour}`.slice(-2)));
    rv = rv.replace(/mm/g, (`0${this.minute}`.slice(-2)));
    rv = rv.replace(/ss/g, (`0${this.second}`.slice(-2)));
    rv = rv.replace(/zzz/g, (`00${this.millisecond}`.slice(-3)));
    return rv;
  }

  public static parseByTimeMillis(timeMillis: number): DateFormat {
    return new DateFormat(new Date(timeMillis));
  }

  public static parseByUnixTime(unixTime: number): DateFormat {
    return DateFormat.parseByTimeMillis(unixTime * 1000);
  }

  public static now(): DateFormat {
    return new DateFormat(new Date());
  }

  public static parseByFormat(date: string, format: string): DateFormat {
    let t: number;
    let rv = new Date(2000, 0, 1, 0, 0, 0, 0); // prevent the leap year exception
    t = format.indexOf('zzz');
    rv.setMilliseconds(t !== -1 ? Number(date.substring(t, t + 3)) : 0);
    t = format.indexOf('ss');
    rv.setSeconds(t !== -1 ? Number(date.substring(t, t + 2)) : 0);
    t = format.indexOf('mm');
    rv.setMinutes(t !== -1 ? Number(date.substring(t, t + 2)) : 0);
    t = format.indexOf('HH');
    rv.setHours(t !== -1 ? Number(date.substring(t, t + 2)) : 0);
    t = format.indexOf('dd');
    rv.setDate(t !== -1 ? Number(date.substring(t, t + 2)) : 1);
    t = format.indexOf('MM');
    rv.setMonth(t !== -1 ? Number(date.substring(t, t + 2)) - 1 : 0);
    t = format.indexOf('yyyy');
    rv.setFullYear(t !== -1 ? Number(date.substring(t, t + 4)) : 2000);
    return new DateFormat(rv);
  }

  public clone(): DateFormat {
    return new DateFormat(this.date);
  }

  public toDate(): Date {
    return new Date(this.date.getTime());
  }

  public toString(): String {
    return this.format('yyyy-MM-dd HH:mm:ss');
  }
}
