import React, { useState } from 'react'
import { DateTime } from "luxon";
import "./DatePicker.sass"
import { Card, Header, Icon, Menu, Ref } from 'semantic-ui-react';
import _ from 'lodash'
import Calendar from '../Calendar/Calendar';
import Months from '../Months/Months';
import Years from '../Years/Years';
import { OnClickOut, UseDatetime } from '../index';
import useClickOut from '../../hooks/useClickOut';
import Date from '../Date/Date';

export interface DatePickerProps extends UseDatetime {

}

const DatePicker = ({ datetime = DateTime.now(), setDatetime, onSet }: DatePickerProps) => {

  const [showingPicker, setShowingPicker] = useState(false);
  const showPicker = () => setShowingPicker(true)
  const hidePicker = () => setShowingPicker(false)

  return (
    <div className='datepicker container'>
      <div className="clickable" onClick={showPicker}>
        {datetime.toLocaleString()}
      </div>
      {showingPicker &&
        <Date datetime={datetime} setDatetime={setDatetime} onSet={onSet} onClickOut={hidePicker} />
      }

    </div>
  )
}

export default DatePicker