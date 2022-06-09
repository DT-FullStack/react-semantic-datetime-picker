

import React, { useEffect, useState } from 'react'
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
  disabled?: boolean
}

export interface DateTimePickerProps extends ConstraintOptions {
  value?: DateTime | number,
  selectDate?: boolean
  selectTime?: boolean
  inline?: boolean
  name?: string
  align?: 'left' | 'right' | 'center'
  label?: string
  className?: string
  onChange?: (dt: DateTime) => void
}

const DateTimePicker = ({
  value,
  selectDate = true, selectTime = true,
  name = 'datetime',
  align = 'center',
  className = '',
  inline,
  label,
  onChange,
  ...constraintProps

}: DateTimePickerProps) => {
  const getDateTime = (dt: DateTime | number): DateTime => typeof dt === 'number' ? DateTime.fromMillis(dt) : dt;
  const [datetime, setDatetime] = useState(value ? getDateTime(value) : DateTime.now())

  const classes = () => [
    'datetimepicker',
    align,
    inline ? 'inline' : '',
    constraintProps.disabled ? 'disabled' : '',
    ...className.split(' ')
  ].join(' ')

  useEffect(() => {
    if (value) setDatetime(getDateTime(value))
  }, [value])

  useEffect(() => {
    if (onChange) onChange(datetime)
  }, [datetime])

  return (
    <div className={classes()}>
      {label && <label>{label}</label>}
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