import { DateObjectUnits, DateTime, Info } from 'luxon';
import React, { useEffect, useRef } from 'react'
import { Card, List, Ref } from 'semantic-ui-react';
import useClickOut from '@hooks/useClickOut';
import useKeepOnScreen from '@hooks/useKeepOnScreen';
import useScrollToActive from '@hooks/useScrollToActive';
import { OnClickOut, UseDatetime } from '@util/DatetimeHelpers';
// import './Hours.sass'

interface HoursProps extends UseDatetime, OnClickOut {

}

const Hours = ({ datetime = DateTime.now(), setDatetime, onSet, onClickOut }: HoursProps) => {
  const set = (values: DateObjectUnits) => {
    if (setDatetime) setDatetime(datetime.set(values))
    if (onSet) onSet()
  }
  const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  const ref = useScrollToActive(datetime);
  useClickOut(ref, onClickOut)
  useKeepOnScreen(ref);

  return (
    <Ref innerRef={ref}>
      <List className="scrolling picker">
        {hours.map((hour, h) =>
          <List.Item key={h} className={datetime.hour === h ? 'active' : ''} content={datetime.set({ hour }).toLocaleString({ hour: 'numeric' })} onClick={() => set({ hour: h })} />
        )}
      </List>
    </Ref>
  )
}

export default Hours