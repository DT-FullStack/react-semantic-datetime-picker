<!-- @format -->

# A datepicker for Semantic-UI-React projects.

## Uses Luxon DateTime

- Exclude or include available datetimes by DateTime instances, or objects following Luxon.DateObjectUnits

```javascript
export interface DateObjectUnits {
  // a year, such as 1987
  year?: number | undefined;
  // a month, 1-12
  month?: number | undefined;
  // a day of the month, 1-31, depending on the month
  day?: number | undefined;
  // day of the year, 1-365 or 366
  ordinal?: number | undefined;
  // an ISO week year
  weekYear?: number | undefined;
  // an ISO week number, between 1 and 52 or 53, depending on the year
  weekNumber?: number | undefined;
  // an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
  weekday?: number | undefined;
  // hour of the day, 0-23
  hour?: number | undefined;
  // minute of the hour, 0-59
  minute?: number | undefined;
  // second of the minute, 0-59
  second?: number | undefined;
  // millisecond of the second, 0-999
  millisecond?: number | undefined;
}
```
