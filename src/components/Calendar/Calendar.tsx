import { DateObjectUnits, DateTime } from 'luxon'
import React from 'react'
import { Table } from 'semantic-ui-react'
import { calDaysChunks, sundayFirstWeekdays, UseDatetime } from '../index';

interface CalendarProps extends UseDatetime {

}

const Calendar = ({ datetime = DateTime.now(), setDatetime, onSet }: CalendarProps) => {
  const set = (values: DateObjectUnits) => {
    if (setDatetime) setDatetime(datetime.set(values))
    if (onSet) onSet()
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          {sundayFirstWeekdays('short').map(d => <Table.HeaderCell key={d} content={d} />)}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {calDaysChunks(datetime).map((week, w) =>
          <Table.Row key={w}>
            {week.map((dt, d) =>
              <Table.Cell active={datetime.day === dt.day && datetime.month === dt.month} className={datetime.month !== dt.month ? 'otherMonth' : ''} onClick={() => set(dt)} key={d} content={dt.day} />
            )}
          </Table.Row>)
        }

      </Table.Body>
    </Table>
  )
}

export default Calendar