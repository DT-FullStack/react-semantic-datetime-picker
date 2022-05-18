import _ from 'lodash'
import { DateObjectUnits, DateTime, Info, InfoUnitOptions, StringUnitLength } from 'luxon'

export interface UseDatetime {
  datetime?: DateTime
  setDatetime?: (dt: DateTime) => any
  onSet?: () => void
}
export interface OnClickOut {
  onClickOut: () => void
}

export function sundayFirstWeekdays(length?: StringUnitLength, options?: InfoUnitOptions): string[] {
  let weekdays = Info.weekdays(length, options);
  let finalDay = weekdays.pop();
  weekdays.splice(0, 0, finalDay as string);
  return weekdays;
}
export function daysInMonthArray(dt: DateTime): number[] {
  const arr = [];
  for (let i = 1; i < dt.daysInMonth + 1; i++) {
    arr.push(i);
  }
  return arr;
}
export function firstDayOffset(dt: DateTime): number {
  // FOR CALENDARS STARTING ON SUNDAY
  const firstDay = dt.set({ day: 1 });
  const weekday = firstDay.weekday as number;
  return weekday % 7;
}
export function calDaysChunks(dt: DateTime): DateObjectUnits[][] {
  const getDateObject = (lux: DateTime): DateObjectUnits => ({ month: lux.month, day: lux.day });
  const days = daysInMonthArray(dt).map(day => getDateObject(dt.set({ day })))
  let offset = firstDayOffset(dt);
  let prev = dt.set({ day: 0 }).minus({ day: 1 });
  let next = dt.set({ day: 1 }).plus({ month: 1 });
  while (offset > 0) {
    days.splice(0, 0, getDateObject(prev));
    prev = prev.minus({ day: 1 })
    offset--;
  }
  const chunks = _.chunk(days, 7);
  while (chunks[chunks.length - 1].length < 7) {
    chunks[chunks.length - 1].push(getDateObject(next));
    next = next.plus({ day: 1 })
  }
  return chunks;
}
