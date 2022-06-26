import { DateObjectUnits, DateTime } from 'luxon';
import React from 'react'
import { List, Ref } from 'semantic-ui-react';
import useScrollToActive from '@hooks/useScrollToActive';
import { ClassFunction, getClassFn, match, OnClickOut, UseDatetime, withinRange } from '@util/DatetimeHelpers';
import PopUp from '@util/PopUp';
import { ConstraintOptions } from '../../DateTimePicker';
import { seconds } from '@util/DatetimeConstants';
import { useDateTime } from 'src/context/datetime';
import useGetInfo from '@hooks/useGetInfo';

interface SecondsProps extends UseDatetime, OnClickOut, ConstraintOptions { }

const Seconds = ({ onSet, onClickOut, secondsStep }: SecondsProps) => {
  const [datetime, setDatetime] = useDateTime()
  const set = (values: DateObjectUnits) => {
    setDatetime.current(values)
    if (onSet) onSet()
  }

  const ref = useScrollToActive(datetime.current);

  // const getClasses = getClassFn(match.second, datetime)
  const [classes, constraints] = useGetInfo(datetime, match.second)

  return (
    <PopUp onClickOut={onClickOut}>
      <Ref innerRef={ref}>
        <List className="scrolling picker">
          {seconds(secondsStep).map((second, h) =>
            <List.Item key={h} className={classes({ second })} content={datetime.current.set({ second }).toFormat('h:mm:ss')} onClick={() => set({ second })} />
          )}
        </List>
      </Ref>
    </PopUp>
  )
}

export default Seconds