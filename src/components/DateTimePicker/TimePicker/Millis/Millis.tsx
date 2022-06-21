import { DateObjectUnits, DateTime } from 'luxon';
import React from 'react'
import { List, Ref } from 'semantic-ui-react';
import useScrollToActive from '@hooks/useScrollToActive';
import { matchTime, OnClickOut, UseDatetime, withinRange } from '@util/DatetimeHelpers';
import PopUp from '@util/PopUp';
import { ConstraintOptions } from '../../DateTimePicker';
import { millis } from '@util/DatetimeConstants';

interface MillisProps extends UseDatetime, OnClickOut, ConstraintOptions { }

const Millis = ({ min, max, include = [], exclude = [], datetime = DateTime.now(), setDatetime, onSet, onClickOut, millisStep }: MillisProps) => {
  const set = (values: DateObjectUnits) => {
    if (setDatetime) setDatetime(datetime.set(values))
    if (onSet) onSet()
  }


  const ref = useScrollToActive(datetime);

  const isInRange = withinRange({ min, max });
  const isIncluded = (dt: DateObjectUnits): boolean => include.length ? include.find(toMatch => matchTime(toMatch, dt)) !== undefined : true;
  const isExcluded = (dt: DateObjectUnits): boolean => exclude.length ? exclude.find(toMatch => matchTime(toMatch, dt)) !== undefined : false;

  const isDisabled = (millisecond: number): boolean => !isIncluded({ millisecond }) || !isInRange({ millisecond }) || isExcluded({ millisecond })
  const isActive = (millisecond: number): boolean => datetime.millisecond === millisecond && !isDisabled(millisecond)

  const classes = (millisecond: number) => [
    'datetimepicker',
    isActive(millisecond) ? 'active' : '',
    isDisabled(millisecond) ? 'disabled' : ''
  ].join(' ')


  return (
    <PopUp onClickOut={onClickOut}>
      <Ref innerRef={ref}>
        <List className="scrolling picker">
          <List.Header content="hh:mm:ss.SSS" />
          {millis(millisStep).filter(millisecond => !isDisabled(millisecond)).map((millisecond, h) =>
            <List.Item key={h} className={classes(millisecond)} content={datetime.set({ millisecond }).toFormat('hh:mm:ss.SSS')} onClick={() => set({ millisecond })} />
          )}
        </List>
      </Ref>
    </PopUp>
  )
}

export default Millis