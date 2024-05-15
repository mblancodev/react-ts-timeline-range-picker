# react-ts-timeline-range-picker

This is an updated fork of `@marenaud/react-timeline-range-slider`

## Installation

```bash
npm install @mblancodev/react-ts-timeline-range-picker
```

or

```bash
yarn add @mblancodev/react-ts-timeline-range-picker
```

## Usage

### Basic Example

```tsx
import React from 'react';
import { startOfDay, endOfDay } from 'date-fns'
import { TimelineRangePicker } from '@mblancodev/react-ts-timeline-range-picker';

function App() {
  return (
    <div>
      <TimelineRangePicker
        value={[]}
        onChange={() => {}}
        timelineInterval={[startOfDay(new Date()), endOfDay(new Date())]} />
    </div>
  );
}

export default App;
```

### Importing default styles

```tsx
import React from 'react';
import { addDays } from 'date-fns'
import { TimelineRangePicker } from '@mblancodev/react-ts-timeline-range-picker';
import "@mblancodev/react-ts-timeline-range-picker/assets/main.css"

[...]
```

### Advance example

```tsx
import { DateValuesType } from "@mblancodev/react-ts-timeline-range-picker/dist/src/types";
import { TimelineRangePicker } from "@mblancodev/react-ts-timeline-range-picker";
import "@mblancodev/react-ts-timeline-range-picker/dist/assets/main.css";
import { startOfDay, endOfDay, addHours } from "date-fns";
import { DateTime } from "luxon";
import { useState } from "react";

export const RangeTestPage = () => {
  const now = new Date();

  const [value, setValue] = useState<DateValuesType>([
    addHours(now, 2).getTime(),
    addHours(now, 4).getTime(),
  ]);

  function handleChange(values: DateValuesType) {
    setValue(values);
  }

  const [start, end] = value.map((t) =>
    DateTime.fromJSDate(new Date(t)).toFormat("HH:mm")
  );

  return (
    <div className="container my-12 p-4">
      <p className="px-8 translate-x-24">
        Selected: {DateTime.fromJSDate(now).toFormat("LLL dd")} at {start} - {end}
      </p>
      <TimelineRangePicker
        step={30}
        value={value}
        disabledIntervals={[
          {
            start: addHours(startOfDay(now), 2),
            end: addHours(startOfDay(now), 3),
          },
        ]}
        onChange={handleChange}
        timelineInterval={[startOfDay(now), endOfDay(now)]}
      />
    </div>
  );
};

```

## Expectations for the future

I intent to add the following features in the near future:

- Drag. For moving the whole range value without afectting only the start of end values


I'm open to suggestions since I only needed this component for a very specific use :)

## API Reference

#### `TimelineRangePicker(props) - Required`

| Parameter | Type    | Description              |
| :-------- | :------ | :----------------------- |
| `timelineInterval`   | `[Date, Date]`| [date start, date end] for the timeline range  |
| `value`   | `DateValuesType`| Component controlled value  |
| `onChange`   | `(value: DateValuesType) => void`| onChange value handler |

#### `TimelineRangePicker(props) - Optional`

| Parameter | Type    | Description              |
| :-------- | :------ | :----------------------- |
| `step`   | `number`| Defaults to `10`  |
| `ticksCount`   | `number`| Ticks labels to show  |
| `mode`   | `number`| [Long description]  |
| `disabledIntervals`   | `Array<{ start: Date; end: Date }>`| Disabled slots inside the range  |
| `weekStartsOn`   | `Day` | Defaults to `0`. Sunday to Saturday in numbers. Count starts at 0 just like in `date-fns` |
| `onUpdateCallback`   | `(p: { error: boolean; time: readonly Date[] }) => void`| Functions like an onInput change event  |

#### `Types`

| Type    | Description              |
| :-------- | :----------------------- |
| `Date`  | ` new Date()`
| `DateValuesType`  | `number[]` |
| `ticksCount`   | `number` -  Defaults to `48`  |
| `mode`   | `number`  |
| `disabledIntervals`   | `Array<{ start: Date; end: Date }>` |
| `weekStartsOn`   | `Day` - Defaults to `0` |
| `onUpdateCallback`   | `(p: { error: boolean; time: readonly Date[] }) => void` |

## Contributing

I'm open to contributions, I'm new when it comes to developing pkgs so I do expect pull requests for errors that I've not seem yet.

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

Specify the license. For example, if your package is licensed under the MIT license, you could add:

```plaintext
MIT License

Copyright (c) 2023 Manuel Blanco.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.
```

## Support

If you need help setting up the package or would like to recommend some future updates you can email me at: manblanco20@gmail.com

<!-- ## Authors and acknowledgment -->

## Changelog

- 0.0.1: Basic functionality. Display range dates, change values and non-update callback on errors if a `disabledIntervals` prop is given and value falls under those disabled slots.