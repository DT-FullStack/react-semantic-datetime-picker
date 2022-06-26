import _ from 'lodash'
import { DateObjectUnits, DateTime, Duration, DurationLikeObject, Info, InfoUnitOptions, StringUnitLength } from 'luxon'
import { AppInterval, ConstraintOptions, Range } from 'src/components/DateTimePicker/DateTimePicker'
import { DateTimeState } from 'src/context/datetime'

export interface UseDatetime {
  datetime?: DateTime
  setDatetime?: (dt: DateTime) => any
  onSet?: () => void
}
export interface OnClickOut {
  onClickOut: () => void
}

/**
 * Typechecks a value and gives a DateTime instance.
 * @param {DateTime | number} dt Luxon DateTime instance, or timestamp in milliseconds
 * @returns {DateTime} Luxon DateTime instance
 */
export const getDateTimeFromNumber = (dt: DateTime | number): DateTime => typeof dt === 'number' ? DateTime.fromMillis(dt) : dt;
/**
 * Converts a date-like obj into a DateTime instance
 * @param obj datetime representation, returns `obj` if it is a DateTime instance
 * @param dtReference starting point for DateTime properties, if not given uses DateTime.now
 * @returns a DateTime instance
 */
export const getDateTimeFromObj = (obj: DateTime | DateObjectUnits, dtReference?: DateTime) => {
  if (obj instanceof DateTime) return obj
  return dtReference ? dtReference.set(obj) : DateTime.fromObject(obj)
}

/**
 * Provides weekday names in the local language, starting with Sunday instead of Monday
 * @param {StringUnitLength} length desired format of weekday names
 * @param {InfoUnitOptions} options used for international calendars
 * @returns {string[]} 
 */
export function sundayFirstWeekdays(length?: StringUnitLength, options?: InfoUnitOptions): string[] {
  let weekdays = Info.weekdays(length, options);
  let finalDay = weekdays.pop();
  weekdays.splice(0, 0, finalDay as string);
  return weekdays;
}
/**
 * Gives an array of the days in the month
 * @param {DateTime} dt Any DateTime instance
 * @returns {number[]}
 */
export function daysInMonthArray(dt: DateTime): number[] {
  const arr = [];
  for (let i = 1; i < dt.daysInMonth + 1; i++) {
    arr.push(i);
  }
  return arr;
}
/**
 * Gives the number of days in the week before the 1st of the month.
 * @param {DateTime} dt Any DateTime instance within the month in question
 * @returns {number}
 */
export function firstDayOffset(dt: DateTime): number {
  // FOR CALENDARS STARTING ON SUNDAY
  const firstDay = dt.set({ day: 1 });
  const weekday = firstDay.weekday as number;
  return weekday % 7;
}
/**
 * Gives easy to work with chunks for calendar weeks.
 * Each chunk includes 7 days, including days from the previous month or next month when necessary
 * @param {DateTime} dt Any DateTime instance within a given month
 * @returns {DateObjectUnits[][]}
 */
export function calDaysChunks(dt: DateTime): DateObjectUnits[][] {
  const getDateObject = (lux: DateTime): DateObjectUnits => ({ month: lux.month, day: lux.day, year: lux.year, weekday: lux.weekday });
  const days = daysInMonthArray(dt).map(day => getDateObject(dt.set({ day })))
  let offset = firstDayOffset(dt);
  let prev = dt.set({ day: 1 }).minus({ day: 1 });
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

/**
 * All of the keys available for DateObjectUnits
 */
export type DateObjectUnitKey = 'year' | 'month' | 'day' | 'ordinal' | 'weekYear' | 'weekNumber' | 'weekday' | 'hour' | 'minute' | 'second' | 'millisecond'
/**
 * Any function that compares two DateTimeLike objects and returns a boolean
 */
export type MatchFunction = (toMatch: DateTime | DateObjectUnits, toCheck: DateObjectUnits) => boolean

/**
 * Generates a function that compares two DateTimeLike objects.
 * Compares only the keys passed as arguments and ignores all other keys
 * @param keys An array of keys to match
 * @returns {MatchFunction}
 */
export function matchDtObject(keys: DateObjectUnitKey[]): MatchFunction {
  return function (toMatch, objToCheck) {

    // /**
    //  * Creating a DateTime instance from `objToCheck`
    //  * This allows us to check keys even if they are not explicitly assigned
    //  */
    let dtToCheck = DateTime.fromObject(objToCheck)
    for (let key of keys) {
      if (toMatch[key] !== undefined && toMatch[key] !== dtToCheck[key]) {
        if (key === 'second' || key === 'millisecond') {
          console.log(key, objToCheck, { dtToCheck: dtToCheck[key], toMatch: toMatch[key] })
        }
        return false
      }
    }
    return true;
  }
}
/**
 * Commonly used match functions
 */
export const match = {
  year: matchDtObject(['year']),
  month: matchDtObject(['year', 'month']),
  date: matchDtObject(['year', 'month', 'day', 'ordinal', 'weekNumber', 'weekday']),
  hour: matchDtObject(['year', 'month', 'day', 'ordinal', 'weekNumber', 'weekday', 'hour']),
  minute: matchDtObject(['year', 'month', 'day', 'ordinal', 'weekNumber', 'weekday', 'hour', 'minute']),
  second: matchDtObject(['year', 'month', 'day', 'ordinal', 'weekNumber', 'weekday', 'hour', 'minute', 'second']),
  millisecond: matchDtObject(['year', 'month', 'day', 'ordinal', 'weekNumber', 'weekday', 'hour', 'minute', 'millisecond']),
  full: matchDtObject(['year', 'month', 'day', 'ordinal', 'weekNumber', 'weekday', 'hour', 'minute', 'second', 'millisecond']),
  timeOnly: matchDtObject(['hour', 'minute', 'second', 'millisecond']),
}

/**
 * Any function that receives a DateTimeLike object and returns a boolean.
 */
export type RangeFunction = (toCheck: DateObjectUnits) => boolean

/**
 * Creates a function that tells you whether a DateTimeLike object is within the given range.
 * @param {Range} range A DateTime instance for start and end points
 * @returns {RangeFunction}
 */
export function withinRange(range: Range): RangeFunction {
  return function (toCheck) {
    const check = DateTime.fromObject(toCheck);
    const start = !range.start ? false :
      range.start instanceof DateTime ? range.start : check.set(range.start)
    const end = !range.end ? false :
      range.end instanceof DateTime ? range.end : check.set(range.end)
    if (start && start > check) return false;
    if (end && end < check) return false;
    return true;
  }
}
/**
 * Creates a RangeFunction based on multiple Range inputs.
 * @param {Range|Range[]} ranges A single Range or an an array of Ranges
 * @returns {RangeFunction} 
 */
export function withinAnyRange(ranges: Range | Range[]): RangeFunction {
  if (Array.isArray(ranges)) {
    return function (toCheck) {
      return ranges.find(range => withinRange(range)(toCheck)) !== undefined
    }
  } else {
    return withinRange(ranges)
  }
}

export type InclusionFunction = (toCheck: DateObjectUnits) => boolean
/**
 * Generates a function to determine if a DateTime should be included
 * @param includeRange a range with specific DateTime instances or an array of such Ra
 * @returns a function to determine if a datetime should be included
 */
export function includedByRange(includeRange?: Range | Range[]) {
  return includeRange ? withinAnyRange(includeRange) : () => true
}
/**
 * Generates a function to determine DateTime inclusion
 * @param matchFunction the function used to compare DateTime objects
 * @param inclusions an array of DateTimeLike objects or DateTime instances to include
 * @param includeRange a Range or array of Ranges to include
 * @returns a boolean function to determine DateTime inclusion
 */
export function isIncluded(
  matchFunction: MatchFunction,
  inclusions: (DateObjectUnits | DateTime)[],
  includeRange?: Range | Range[],
): InclusionFunction {
  return function (dt: DateObjectUnits) {
    return (inclusions.length ? inclusions.find(include => matchFunction(include, dt)) !== undefined : true)
      && includedByRange(includeRange)(dt);
  }
}

export type ExclusionFunction = (toCheck: DateObjectUnits) => boolean
/**
 * Generates a function to determine if a DateTime should be included
 * @param excludeRange a range with specific DateTime instances or an array of such Ra
 * @returns a function to determine if a datetime should be included
 */
export function excludedByRange(excludeRange?: Range | Range[]) {
  return excludeRange ? withinAnyRange(excludeRange) : () => false
}
/**
 * Generates a function to determine DateTime inclusion
 * @param matchFunction the function used to compare DateTime objects
 * @param exclusions an array of DateTimeLike objects or DateTime instances to include
 * @param excludeRange a Range or array of Ranges to include
 * @returns a boolean function to determine DateTime inclusion
 */
export function isExcluded(
  matchFunction: MatchFunction,
  exclusions: (DateObjectUnits | DateTime)[],
  excludeRange?: Range | Range[],
): ExclusionFunction {
  return function (dt: DateObjectUnits) {
    return (exclusions.length ? exclusions.find(exclude => matchFunction(exclude, dt)) !== undefined : false)
      || excludedByRange(excludeRange)(dt);
  }
}


/**
 * Object representing whether a given DateTime instance should be included based on all constraints
 */
export interface ConstraintInfo {
  isInRange: boolean
  isIncluded: boolean
  isExcluded: boolean
  fitsInterval: boolean
  isMatch: boolean
  isDisabled: boolean
}
/**
 * Function that provides ConstraintInfo for a given DateObjectUnits object
 */
export type ConstraintFunction = (toCheck: DateObjectUnits) => ConstraintInfo
export type ConstraintOptionsSlim = Pick<ConstraintOptions, 'start' | 'end' | 'include' | 'includeRange' | 'exclude' | 'excludeRange' | 'interval'>
/**
 * Generates a function that is used to determine if a given DateObject is allowed
 * @param matchFunction the function used to compare two DateTimes
 * @param constraints the constraints on which DateTimes are allowed
 * @returns a function that provides all ConstraintInfo in an object
 */
export function getConstraintFn(
  datetime: DateTimeState,
  matchFunction: MatchFunction,
): ConstraintFunction {
  const { start, end, include = [], includeRange, exclude = [], excludeRange, interval } = datetime.constraints
  const inRange = withinRange({ start, end })
  const included = isIncluded(matchFunction, include, includeRange)
  const excluded = isExcluded(matchFunction, exclude, excludeRange)
  const intervalMatch = getIntervalFn(datetime)

  return function (toCheck) {
    const info = {
      isInRange: inRange(toCheck),
      isIncluded: included(toCheck),
      isExcluded: excluded(toCheck),
      fitsInterval: intervalMatch(toCheck),
      isMatch: matchFunction(datetime.current, toCheck),
      isDisabled: false
    }
    console.log(toCheck, info)
    info.isDisabled = !info.isIncluded || !info.isInRange || info.isExcluded || !info.fitsInterval
    return info
  }
}

type ConstraintClasses = ('active' | 'disabled' | 'nonInterval' | 'hidden')[]
export function getConstraintClasses({ isMatch, isDisabled, fitsInterval }: ConstraintInfo): ConstraintClasses {
  const classes: ConstraintClasses = []
  if (isMatch) classes.push('active')
  if (isDisabled) classes.push('disabled')
  if (!fitsInterval) classes.push('nonInterval')
  return classes
}

export type ClassFunction = (dt: DateObjectUnits, category?: string) => string
export type ClassFnGenerator = (datetime: DateTimeState, constraintFn: ConstraintFunction, classGenerators?: ClassFnGenerator[]) => ClassFunction
export const getClassFn: ClassFnGenerator = (datetime, constraintFn, classGenerators = []): ClassFunction => {
  return function (dt, category) {
    const constraints = constraintFn(dt)
    const list = ['datetimepicker', ...getConstraintClasses(constraints)]
    const extras = classGenerators.map(fn => fn(datetime, constraintFn)(dt))
    if (category) list.push(...category.split(' '))
    return [...list, ...extras].join(' ')
  }
}

export type IntervalFunction = (toCheck: DateObjectUnits) => boolean
export function getIntervalFn(datetime: DateTimeState): IntervalFunction {
  const { constraints: { interval } } = datetime
  return function (toCheck) {
    if (!interval) return true
    const dtToCheck = DateTime.fromObject(toCheck)
    const start = getDateTimeFromObj(interval.start, dtToCheck)
    const end = interval.end ? getDateTimeFromObj(interval.end, dtToCheck) : null
    const duration = Duration.fromObject(interval.step)
    if (dtToCheck.toMillis() < start.toMillis()) return false
    if (end && dtToCheck.toMillis() > end.toMillis()) return false
    return dtToCheck.toMillis() % duration.toMillis() === 0
  }
}
