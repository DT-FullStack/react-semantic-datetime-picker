import { DateObjectUnits, DateTime } from 'luxon'
import React from 'react'
import { Table } from 'semantic-ui-react'
import { calDaysChunks, ClassFnGenerator, ClassFunction, match, sundayFirstWeekdays, UseDatetime } from '@util/DatetimeHelpers';
import { ConstraintOptions } from '../../DateTimePicker';
import { useDateTime } from 'src/context/datetime';
import useClasses from '@hooks/useClasses';
import useConstraints from '@hooks/useConstraints';
import useGetInfo from '@hooks/useGetInfo';

interface CalendarProps extends UseDatetime, ConstraintOptions {

}

const Calendar = ({ onSet }: CalendarProps) => {
  const [datetime, setDatetime] = useDateTime();

  const set = (values: DateObjectUnits) => {
    if (setDatetime) setDatetime.current(values)
    if (onSet) onSet()
  }

  const monthClass: ClassFnGenerator = (state) => {
    return function (dt) {
      return !match.month(state.cursor, dt) ? 'otherMonth' : undefined
    }
  }
  const todayClass: ClassFnGenerator = (state) => {
    return function (dt) {
      return DateTime.now().startOf('day').toMillis() === DateTime.fromObject(dt).startOf('day').toMillis() ? 'today' : undefined
    }
  }
  const [classes] = useGetInfo(datetime, match.date, [monthClass, todayClass])

  const handleDateClick = (dt: DateObjectUnits) => {
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
        {calDaysChunks(datetime.cursor).map((week, w) =>
          <Table.Row key={w}>
            {week.map((dt, d) =>
              <Table.Cell className={classes(dt)} onClick={() => handleDateClick(dt)} key={d} content={<div className='sizer'>{dt.day}</div>} />
            )}
          </Table.Row>)
        }

      </Table.Body>
    </Table>
  )
}

export default Calendar