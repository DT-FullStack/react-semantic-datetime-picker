import { DateObjectUnits, DateTime, Info } from 'luxon';
import React from 'react'
import { Card, List } from 'semantic-ui-react';
import { UseDatetime } from '../index';
// import './Hours.sass'

interface HoursProps extends UseDatetime {

}

const Hours = ({ datetime = DateTime.now(), setDatetime, onSet }: HoursProps) => {
  const set = (values: DateObjectUnits) => {
    if (setDatetime) setDatetime(datetime.set(values))
    if (onSet) onSet()
  }
  const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  return (
    // @ts-ignore
    <List className="scrolling picker">
      {hours.map((hour, h) =>
        <List.Item key={h} className={datetime.hour === h ? 'active' : ''} content={datetime.set({ hour }).toLocaleString({ hour: 'numeric' })} onClick={() => set({ hour: h })} />
      )}
    </List>
  )
}

export default Hours