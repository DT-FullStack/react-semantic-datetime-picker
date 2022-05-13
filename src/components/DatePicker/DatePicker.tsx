import React, { useState } from 'react'
import { DateTime } from "luxon";
import "./DatePicker.sass"
import { Card, Header, Icon, Menu } from 'semantic-ui-react';
import _ from 'lodash'
import Calendar from '../Calendar/Calendar';
import Months from '../Months/Months';
import Years from '../Years/Years';
import { UseDatetime } from '../index';

export interface DatePickerProps extends UseDatetime {

}

const DatePicker = ({ datetime = DateTime.now(), setDatetime, onSet }: DatePickerProps) => {

  const [showingPicker, setShowingPicker] = useState(false);
  const showPicker = () => setShowingPicker(true)
  const hidePicker = () => setShowingPicker(false)
  const [showingMonths, setShowingMonths] = useState(false);
  const [showingYears, setShowingYears] = useState(false);

  const prevMonth = () => setDatetime ? setDatetime(datetime.minus({ month: 1 })) : null
  const nextMonth = () => setDatetime ? setDatetime(datetime.plus({ month: 1 })) : null
  return (
    <div className='datepicker container'>
      <div className="clickable" onClick={showPicker}>
        {datetime.toLocaleString()}
      </div>
      {showingPicker &&
        <Card className="picker">

          <Card.Content>
            <Menu secondary>
              <Menu.Item icon onClick={prevMonth} content={<Icon name='arrow left' />} />
              <Header >
                <span className='clickable' onClick={() => setShowingMonths(true)}>{datetime.monthLong}</span>
                <span className='clickable' onClick={() => setShowingYears(true)}>{datetime.year}</span>
              </Header>
              <Menu.Item icon onClick={nextMonth} content={<Icon name='arrow right' />} />
            </Menu>
            {!showingMonths && !showingYears &&
              <Calendar datetime={datetime} setDatetime={setDatetime} onSet={hidePicker} />}
            {showingMonths &&
              <Months datetime={datetime} setDatetime={setDatetime} onSet={() => setShowingMonths(false)} />}
            {showingYears &&
              <Years datetime={datetime} setDatetime={setDatetime} onSet={() => setShowingYears(false)} />}
          </Card.Content>

        </Card>
      }

    </div>
  )
}

export default DatePicker