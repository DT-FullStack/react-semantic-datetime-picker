import { DateObjectUnits, DateTime, Info } from 'luxon';
import React from 'react'
import { Card } from 'semantic-ui-react';
import { isExcluded, isIncluded, match, UseDatetime, withinRange } from '@util/DatetimeHelpers';
import { ConstraintOptions } from '../../DateTimePicker';

interface MonthsProps extends UseDatetime, ConstraintOptions {

}

const Months = ({ datetime = DateTime.now(), setDatetime, onSet, include = [], exclude = [], start, end, includeRange, excludeRange }: MonthsProps) => {
  const set = (values: DateObjectUnits) => {
    if (setDatetime) setDatetime(datetime.set(values))
    if (onSet) onSet()
  }
  const months = Info.months('short');
  // uses m [0-11]. DateTime uses m = [1-12] so we must add 1 here
  const dt = (month: number): DateObjectUnits => datetime.set({ month: month + 1 }).toObject()

  const isInRange = withinRange({ start, end });
  const included = isIncluded(match.date, include, includeRange);
  const excluded = isExcluded(match.date, exclude, excludeRange);

  const isDisabled = (m: number): boolean => !included(dt(m)) || !isInRange(dt(m)) || excluded(dt(m))
  const isActive = (m: number): boolean => datetime.month === m + 1 && !isDisabled(m)

  const classes = (m: number) => [
    'datetimepicker',
    isActive(m) ? 'active' : '',
    isDisabled(m) ? 'disabled' : ''
  ].join(' ')


  return (
    <Card.Group className="compact months" itemsPerRow={4}>
      {months.map((month, m) =>
        <Card key={m} className={classes(m)} content={month} onClick={!isDisabled(m) ? () => set({ month: m + 1 }) : undefined} />
      )}
    </Card.Group>
  )
}

export default Months