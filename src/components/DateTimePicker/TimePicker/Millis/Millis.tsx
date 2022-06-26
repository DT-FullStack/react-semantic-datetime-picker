import { DateObjectUnits, DateTime } from 'luxon';
import React from 'react'
import { List, Ref } from 'semantic-ui-react';
import useScrollToActive from '@hooks/useScrollToActive';
import { match, OnClickOut, UseDatetime, getClassFn } from '@util/DatetimeHelpers';
import PopUp from '@util/PopUp';
import { ConstraintOptions } from '../../DateTimePicker';
import { millis } from '@util/DatetimeConstants';
import { useDateTime } from 'src/context/datetime';
import useConstraints from '@hooks/useConstraints';
import useClasses from '@hooks/useClasses';
import useGetInfo from '@hooks/useGetInfo';

interface MillisProps extends UseDatetime, OnClickOut, ConstraintOptions { }

const Millis = ({ onSet, onClickOut, millisStep }: MillisProps) => {
  const [datetime, setDatetime] = useDateTime()

  const set = (values: DateObjectUnits) => {
    if (setDatetime) setDatetime.current(values)
    if (onSet) onSet()
  }


  const ref = useScrollToActive(datetime);

  const [classes, constraints] = useGetInfo(datetime, match.millisecond)

  const handleClick = (millisecond: number) => {
    if (!constraints({ millisecond }).isDisabled) return () => set({ millisecond })
  }

  return (
    <PopUp onClickOut={onClickOut}>
      <Ref innerRef={ref}>
        <List className="scrolling picker">
          <List.Header content="hh:mm:ss.SSS" />
          {millis(millisStep).map((millisecond, m) =>
            <List.Item key={m} className={classes({ millisecond })} content={datetime.current.set({ millisecond }).toFormat('hh:mm:ss.SSS')} onClick={() => handleClick(millisecond)} />
          )}
        </List>
      </Ref>
    </PopUp>
  )
}

export default Millis