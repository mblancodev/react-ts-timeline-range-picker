import React, { useMemo } from "react";

import {
  Rail,
  Ticks,
  Slider,
  Tracks,
  Handles,
  CustomMode,
} from "react-compound-slider";
import { scaleTime } from "d3-scale";
import { format, Day } from "date-fns";
import { Tick } from "./components/Tick";
import { Track } from "./components/Track";
import { Handle } from "./components/Handle";
import { SliderRail } from "./components/SliderRail";
import { getFormattedBlockedIntervals } from "./helpers";
import { DateValuesType, TrackPointValue } from "./types";

import "./assets/main.css";

export interface TimelineRange {
  value: DateValuesType;
  timelineInterval: [Date, Date];
  onChange: (values: DateValuesType) => void;
  // Optional props
  step?: number;
  weekStartsOn?: Day;
  ticksCount?: number;
  mode?: 1 | 2 | 3 | CustomMode | undefined;
  disabledIntervals?: Array<{ start: Date; end: Date }>;
  onUpdateCallback?: (p: { error: boolean; time: readonly Date[] }) => void;
}

const TimelineRange = (props: TimelineRange) => {
  const disabledIntervals = useMemo(() => {
    return getFormattedBlockedIntervals(
      props.disabledIntervals,
      props.timelineInterval
    );
  }, [props.disabledIntervals, props.timelineInterval]);

  const dateTicks = scaleTime()
    .domain(props.timelineInterval)
    .ticks(props.ticksCount || 48)
    .map((t) => +t);

  const domain = props.timelineInterval.map((t) => Number(t));

  const checkIsSelectedIntervalNotValid = (
    [start, end]: DateValuesType,
    source: TrackPointValue,
    target: TrackPointValue
  ) => {
    const { value: startInterval } = source;
    const { value: endInterval } = target;

    if (
      (startInterval > start && endInterval <= end) ||
      (startInterval >= start && endInterval < end)
    )
      return true;
    if (start >= startInterval && end <= endInterval) return true;

    const isStartInBlockedInterval =
      start > startInterval && start < endInterval && end >= endInterval;
    const isEndInBlockedInterval =
      end < endInterval && end > startInterval && start <= startInterval;

    return isStartInBlockedInterval || isEndInBlockedInterval;
  };

  const onUpdate = (newTime: DateValuesType) => {
    const { onUpdateCallback } = props;
    if (!onUpdateCallback) return;

    if (disabledIntervals?.length) {
      const isValuesNotValid = disabledIntervals.some(({ source, target }) =>
        checkIsSelectedIntervalNotValid(newTime, source, target)
      );
      const formattedNewTime = newTime.map((t) => new Date(t));
      onUpdateCallback({ error: isValuesNotValid, time: formattedNewTime });
      return;
    }

    const formattedNewTime = newTime.map((t) => new Date(t));
    onUpdateCallback({ error: false, time: formattedNewTime });
  };

  const formatTick = (ms: number | Date) => {
    return format(new Date(ms), "HH:mm", {
      weekStartsOn: props.weekStartsOn || 0,
    });
  };

  return (
    <div className="react_ts_tr__time_range_container">
      <Slider
        domain={domain}
        onUpdate={onUpdate}
        values={props.value}
        mode={props.mode || 3}
        step={props.step || 10}
        onChange={props.onChange}
        rootStyle={{ position: "relative", width: "100%" }}
      >
        <Rail>
          {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <>
              {handles.map((handle) => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={domain}
                  getHandleProps={getHandleProps}
                />
              ))}
            </>
          )}
        </Handles>

        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <>
              {tracks?.map(({ id, source, target }) => (
                <Track
                  key={id}
                  // error={error}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </>
          )}
        </Tracks>

        {disabledIntervals.length && (
          <Tracks left={false} right={false}>
            {({ getTrackProps }) => (
              <>
                {disabledIntervals.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    disabled
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </>
            )}
          </Tracks>
        )}

        <Ticks values={dateTicks}>
          {({ ticks }) => (
            <>
              {ticks.map((tick) => (
                <Tick
                  tick={tick}
                  key={tick.id}
                  format={formatTick}
                  count={ticks.length}
                />
              ))}
            </>
          )}
        </Ticks>
      </Slider>
    </div>
  );
};

export default TimelineRange;
