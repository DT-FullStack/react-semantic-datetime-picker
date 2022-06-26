import { DateObjectUnits, DateTime } from 'luxon';
import React from 'react'
import { List, Ref } from 'semantic-ui-react';
import useScrollToActive from '@hooks/useScrollToActive';
import { isExcluded, isIncluded, match, OnClickOut, UseDatetime, withinRange } from '@util/DatetimeHelpers';
import PopUp from '@util/PopUp';
import { ConstraintOptions } from '../../DateTimePicker';
import { useDateTime } from 'src/context/datetime';
import useConstraints from '@hooks/useConstraints';
import useClasses from '@hooks/useClasses';
import useGetInfo from '@hooks/useGetInfo';

interface HoursProps extends UseDatetime, OnClickOut, ConstraintOptions { }

const Hours = ({ onSet, onClickOut, start, end, include = [], exclude = [], includeRange, excludeRange }: HoursProps) => {
  const [datetime, setDatetime] = useDateTime()


  const set = (values: DateObjectUnits) => {
    setDatetime.current(values)
    if (onSet) onSet()
  }
  const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  const ref = useScrollToActive(datetime);

  const [classes, constraints] = useGetInfo(datetime, match.hour)

  const handleClick = (hour: number) => {
    if (!constraints({ hour }).isDisabled) return () => set({ hour })
  }

  return (
    <PopUp onClickOut={onClickOut}>
      <Ref innerRef={ref}>
        <List className="scrolling picker">
          {hours.map((hour, h) =>
            <List.Item key={h} className={classes({ hour })} content={datetime.current.set({ hour }).toLocaleString({ hour: 'numeric' })} onClick={handleClick(hour)} />
          )}
        </List>
      </Ref>
    </PopUp>
  )
}

export default Hours