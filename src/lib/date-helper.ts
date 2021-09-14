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
