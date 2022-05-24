import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DateTimePicker from './DateTimePicker';
import { Card, CardContent, CardGroup } from 'semantic-ui-react';
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

export const RightAlign = Template.bind({});
RightAlign.args = {
  align: 'right',
};
export const InCardGroup: ComponentStory<typeof DateTimePicker> = (args) =>
  <CardGroup className='three'  >
    <Card content={<DateTimePicker {...args} />} />
    <Card content={<DateTimePicker {...args} />} />
    <Card content={<DateTimePicker {...args} />} />
  </CardGroup>

export const InCardContent: ComponentStory<typeof DateTimePicker> = (args) =>
  <CardGroup className='three'  >
    <Card content={<CardContent content={<DateTimePicker {...args} />} />} />
    <Card content={<CardContent content={<DateTimePicker {...args} />} />} />
    <Card content={<CardContent content={<DateTimePicker {...args} />} />} />
  </CardGroup>



export const IncludeDateTimeInstance = Template.bind({});
IncludeDateTimeInstance.args = {
  include: [DateTime.now(), DateTime.now().plus({ day: 1 }), DateTime.now().plus({ day: 4 })]
};
export const IncludeDateTimeObject = Template.bind({});
IncludeDateTimeObject.args = {
  include: [{ month: 5 }, { day: 6 }]
};

export const ExcludeDateTimeInstance = Template.bind({});
ExcludeDateTimeInstance.args = {
  exclude: [DateTime.now(), DateTime.now().plus({ day: 1 }), DateTime.now().plus({ day: 4 })]
};
export const ExcludeDateTimeObject = Template.bind({});
ExcludeDateTimeObject.args = {
  exclude: [{ month: 5 }, { day: 6 }]
};
export const ExcludeDateOfWeek = Template.bind({});
ExcludeDateOfWeek.args = {
  exclude: [{ weekday: 7 }]
};


export const WithRange = Template.bind({});
WithRange.args = {
  min: DateTime.fromObject({ year: 2020 }),
  max: DateTime.fromObject({ month: 5 })
};

export const CenterAlign = Template.bind({});
CenterAlign.args = {
  align: 'center',
};

