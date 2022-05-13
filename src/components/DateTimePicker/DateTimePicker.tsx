

import React, { useState } from 'react'
import { DateTime } from 'luxon'
import './DateTimePicker.sass'
import DatePicker from '../DatePicker/DatePicker'
import TimePicker from '../TimePicker/TimePicker'

export interface DateTimePickerProps {
  initial?: DateTime
  selectDate?: boolean
  selectTime?: boolean
}

const DateTimePicker = ({ initial, selectDate = true, selectTime = true }: DateTimePickerProps) => {
  const [datetime, setDatetime] = useState(initial || DateTime.now())
  return (
    <div className='datetimepicker'>
      {selectDate &&
        <DatePicker datetime={datetime} setDatetime={setDatetime} />}
      {selectTime &&
        <TimePicker datetime={datetime} setDatetime={setDatetime} />}
    </div>
  )
}

export default DateTimePicker