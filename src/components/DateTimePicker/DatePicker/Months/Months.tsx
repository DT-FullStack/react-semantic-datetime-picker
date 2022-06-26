import { DateObjectUnits, DateTime, Info } from 'luxon';
import React from 'react'
import { Card } from 'semantic-ui-react';
import { isExcluded, isIncluded, match, UseDatetime, withinRange } from '@util/DatetimeHelpers';
import { ConstraintOptions } from '../../DateTimePicker';
import { useDateTime } from 'src/context/datetime';
import useClasses from '@hooks/useClasses';
import useConstraints from '@hooks/useConstraints';
import useGetInfo from '@hooks/useGetInfo';

interface MonthsProps extends UseDatetime, ConstraintOptions {

}

const Months = ({ onSet, include = [], exclude = [], start, end, includeRange, excludeRange }: MonthsProps) => {
  const [datetime, setDatetime] = useDateTime();

  const set = (values: DateObjectUnits) => {
    setDatetime.cursor(values)
    if (onSet) onSet()
  }
  const months = Info.months('short');
  /**
   * Takes array index (starting at zero) and shifts value for Luxon which uses 1-12 for months
   * @param index integer 0-11 (array index)
   * @returns DateLike object using 1-12 for month
   */
  const shift = (index: number): DateObjectUnits => datetime.cursor.set({ month: index + 1 }).toObject()

  const [classes, constraints] = useGetInfo(datetime, match.date)


  const handleClick = (month: number) => {
    if (!constraints({ month: month + 1 }).isDisabled) return () => set({ month: month + 1 })
  }

  return (
    <Card.Group className="compact months" itemsPerRow={4}>
      {months.map((month, m) =>
        <Card key={m} className={classes(shift(m))} content={month} onClick={handleClick(m)} />
      )}
    </Card.Group>
  )
}

export default Months