import { DateObjectUnits, DateTime } from 'luxon';
import React from 'react'
import { List, Ref } from 'semantic-ui-react';
import useScrollToActive from '@hooks/useScrollToActive';
import { matchTime, OnClickOut, UseDatetime, withinRange } from '@util/DatetimeHelpers';
import PopUp from '@util/PopUp';
import { ConstraintOptions } from '../../DateTimePicker';
import { seconds } from '@util/DatetimeConstants';

interface SecondsProps extends UseDatetime, OnClickOut, ConstraintOptions { }

const Seconds = ({ start, end, include = [], exclude = [], datetime = DateTime.now(), setDatetime, onSet, onClickOut, secondsStep }: SecondsProps) => {
  const set = (values: DateObjectUnits) => {
    if (setDatetime) setDatetime(datetime.set(values))
    if (onSet) onSet()
  }

  const ref = useScrollToActive(datetime);

  const isInRange = withinRange({ start, end });
  const isIncluded = (dt: DateObjectUnits): boolean => include.length ? include.find(toMatch => matchTime(toMatch, dt)) !== undefined : true;
  const isExcluded = (dt: DateObjectUnits): boolean => exclude.length ? exclude.find(toMatch => matchTime(toMatch, dt)) !== undefined : false;

  const isDisabled = (second: number): boolean => !isIncluded({ second }) || !isInRange({ second }) || isExcluded({ second })
  const isActive = (second: number): boolean => datetime.second === second && !isDisabled(second)

  const classes = (second: number) => [
    'datetimepicker',
    isActive(second) ? 'active' : '',
    isDisabled(second) ? 'disabled' : ''
  ].join(' ')

  return (
    <PopUp onClickOut={onClickOut}>
      <Ref innerRef={ref}>
        <List className="scrolling picker">
          {seconds(secondsStep).map((second, h) =>
            <List.Item key={h} className={classes(second)} content={datetime.set({ second }).toFormat('h:mm:ss')} onClick={() => set({ second })} />
          )}
        </List>
      </Ref>
    </PopUp>
  )
}

export default Seconds