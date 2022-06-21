import React from 'react'
import { ComponentMeta } from '@storybook/react';
import { Card, Header } from 'semantic-ui-react';
import DateTimePicker, { DateTimePickerProps } from '../../DateTimePicker';
import { DateTime } from 'luxon';
// interval ?: {
//   step: DurationUnits,
//   start: DateObjectUnits | DateTime,
//   end?: DateObjectUnits | DateTime
// }

// step 15 minutes
// start now
// end 2 weeks

// step 90 minutes
// start now
// end 2 weeks

// step 2 days
// start now
// end 2 weeks
// useTime false

const intervalOptions: DateTimePickerProps[] = [
  {
    label: 'every 15 minutes',
    interval: {
      step: { minute: 15 },
      start: { minute: 0 },
      end: DateTime.now().plus({ weeks: 2 })
    }
  },
  {
    label: 'every 90 minutes for 2 weeks',
    interval: {
      step: { minute: 90 },
      start: DateTime.now(),
      end: DateTime.now().plus({ weeks: 2 })
    }
  },
  {
    label: 'every 2 days for 2 weeks',
    interval: {
      step: { days: 2 },
      start: DateTime.now(),
      end: DateTime.now().plus({ weeks: 2 })
    },
    useTime: false
  },

]

export default {
  title: 'Date Time Library/DateTimePicker',
  component: DateTimePicker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof DateTimePicker>;

export const WithInterval = () => <>
  <Header content="Interval using Luxon DurationLikeObject object " />
  <Card.Group>
    {intervalOptions.map((args, i) =>
      <Card key={i}>
        <Card.Content >
          <DateTimePicker {...args} />
        </Card.Content>
      </Card>)
    }
  </Card.Group>
</>
