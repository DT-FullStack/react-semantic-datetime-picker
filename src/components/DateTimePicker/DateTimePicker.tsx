

import React, { useEffect, useState } from 'react'
import { DateTimeProvider, useDateTime } from '../../context/datetime';
import { DateObjectUnits, DateTime, DurationLikeObject, DurationUnits } from 'luxon'
import DatePicker from './DatePicker/DatePicker'
import TimePicker from './TimePicker/TimePicker'
import 'semantic-ui-css/semantic.min.css'
import '../shared.sass'

export interface Range {
  start?: DateTime | DateObjectUnits,
  end?: DateTime | DateObjectUnits
}
export interface AppInterval {
  step: DurationLikeObject,
  start: DateTime | DateObjectUnits,
  end?: DateTime | DateObjectUnits
}

export interface ConstraintOptions {
  start?: DateTime
  end?: DateTime
  include?: (DateObjectUnits | DateTime)[]
  exclude?: (DateObjectUnits | DateTime)[]
  includeRange?: Range | Range[]
  excludeRange?: Range | Range[]
  disabled?: boolean
  interval?: AppInterval
  useSeconds?: boolean
  useMillis?: boolean
  secondsStep?: number
  millisStep?: number
  minuteStep?: number
  useDate?: boolean
  useTime?: boolean
}

export interface DateTimePickerProps extends ConstraintOptions {
  value?: DateTime | number,
  inline?: boolean
  name?: string
  align?: 'left' | 'right' | 'center'
  label?: string
  className?: string
  onChange?: (dt: DateTime) => void
}

const DateTimePicker = ({
  value,
  useDate = true, useTime = true,
  name = 'datetime',
  align = 'center',
  className = '',
  inline,
  label,
  onChange,
  ...constraintProps

}: DateTimePickerProps) => {


  let initial = undefined
  if (value) initial = value
  else if (constraintProps.include) {
    const firstAvailable = constraintProps.include[0]
    initial = firstAvailable instanceof DateTime ? firstAvailable : DateTime.now().set(firstAvailable)
  }

  const [datetime, setDatetime] = useDateTime()

  const classes = () => [
    'datetimepicker',
    align,
    inline ? 'inline' : '',
    constraintProps.disabled ? 'disabled' : '',
    ...className.split(' ')
  ].join(' ')

  useEffect(() => {
    if (onChange) onChange(datetime.current)
  }, [datetime.current])

  return (
    <DateTimeProvider value={value} constraints={constraintProps}>
      <div className={classes()}>
        {label && <label>{label}</label>}
        <input hidden name={name + '-timestamp'} value={datetime.current.toMillis()} readOnly />
        <input hidden name={name + '-date-only'} value={datetime.current.toISODate()} readOnly />
        <input hidden name={name + '-time-only'} value={datetime.current.toISOTime()} readOnly />
        {useDate &&
          <DatePicker />}
        {useTime &&
          <TimePicker />}
      </div>
    </DateTimeProvider>
  )
}

export default DateTimePicker