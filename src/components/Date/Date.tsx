import { DateTime } from 'luxon';
import React, { useRef, useState } from 'react'
import { Card, Header, Icon, Menu, Ref } from 'semantic-ui-react';
import useClickOut from '../../hooks/useClickOut';
import useKeepOnScreen from '../../hooks/useKeepOnScreen';
import Calendar from '../Calendar/Calendar';
import { UseDatetime, OnClickOut } from '../../util/DatetimeHelpers';
import Months from '../Months/Months';
import Years from '../Years/Years';

interface DateProps extends UseDatetime, OnClickOut {

}

const Date = ({ datetime = DateTime.now(), setDatetime, onSet, onClickOut }: DateProps) => {
  const [showingMonths, setShowingMonths] = useState(false);
  const [showingYears, setShowingYears] = useState(false);

  const prevMonth = () => setDatetime ? setDatetime(datetime.minus({ month: 1 })) : null
  const nextMonth = () => setDatetime ? setDatetime(datetime.plus({ month: 1 })) : null

  const ref = useRef<HTMLElement>(null);
  useClickOut(ref, onClickOut)
  useKeepOnScreen(ref)

  return (
    <Ref innerRef={ref}>
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
            <Calendar datetime={datetime} setDatetime={setDatetime} onSet={onClickOut} />}
          {showingMonths &&
            <Months datetime={datetime} setDatetime={setDatetime} onSet={() => { setShowingMonths(false) }} />}
          {showingYears &&
            <Years datetime={datetime} setDatetime={setDatetime} onSet={() => setShowingYears(false)} />}
        </Card.Content>
      </Card>
    </Ref>
  )
}

export default Date