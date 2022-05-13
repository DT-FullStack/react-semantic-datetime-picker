import { DateTime } from 'luxon';
import React, { useState } from 'react'
import Hours from '../Hours/Hours';
import { UseDatetime } from '../../index';
import Minutes from '../Minutes/Minutes';

export interface TimePickerOptions {
  useSeconds?: boolean
  useMillis?: boolean
}

export interface TimePickerProps extends UseDatetime {

}

const TimePicker = ({ datetime = DateTime.now(), setDatetime, onSet }: TimePickerProps) => {
  const [showingHours, setShowingHours] = useState(false);
  const [showingMinutes, setShowingMinutes] = useState(false);

  return (
    <div className='timepicker'>
      <span className='clickable' onClick={() => setShowingHours(true)}>{datetime.toFormat('h')}</span>:
      <span className='clickable compact' onClick={() => setShowingMinutes(true)}>{datetime.toFormat('mm')}</span>
      <span className='clickable' onClick={() => setShowingHours(true)}>{datetime.toFormat('a')}</span>
      {showingHours &&
        <Hours datetime={datetime} setDatetime={setDatetime} onSet={() => setShowingHours(false)} />}
      {showingMinutes &&
        <Minutes datetime={datetime} setDatetime={setDatetime} onSet={() => setShowingMinutes(false)} />}
    </div>
  )
}

export default TimePicker