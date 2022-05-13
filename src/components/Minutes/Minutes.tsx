import { DateObjectUnits, DateTime, Info } from 'luxon';
import React from 'react'
import { Card, List } from 'semantic-ui-react';
import { UseDatetime } from '../index';
// import './Minutes.sass'

interface MinutesProps extends UseDatetime {

}

const Minutes = ({ datetime = DateTime.now(), setDatetime, onSet }: MinutesProps) => {
  const set = (values: DateObjectUnits) => {
    if (setDatetime) setDatetime(datetime.set(values))
    if (onSet) onSet()
  }
  const minutes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]

  return (
    // @ts-ignore
    <List className="scrolling">
      {minutes.map((minute, m) =>
        <List.Item key={m} className={datetime.minute === m ? 'active' : ''} content={datetime.set({ minute }).toFormat('mm')} onClick={() => set({ minute: m })} />
      )}
    </List>
  )
}

export default Minutes