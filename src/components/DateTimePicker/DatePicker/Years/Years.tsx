import { DateObjectUnits, DateTime, Info } from 'luxon';
import React, { useEffect, useState } from 'react'
import { Card, Header, Icon, Menu } from 'semantic-ui-react';
import { isIncluded, isExcluded, match, UseDatetime, withinRange } from '@util/DatetimeHelpers';
import { ConstraintOptions } from '../../DateTimePicker';

interface YearsProps extends UseDatetime, ConstraintOptions { }

const Years = ({ datetime = DateTime.now(), setDatetime, onSet, start, end, include = [], exclude = [], includeRange, excludeRange }: YearsProps) => {
  const set = (values: DateObjectUnits) => {
    if (setDatetime) setDatetime(datetime.set(values))
    if (onSet) onSet()
  }

  const getYears = (dt: DateTime, past: number = 6, present: number = 6) => {
    let year = dt.year;
    let arr = [];
    for (let y = year - past; y < year + present; y++) { arr.push(y) }
    return arr;
  }
  const [years, setYears] = useState(getYears(datetime));
  const [past, setPast] = useState(6);
  const [future, setFuture] = useState(6);

  useEffect(() => {
    setYears(getYears(datetime, past, future))
  }, [past, future, setYears])

  const isInRange = withinRange({ start, end });
  const included = isIncluded(match.year, include, includeRange)
  const excluded = isExcluded(match.year, exclude, excludeRange)

  const isDisabled = (year: number): boolean => !included({ year }) || !isInRange({ year }) || excluded({ year })
  const isActive = (year: number): boolean => datetime.year === year && !isDisabled(year)

  const classes = (year: number) => [
    'datetimepicker',
    isActive(year) ? 'active' : '',
    isDisabled(year) ? 'disabled' : ''
  ].join(' ')

  return (
    <React.Fragment>
      <Menu secondary>
        <Menu.Item icon onClick={() => setPast(past + 24)} content={<Icon name='angle double left' />} />
        <Menu.Item icon onClick={() => setPast(past + 4)} content={<Icon name='angle left' />} />
        <Header className="half-opacity" >{years[0]} - {years[years.length - 1]}</Header>
        <Menu.Item icon onClick={() => setFuture(future + 4)} content={<Icon name='angle right' />} />
        <Menu.Item icon onClick={() => setFuture(future + 24)} content={<Icon name='angle double right' />} />
      </Menu>
      <Card.Group className="compact years" itemsPerRow={4}>
        {years.map((year) =>
          <Card key={year} className={classes(year)} content={year} onClick={!isDisabled(year) ? () => set({ year }) : undefined} />
        )}
      </Card.Group>
    </React.Fragment>
  )
}

export default Years