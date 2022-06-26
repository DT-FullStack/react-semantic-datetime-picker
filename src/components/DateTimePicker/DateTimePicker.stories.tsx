import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DateTimePicker from './DateTimePicker';
import { Card, CardContent, CardGroup, Form, FormField, FormGroup, Input } from 'semantic-ui-react';
import { DateTime } from 'luxon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Date Time Library/DateTimePicker',
  component: DateTimePicker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DateTimePicker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DateTimePicker> = (args) => <DateTimePicker {...args} />;

export const Alignment: ComponentStory<typeof DateTimePicker> = () =>
  <CardGroup className='three'  >
    <Card content={<CardContent content={<DateTimePicker label="Left Align" align='left' />} />} />
    <Card content={<CardContent content={<DateTimePicker label="Center Align" align='center' />} />} />
    <Card content={<CardContent content={<DateTimePicker label="Right Align" align='right' />} />} />
  </CardGroup>

export const DateOrTimeVariations = () =>
  <CardGroup className='three'  >
    <Card content={<CardContent content={<DateTimePicker label="Date and Time (default)" />} />} />
    <Card content={<CardContent content={<DateTimePicker label="Date Only" useTime={false} />} />} />
    <Card content={<CardContent content={<DateTimePicker label="Time Only" useDate={false} />} />} />
  </CardGroup>

export const InitialValues = () =>
  <CardGroup className='three'  >
    <Card content={<CardContent content={<DateTimePicker label="Now (default)" />} />} />
    <Card content={<CardContent content={<DateTimePicker label="A week from now" value={DateTime.now().plus({ week: 1 })} />} />} />
    <Card content={<CardContent content={<DateTimePicker label="A month ago" value={DateTime.now().minus({ month: 1 })} />} />} />
    <Card content={<CardContent content={<DateTimePicker label="Today at noon" value={DateTime.fromObject({ hour: 12 })} />} />} />
  </CardGroup>

export const TimeAccuracy = () =>
  <Card.Group>
    <Card content={<CardContent content={<DateTimePicker label="Hours and minutes (default)" />} />} />
    <Card content={<CardContent content={<DateTimePicker label="Include seconds" useSeconds />} />} />
    <Card content={<CardContent content={<DateTimePicker label="Include milliseconds" useMillis />} />} />
  </Card.Group>

export const DisabledInput = () =>
  <Card.Group>
    <Card content={<CardContent content={<DateTimePicker label="Enabled (default)" />} />} />
    <Card content={<CardContent content={<DateTimePicker label="Disabled" disabled />} />} />
  </Card.Group>

export const DisplayOptions = () =>
  <Card.Group>
    <Card content={<CardContent content={<DateTimePicker label="Block (default)" />} />} />
    <Card content={<CardContent content={<DateTimePicker label="Inline" inline />} />} />
  </Card.Group>


