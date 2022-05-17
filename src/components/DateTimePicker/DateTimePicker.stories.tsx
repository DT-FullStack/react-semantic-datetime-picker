import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DateTimePicker from './DateTimePicker';

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
  className: 'right',
  selectDate: true,
  selectTime: true
};

export const DatePickerOnly = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DatePickerOnly.args = {
  selectTime: false,
  selectDate: true
};

export const TimePickerOnly = Template.bind({});
TimePickerOnly.args = {
  selectTime: true,
  selectDate: false,
};

