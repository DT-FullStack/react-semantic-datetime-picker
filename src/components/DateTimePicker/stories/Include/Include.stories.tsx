import React from 'react'
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DateObjectUnits, DateTime } from "luxon";
import DateTimePicker from '../../DateTimePicker';
import { Card, Header } from 'semantic-ui-react';
import { DateObjectUnitKey } from '../../../../util/DatetimeHelpers';
import { DateTimePickerProps } from '../../DateTimePicker';

const now = DateTime.now()

export default {
  title: 'Date Time Library/Inclusions',
  component: DateTimePicker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof DateTimePicker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DateTimePicker> = (args) => <DateTimePicker {...args} />;

/**
 * 
 * Single DateTime props
 * 
 */
const dateProps = (prop: DateObjectUnitKey): DateTimePickerProps => {
  const include = [{ [prop]: now[prop] + 1 }, { [prop]: now[prop] + 2 }]
  return ({
    label: `include = ${JSON.stringify(include)}`,
    include,
    useTime: false,
  })
}
const dateVariations: DateObjectUnitKey[] = [
  'year',
  'month',
  'day',
  'ordinal',
  'weekNumber',
  'weekday',
]
const dateOptions = dateVariations.map(dateProps)
const timeProps = (prop: DateObjectUnitKey): DateTimePickerProps => {
  const include = [{ [prop]: now[prop] + 1 }, { [prop]: now[prop] + 2 }]
  return ({
    label: `include = ${JSON.stringify(include)}`,
    include,
    useDate: false,
  })
}
const timeVariations: DateObjectUnitKey[] = [
  'hour',
  'minute',
]
const timeOptions = timeVariations.map(timeProps)

/**
 * 
 * Multiple DateTime props
 * 
 */
const multiVariations: DateObjectUnits[] = [
  { year: now.year, month: now.month + 1 },
  { month: now.month, day: now.day + 1 },
  { day: now.day, hour: now.hour + 1 },
  { day: now.day, minute: now.minute + 1 },
  { hour: now.hour, minute: now.minute + 1 }
]
const multiProps = (variation: DateObjectUnits) => ({
  label: `include = ${JSON.stringify(variation)}`,
  include: [variation],
})
const multiOptions = multiVariations.map(multiProps)


const instanceProps = (prop: DateObjectUnits): DateTimePickerProps => {
  const include = [DateTime.now().minus(prop)]
  return ({
    label: `include = ${JSON.stringify(include.map(dt => dt.toLocaleString(DateTime.DATETIME_FULL)))}`,
    include,
  })
}
const instanceVariations: DateObjectUnits[] = [
  { day: 1 }, { month: 1 }, { minute: 45 }
]
const instanceOptions = instanceVariations.map(instanceProps)



export const IncludeByDateComponent = () => <>
  <Header content="Include using single DateTime component " subheader={`Date components: ${[...dateVariations, ...timeVariations].join(', ')} (can also use seconds or milliseconds if using those units)`} />
  <Card.Group>
    {[...dateOptions, ...timeOptions].map((args, i) =>
      <Card key={i}>
        <Card.Content >
          <DateTimePicker {...args} />
        </Card.Content>
      </Card>)
    }
  </Card.Group>
</>
export const IncludeByMultipleDateTimeComponents = () => <>
  <Header content="Include using multiple DateTime components " subheader={`Dates are included if they match every component`} />
  <Card.Group>
    {multiOptions.map((args, i) =>
      <Card key={i}>
        <Card.Content >
          <DateTimePicker {...args} />
        </Card.Content>
      </Card>)
    }
  </Card.Group>
</>



export const IncludeDatetimeInstances = () => <>
  <Header content="Include using Luxon DateTime instances " subheader={`${instanceVariations.map(i => `DateTime.now().minus(${JSON.stringify(i)})`).join(', ')}`} />
  <Card.Group>
    {instanceOptions.map((args, i) =>
      <Card key={i}>
        <Card.Content >
          <DateTimePicker {...args} />
        </Card.Content>
      </Card>)
    }
  </Card.Group>
</>

export const IncludeRanges = () => <>
  <Header content="Include using Ranges " subheader={`Provide any array of Ranges to include`} />
  <Card.Group>
    <Card>
      <Card.Content>
        <DateTimePicker includeRange={[
          { start: DateTime.now(), end: DateTime.now().plus({ week: 1 }) },
          { start: DateTime.now().minus({ week: 1 }), end: DateTime.now().minus({ week: 1 }).plus({ day: 2 }) }
        ]} label="Now till 1 week later, Now minus 1 week till 2 days later" />
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <DateTimePicker includeRange={[
          { start: DateTime.now().startOf('week'), end: DateTime.now().startOf('week').plus({ week: 1 }) },
          { start: DateTime.now().startOf('month'), end: DateTime.now().startOf('month').plus({ week: 1 }) },
        ]} label="Beginning of week till end of week, Beginning of month till a week later" />
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <DateTimePicker includeRange={[
          { start: DateTime.fromObject({ day: 6 }), end: DateTime.fromObject({ day: 12 }) },
        ]} label="6th of this month till the 12th" />
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <DateTimePicker includeRange={[
          { start: DateTime.fromObject({ month: 4 }), end: DateTime.fromObject({ month: 6 }).endOf('month') },
        ]} label="Beginning of April this year till end of June" />
      </Card.Content>
    </Card>
  </Card.Group>

</>

