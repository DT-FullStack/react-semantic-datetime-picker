

import React, { useState } from 'react'
import { DateObjectUnits, DateTime } from 'luxon'
// import './DateTimePicker.sass'
import DatePicker from './DatePicker/DatePicker'
import TimePicker from './TimePicker/TimePicker'
import 'semantic-ui-css/semantic.min.css'
import '../shared.sass'

export interface ConstraintOptions {
  min?: DateTime
  max?: DateTime
  include?: (DateObjectUnits | DateTime)[]
  exclude?: (DateObjectUnits | DateTime)[]
}

export interface DateTimePickerProps extends ConstraintOptions {
  initial?: DateTime
  selectDate?: boolean
  selectTime?: boolean
  name?: string
  align?: 'left' | 'right' | 'center'
  className?: string
}

const DateTimePicker = ({ initial, selectDate = true, selectTime = true, name = 'datetime', align = 'center', className = '', ...constraintProps }: DateTimePickerProps) => {
  const [datetime, setDatetime] = useState(initial || DateTime.now())
  const classes = () => ['datetimepicker', align, ...className.split(' ')].join(' ')
  return (
    <div className={classes()}>
      <input hidden name={name} value={datetime.toMillis()} readOnly />
      <input hidden name={name + '-date-only'} value={datetime.toISODate()} readOnly />
      <input hidden name={name + '-time-only'} value={datetime.toISOTime()} readOnly />
      {selectDate &&
        <DatePicker {...constraintProps} datetime={datetime} setDatetime={setDatetime} />}
      {selectTime &&
        <TimePicker {...constraintProps} datetime={datetime} setDatetime={setDatetime} />}
    </div>
  )
}

export default DateTimePicker