import { DateObjectUnits, DateTime } from 'luxon'
import React from 'react'
import { Table } from 'semantic-ui-react'
import { calDaysChunks, match, sundayFirstWeekdays, UseDatetime, withinRange } from '@util/DatetimeHelpers';
import { ConstraintOptions } from '../../DateTimePicker';

interface CalendarProps extends UseDatetime, ConstraintOptions {

}

const Calendar = ({ datetime = DateTime.now(), setDatetime, onSet, min, max, include = [], exclude = [] }: CalendarProps) => {
  const set = (values: DateObjectUnits) => {
    if (setDatetime) setDatetime(datetime.set(values))
    if (onSet) onSet()
  }

  // const hasInclude
  const matchDayMonthYear = match(['day', 'month', 'year', 'weekday']);
  const isInRange = withinRange({ min, max });

  const isIncluded = (dt: DateObjectUnits): boolean => include.length ? include.find(day => matchDayMonthYear(day, dt)) !== undefined : true;
  const isExcluded = (dt: DateObjectUnits): boolean => exclude.length ? exclude.find(day => matchDayMonthYear(day, dt)) !== undefined : true;

  const classes = (dt: DateObjectUnits) => [
    'datetimepicker',
    datetime.month !== dt.month ? 'otherMonth' : '',
    (!isIncluded(dt) || !isInRange(dt) || isExcluded(dt)) ? 'disabled' : ''
  ].join(' ')

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
              <Table.Cell active={datetime.day === dt.day && datetime.month === dt.month} className={classes(dt)} onClick={() => set(dt)} key={d} content={<div className='sizer'>{dt.day}</div>} />
            )}
          </Table.Row>)
        }

      </Table.Body>
    </Table>
  )
}

export default Calendar