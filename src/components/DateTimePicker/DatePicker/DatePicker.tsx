import React, { useState } from 'react'
import { DateTime } from "luxon";
import "./DatePicker.sass"
import { Card, Header, Icon, Menu, Ref } from 'semantic-ui-react';
import _ from 'lodash'
import Calendar from './Calendar/Calendar';
import Months from './Months/Months';
import Years from './Years/Years';
import { OnClickOut, UseDatetime } from '@util/DatetimeHelpers';
import useClickOut from '@hooks/useClickOut';
import Date from './Date/Date';
import { ConstraintOptions } from '../DateTimePicker';
import { useDateTime } from '../../../context/datetime';

export interface DatePickerProps { }

const DatePicker = ({ }: DatePickerProps) => {
  const [datetime] = useDateTime()

  const [showingPicker, setShowingPicker] = useState(false);
  const showPicker = () => setShowingPicker(true)
  const hidePicker = () => setShowingPicker(false)

  return (
    <div className='datepicker container'>
      <div>
        {datetime.constraints.disabled
          ? <span >
            {datetime.current.toLocaleString()}
          </span>
          : <span className="clickable" onClick={showPicker}>
            {datetime.current.toLocaleString()}
          </span>}

      </div>
      {showingPicker &&
        <Date onClickOut={hidePicker} />
      }
    </div>
  )
}

export default DatePicker