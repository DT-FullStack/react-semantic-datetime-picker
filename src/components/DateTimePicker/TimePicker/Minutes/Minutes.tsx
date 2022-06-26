import { DateObjectUnits, DateTime, Info } from 'luxon';
import React from 'react'
import { List, Ref } from 'semantic-ui-react';
import useScrollToActive from '@hooks/useScrollToActive';
import { isExcluded, match, OnClickOut, UseDatetime, withinRange } from '@util/DatetimeHelpers';
import PopUp from '@util/PopUp';
import { ConstraintOptions } from '../../DateTimePicker';
import { minutes } from '@util/DatetimeConstants';
import { isIncluded } from '../../../../util/DatetimeHelpers';
import { useDateTime } from 'src/context/datetime';
import useGetInfo from '@hooks/useGetInfo';

interface MinutesProps extends UseDatetime, OnClickOut, ConstraintOptions {

}

const Minutes = ({ onSet, onClickOut, start, end, include = [], exclude = [], includeRange, excludeRange, minuteStep }: MinutesProps) => {
  const [datetime, setDatetime] = useDateTime()


  const set = (values: DateObjectUnits) => {
    setDatetime.current(values)
    if (onSet) onSet()
  }

  const [classes, constraints] = useGetInfo(datetime, match.minute)


  const scrollRef = useScrollToActive(datetime);

  return (
    <PopUp onClickOut={onClickOut}>
      <Ref innerRef={scrollRef}>
        <List className="scrolling picker">
          {minutes(minuteStep).map((minute, m) =>
            <List.Item key={m} className={classes({ minute }, 'minute')} content={datetime.current.set({ minute }).toFormat('h:mm')} onClick={() => set({ minute: m })} />
          )}
        </List>
      </Ref>

    </PopUp>
  )
}

export default Minutes