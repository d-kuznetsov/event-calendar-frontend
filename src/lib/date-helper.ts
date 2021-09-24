export function getDateAsStr(date: Date) {
  return date.toISOString().substr(0, 10);
}

export function getWeekPeriod(date: Date | string): [string, string] {
  if (typeof date === "string") {
    date = new Date(date);
  }
  const startWeek = new Date(date);
  const endWeek = new Date(date);
  const diff = date.getDay() == 0 ? 7 : date.getDay();
  startWeek.setDate(startWeek.getDate() - diff + 1);
  endWeek.setDate(endWeek.getDate() + (7 - diff));
  return [getDateAsStr(startWeek), getDateAsStr(endWeek)];
}

export function getNextDate(dateStr: string) {
  const date = new Date(dateStr);
  let monthDay = date.getDate();
  date.setDate(++monthDay);
  return getDateAsStr(date);
}

export function getPrevDate(dateStr: string) {
  const date = new Date(dateStr);
  let monthDay = date.getDate();
  date.setDate(--monthDay);
  return getDateAsStr(date);
}

export function getTimeStrByHour(h: number) {
  return `0${h}:00`.slice(-5);
}

const formatter = new Intl.DateTimeFormat("en", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

export function getDayName(dateStr: string) {
  return formatter.format(new Date(dateStr));
}

export class Range {
  readonly from: string;
  readonly to: string;

  constructor(from: string, to: string) {
    this.from = from;
    this.to = to;
  }

  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,

      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.step() };
        } else {
          return { done: true };
        }
      },

      step() {
        const currentDate = new Date(this.current);
        let dayOfMonth = currentDate.getDate();
        const nextDate = new Date(currentDate);
        nextDate.setDate(++dayOfMonth);
        this.current = getDateAsStr(nextDate);
        return getDateAsStr(currentDate);
      },
    };
  }
}
