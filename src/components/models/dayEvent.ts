import { Dayjs } from "dayjs"

export class CalendarEvent {
  id: string;
  timeStart: Dayjs;
  timeEnd: Dayjs;
  timeDelta: number;
  label: string;
  day: number;

  constructor(
    id: string,
    timeStart: Dayjs,
    timeEnd: Dayjs,
    timeDelta: number,
    label: string,
    day: number
  ) {
    this.id = id;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.timeDelta = timeDelta;
    this.label = label;
    this.day = day;
  }
}

