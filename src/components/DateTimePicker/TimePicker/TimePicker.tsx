import { DateTime } from 'luxon';
import React, { useState } from 'react'
import Hours from './Hours/Hours';
import { UseDatetime } from '@util/DatetimeHelpers';
import Minutes from './Minutes/Minutes';
import "./TimePicker.sass"
import { ConstraintOptions } from '../DateTimePicker';
import Seconds from './Seconds/Seconds';
import Millis from './Millis/Millis';


export interface TimePickerProps extends UseDatetime, ConstraintOptions { }

const TimePicker = ({ disabled, datetime = DateTime.now(), setDatetime, onSet, useSeconds, useMillis, ...constraintOptions }: TimePickerProps) => {
  const [showingHours, setShowingHours] = useState(false);
  const [showingMinutes, setShowingMinutes] = useState(false);
  const [showingSeconds, setShowingSeconds] = useState(false);
  const [showingMillis, setShowingMillis] = useState(false);


  return (
    <div className='timepicker'>
      {disabled
        ? <div>
          <span >{datetime.toFormat('h')}</span>:
          <span >{datetime.toFormat('mm')}</span>
          {(useSeconds || useMillis) && <span >{datetime.toFormat('ss')}</span>}
          {useMillis && <span >{datetime.toFormat('SSS')}</span>}
          <span style={{ marginLeft: '0.5rem' }}>{datetime.toFormat('a')}</span>
        </div>
        : <div>
          <span className='clickable' onClick={() => setShowingHours(true)}>{datetime.toFormat('h')}</span>:
          <span className='clickable compact' onClick={() => setShowingMinutes(true)}>{datetime.toFormat('mm')}</span>
          {(useSeconds || useMillis) && <span className='clickable compact' onClick={() => setShowingSeconds(true)}>:{datetime.toFormat('ss')}</span>}
          {useMillis && <span className='clickable compact' onClick={() => setShowingMillis(true)}>.{datetime.toFormat('SSS')}</span>}
          <span className='clickable' onClick={() => setShowingHours(true)}>{datetime.toFormat('a')}</span>
        </div>}

      {showingHours &&
        <Hours  {...constraintOptions} datetime={datetime} setDatetime={setDatetime} onSet={() => setShowingHours(false)} onClickOut={() => setShowingHours(false)} />}
      {showingMinutes &&
        <Minutes {...constraintOptions} datetime={datetime} setDatetime={setDatetime} onSet={() => setShowingMinutes(false)} onClickOut={() => setShowingMinutes(false)} />}
      {showingSeconds &&
        <Seconds {...constraintOptions} datetime={datetime} setDatetime={setDatetime} onSet={() => setShowingSeconds(false)} onClickOut={() => setShowingSeconds(false)} />}
      {showingMillis &&
        <Millis {...constraintOptions} datetime={datetime} setDatetime={setDatetime} onSet={() => setShowingMillis(false)} onClickOut={() => setShowingMillis(false)} />}
    </div>
  )
}

export default TimePicker