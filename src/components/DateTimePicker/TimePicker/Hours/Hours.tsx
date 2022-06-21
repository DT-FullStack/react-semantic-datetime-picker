import { DateObjectUnits, DateTime } from 'luxon';
import React from 'react'
import { List, Ref } from 'semantic-ui-react';
import useScrollToActive from '@hooks/useScrollToActive';
import { isExcluded, isIncluded, match, OnClickOut, UseDatetime, withinRange } from '@util/DatetimeHelpers';
import PopUp from '@util/PopUp';
import { ConstraintOptions } from '../../DateTimePicker';

interface HoursProps extends UseDatetime, OnClickOut, ConstraintOptions { }

const Hours = ({ datetime = DateTime.now(), setDatetime, onSet, onClickOut, start, end, include = [], exclude = [], includeRange, excludeRange }: HoursProps) => {
  const set = (values: DateObjectUnits) => {
    if (setDatetime) setDatetime(datetime.set(values))
    if (onSet) onSet()
  }
  const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  const ref = useScrollToActive(datetime);

  const isInRange = withinRange({ start, end });
  const included = isIncluded(match.time, include, includeRange)
  const excluded = isExcluded(match.time, exclude, excludeRange)

  const isDisabled = (hour: number): boolean => !included({ hour }) || !isInRange({ hour }) || excluded({ hour })
  const isActive = (hour: number): boolean => datetime.hour === hour && !isDisabled(hour)

  const classes = (hour: number) => [
    'datetimepicker',
    isActive(hour) ? 'active' : '',
    isDisabled(hour) ? 'disabled' : ''
  ].join(' ')


  return (
    <PopUp onClickOut={onClickOut}>
      <Ref innerRef={ref}>
        <List className="scrolling picker">
          {hours.map((hour, h) =>
            <List.Item key={h} className={classes(hour)} content={datetime.set({ hour }).toLocaleString({ hour: 'numeric' })} onClick={() => set({ hour })} />
          )}
        </List>
      </Ref>
    </PopUp>
  )
}

export default Hours