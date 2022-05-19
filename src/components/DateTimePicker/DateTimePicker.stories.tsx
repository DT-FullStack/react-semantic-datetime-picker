import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DateTimePicker from './DateTimePicker';
import { Card, CardContent, CardGroup } from 'semantic-ui-react';

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
  <div style={{ height: '3000px' }}>
    <CardGroup className='three' >
      <Card content={<DateTimePicker {...args} />} />
      <Card content={<DateTimePicker {...args} />} />
      <Card content={<DateTimePicker {...args} />} />
    </CardGroup>

  </div>

export const InCardContent: ComponentStory<typeof DateTimePicker> = (args) =>
  <div style={{ height: '3000px' }}>
    <CardGroup className='three' >
      <Card content={<CardContent content={<DateTimePicker {...args} />} />} />
      <Card content={<CardContent content={<DateTimePicker {...args} />} />} />
      <Card content={<CardContent content={<DateTimePicker {...args} />} />} />
    </CardGroup>

  </div>



export const LeftAlign = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LeftAlign.args = {
  align: 'left',
};

export const CenterAlign = Template.bind({});
CenterAlign.args = {
  align: 'center',
};

