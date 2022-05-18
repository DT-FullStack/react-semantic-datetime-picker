import { DateObjectUnits, DateTime, Info } from 'luxon';
import React from 'react'
import { Card } from 'semantic-ui-react';
import { UseDatetime } from '../../util/DatetimeHelpers';

interface MonthsProps extends UseDatetime {

}

const Months = ({ datetime = DateTime.now(), setDatetime, onSet }: MonthsProps) => {
  const set = (values: DateObjectUnits) => {
    if (setDatetime) setDatetime(datetime.set(values))
    if (onSet) onSet()
  }
  const months = Info.months('short');

  return (
    <Card.Group className="compact months" itemsPerRow={4}>
      {months.map((month, m) =>
        <Card key={m} className={datetime.month === m + 1 ? 'active' : ''} content={month} onClick={() => set({ month: m + 1 })} />
      )}
    </Card.Group>
  )
}

export default Months