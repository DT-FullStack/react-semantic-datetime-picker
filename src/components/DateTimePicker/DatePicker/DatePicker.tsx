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

export interface DatePickerProps extends UseDatetime, ConstraintOptions {

}

const DatePicker = ({ disabled, datetime = DateTime.now(), setDatetime, onSet, ...constraintOptions }: DatePickerProps) => {

  const [showingPicker, setShowingPicker] = useState(false);
  const showPicker = () => setShowingPicker(true)
  const hidePicker = () => setShowingPicker(false)

  return (
    <div className='datepicker container'>
      <div>
        {disabled
          ? <span >
            {datetime.toLocaleString()}
          </span>
          : <span className="clickable" onClick={showPicker}>
            {datetime.toLocaleString()}
          </span>}

      </div>
      {showingPicker &&
        <Date {...constraintOptions} datetime={datetime} setDatetime={setDatetime} onClickOut={hidePicker} />
      }
    </div>
  )
}

export default DatePicker