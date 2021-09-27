function toMinutes(timeStr: string) {
  const [hours, minutes] = timeStr.split(":");
  return parseInt(hours) * 60 + parseInt(minutes);
}

export function getPercentageOfDur(
  periodStartStr: string,
  periodEndStr: string,
  durStr: string = "24:00"
) {
  const eventDur = toMinutes(periodEndStr) - toMinutes(periodStartStr);
  const wholeDur = toMinutes(durStr);
  return Math.round((eventDur / wholeDur) * 10000) / 100;
}

export class AreaManager {
  readonly height: number;
  readonly width: number;
  readonly coordList: Array<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }>;

  constructor(h: number = 100, w: number = 100) {
    this.height = h;
    this.width = w;
    this.coordList = [];
  }

  add(x1: number, y1: number, x2: number, y2: number) {
    this.coordList.push({
      x1,
      y1,
      x2,
      y2,
    });
  }

  check(candX1: number, candY1: number, candX2: number, candY2: number) {
    return this.coordList.every(({ x1, x2, y1, y2 }) => {
      return candY2 <= y1 || candY1 >= y2 || candX1 >= x2 || candX2 <= x1;
    });
  }
}
