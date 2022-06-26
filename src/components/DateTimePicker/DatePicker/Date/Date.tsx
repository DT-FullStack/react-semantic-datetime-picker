import { DateTime } from 'luxon';
import React, { useRef, useState } from 'react'
import { Card, Header, Icon, Menu, Ref } from 'semantic-ui-react';
import useClickOut from '@hooks/useClickOut';
import useKeepOnScreen from '@hooks/useKeepOnScreen';
import Calendar from '../Calendar/Calendar';
import { UseDatetime, OnClickOut, match } from '@util/DatetimeHelpers';
import Months from '../Months/Months';
import Years from '../Years/Years';
import PopUp from '@util/PopUp';
import { ConstraintOptions } from '../../DateTimePicker';
import { useDateTime } from '../../../../context/datetime';
import useGetInfo from '@hooks/useGetInfo';

interface DateProps extends UseDatetime, OnClickOut, ConstraintOptions {

}

const Date = ({ onClickOut, ...constraintOptions }: DateProps) => {
  const [showingMonths, setShowingMonths] = useState(false);
  const [showingYears, setShowingYears] = useState(false);

  const [datetime, setDatetime] = useDateTime();

  const prevMonth = () => setDatetime.cursor(datetime.cursor.minus({ month: 1 }))
  const nextMonth = () => setDatetime.cursor(datetime.cursor.plus({ month: 1 }))
  const jumpToToday = () => setDatetime.cursor(DateTime.now())

  return (
    <PopUp onClickOut={onClickOut}>
      <Card className="picker">
        <Card.Content>
          <Menu secondary>
            <Menu.Item icon title="Last Month" onClick={prevMonth} content={<Icon name='arrow left' />} />
            <Header >
              <span className='clickable' title="Change Month" onClick={() => setShowingMonths(true)}>{datetime.cursor.monthLong}</span>
              <span className='clickable' title="Change Year" onClick={() => setShowingYears(true)}>{datetime.cursor.year}</span>
            </Header>
            <Menu.Item icon title="Today" className='today' onClick={jumpToToday} content={<Icon name="calendar outline" />} />
            <Menu.Item icon title="Next Month" onClick={nextMonth} content={<Icon name='arrow right' />} />
          </Menu>
          {!showingMonths && !showingYears &&
            <Calendar onSet={onClickOut} />}
          {showingMonths &&
            <Months onSet={() => { setShowingMonths(false) }} />}
          {showingYears &&
            <Years onSet={() => setShowingYears(false)} />}
        </Card.Content>
      </Card>
    </PopUp>
  )
}

export default Date