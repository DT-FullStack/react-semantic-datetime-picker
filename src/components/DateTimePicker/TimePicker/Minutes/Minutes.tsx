import { DateObjectUnits, DateTime, Info } from 'luxon';
import React from 'react'
import { List, Ref } from 'semantic-ui-react';
import useScrollToActive from '@hooks/useScrollToActive';
import { isExcluded, match, OnClickOut, UseDatetime, withinRange } from '@util/DatetimeHelpers';
import PopUp from '@util/PopUp';
import { ConstraintOptions } from '../../DateTimePicker';
import { minutes } from '@util/DatetimeConstants';
import { isIncluded } from '../../../../util/DatetimeHelpers';

interface MinutesProps extends UseDatetime, OnClickOut, ConstraintOptions {

}

const Minutes = ({ datetime = DateTime.now(), setDatetime, onSet, onClickOut, start, end, include = [], exclude = [], includeRange, excludeRange, minuteStep }: MinutesProps) => {
  const set = (values: DateObjectUnits) => {
    if (setDatetime) setDatetime(datetime.set(values))
    if (onSet) onSet()
  }

  const isInRange = withinRange({ start, end });
  const included = isIncluded(match.time, include, includeRange)
  const excluded = isExcluded(match.time, exclude, excludeRange)

  const isDisabled = (minute: number): boolean => !included({ minute }) || !isInRange({ minute }) || excluded({ minute })
  const isActive = (minute: number): boolean => datetime.minute === minute && !isDisabled(minute)

  const classes = (minute: number) => [
    'datetimepicker',
    isActive(minute) ? 'active' : '',
    isDisabled(minute) ? 'disabled' : ''
  ].join(' ')


  const scrollRef = useScrollToActive(datetime);

  return (
    <PopUp onClickOut={onClickOut}>
      <Ref innerRef={scrollRef}>
        <List className="scrolling picker">
          {minutes(minuteStep).map((minute, m) =>
            <List.Item key={m} className={classes(minute)} content={datetime.set({ minute }).toFormat('h:mm')} onClick={() => set({ minute: m })} />
          )}
        </List>
      </Ref>

    </PopUp>
  )
}

export default Minutes