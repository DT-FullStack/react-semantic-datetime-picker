import { DateObjectUnits, DateTime } from 'luxon'
import React from 'react'
import { Table } from 'semantic-ui-react'
import { calDaysChunks, getConstraintClasses, getConstraintInfo, isExcluded, isIncluded, match, sundayFirstWeekdays, UseDatetime, withinAnyRange, withinRange } from '@util/DatetimeHelpers';
import { ConstraintOptions } from '../../DateTimePicker';

interface CalendarProps extends UseDatetime, ConstraintOptions {

}

const Calendar = ({ datetime = DateTime.now(), setDatetime, onSet, ...constraintOptions }: CalendarProps) => {
  const set = (values: DateObjectUnits) => {
    if (setDatetime) setDatetime(datetime.set(values))
    if (onSet) onSet()
  }

  const getConstaints = getConstraintInfo(match.date, constraintOptions)


  const classes = (dt: DateObjectUnits) => {
    const constraints = getConstaints(dt, datetime)
    const list = ['datetimepicker', ...getConstraintClasses(constraints)]
    if (!match.month(datetime, dt)) list.push('otherMonth')
    return list.join(' ')
  }

  const handleClick = (dt: DateObjectUnits) => {
    const { month, day, year } = dt
    set({ month, day, year })
  }

  return (
    <Table celled className='unstackable'>
      <Table.Header>
        <Table.Row>
          {sundayFirstWeekdays('short').map(d => <Table.HeaderCell key={d} content={<div className='sizer'>{d}</div>} />)}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {calDaysChunks(datetime).map((week, w) =>
          <Table.Row key={w}>
            {week.map((dt, d) =>
              <Table.Cell active={datetime.day === dt.day && datetime.month === dt.month} className={classes(dt)} onClick={() => handleClick(dt)} key={d} content={<div className='sizer'>{dt.day}</div>} />
            )}
          </Table.Row>)
        }

      </Table.Body>
    </Table>
  )
}

export default Calendar