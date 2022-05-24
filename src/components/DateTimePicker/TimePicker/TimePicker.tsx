import { DateTime } from 'luxon';
import React, { useState } from 'react'
import Hours from './Hours/Hours';
import { UseDatetime } from '@util/DatetimeHelpers';
import Minutes from './Minutes/Minutes';
import "./TimePicker.sass"
import { ConstraintOptions } from '../DateTimePicker';

export interface TimePickerOptions {
  useSeconds?: boolean
  useMillis?: boolean
}

export interface TimePickerProps extends UseDatetime, ConstraintOptions {

}

const TimePicker = ({ datetime = DateTime.now(), setDatetime, onSet, ...constraintOptions }: TimePickerProps) => {
  const [showingHours, setShowingHours] = useState(false);
  const [showingMinutes, setShowingMinutes] = useState(false);

  return (
    <div className='timepicker'>
      <div>
        <span className='clickable' onClick={() => setShowingHours(true)}>{datetime.toFormat('h')}</span>:
        <span className='clickable compact' onClick={() => setShowingMinutes(true)}>{datetime.toFormat('mm')}</span>
        <span className='clickable' onClick={() => setShowingHours(true)}>{datetime.toFormat('a')}</span>
      </div>
      {showingHours &&
        <Hours  {...constraintOptions} datetime={datetime} setDatetime={setDatetime} onSet={() => setShowingHours(false)} onClickOut={() => setShowingHours(false)} />}
      {showingMinutes &&
        <Minutes {...constraintOptions} datetime={datetime} setDatetime={setDatetime} onSet={() => setShowingMinutes(false)} onClickOut={() => setShowingMinutes(false)} />}
    </div>
  )
}

export default TimePicker