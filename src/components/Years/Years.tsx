import { DateObjectUnits, DateTime, Info } from 'luxon';
import React, { useEffect, useState } from 'react'
import { Card, Header, Icon, Menu } from 'semantic-ui-react';
import { UseDatetime } from '../index';

interface YearsProps extends UseDatetime {

}

const Years = ({ datetime = DateTime.now(), setDatetime, onSet }: YearsProps) => {
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

  return (
    <React.Fragment>
      <Menu secondary>
        <Menu.Item icon onClick={() => setPast(past + 24)} content={<Icon name='angle double left' />} />
        <Menu.Item icon onClick={() => setPast(past + 4)} content={<Icon name='angle left' />} />
        {/* @ts-ignore */}
        <Header>{datetime.year}</Header>
        <Menu.Item icon onClick={() => setFuture(future + 4)} content={<Icon name='angle right' />} />
        <Menu.Item icon onClick={() => setFuture(future + 24)} content={<Icon name='angle double right' />} />
      </Menu>
      <Card.Group className="compact years" itemsPerRow={4}>
        {years.map((year) =>
          <Card key={year} className={datetime.year === year ? 'active' : ''} content={year} onClick={() => set({ year })} />
        )}
      </Card.Group>
    </React.Fragment>
  )
}

export default Years