import { DateTime } from 'luxon';
import React, { useState } from 'react'
import Hours from './Hours/Hours';
import { UseDatetime } from '@util/DatetimeHelpers';
import Minutes from './Minutes/Minutes';
import "./TimePicker.sass"
import { ConstraintOptions } from '../DateTimePicker';
import Seconds from './Seconds/Seconds';
import Millis from './Millis/Millis';
import { useDateTime } from 'src/context/datetime';


export interface TimePickerProps { }

const TimePicker = ({ }: TimePickerProps) => {
  const [showingHours, setShowingHours] = useState(false);
  const [showingMinutes, setShowingMinutes] = useState(false);
  const [showingSeconds, setShowingSeconds] = useState(false);
  const [showingMillis, setShowingMillis] = useState(false);

  const [datetime, setDatetime] = useDateTime()
  const { constraints: { disabled, useSeconds, useMillis } } = datetime;

  return (
    <div className='timepicker'>
      {disabled
        ? <div>
          <span >{datetime.current.toFormat('h')}</span>:
          <span >{datetime.current.toFormat('mm')}</span>
          {(useSeconds || useMillis) && <span >{datetime.current.toFormat('ss')}</span>}
          {useMillis && <span >{datetime.current.toFormat('SSS')}</span>}
          <span style={{ marginLeft: '0.5rem' }}>{datetime.current.toFormat('a')}</span>
        </div>
        : <div>
          <span className='clickable' onClick={() => setShowingHours(true)}>{datetime.current.toFormat('h')}</span>:
          <span className='clickable compact' onClick={() => setShowingMinutes(true)}>{datetime.current.toFormat('mm')}</span>
          {(useSeconds || useMillis) && <span className='clickable compact' onClick={() => setShowingSeconds(true)}>:{datetime.current.toFormat('ss')}</span>}
          {useMillis && <span className='clickable compact' onClick={() => setShowingMillis(true)}>.{datetime.current.toFormat('SSS')}</span>}
          <span className='clickable' onClick={() => setShowingHours(true)}>{datetime.current.toFormat('a')}</span>
        </div>}

      {showingHours &&
        <Hours onSet={() => setShowingHours(false)} onClickOut={() => setShowingHours(false)} />}
      {showingMinutes &&
        <Minutes onSet={() => setShowingMinutes(false)} onClickOut={() => setShowingMinutes(false)} />}
      {showingSeconds &&
        <Seconds onSet={() => setShowingSeconds(false)} onClickOut={() => setShowingSeconds(false)} />}
      {showingMillis &&
        <Millis onSet={() => setShowingMillis(false)} onClickOut={() => setShowingMillis(false)} />}
    </div>
  )
}

export default TimePicker