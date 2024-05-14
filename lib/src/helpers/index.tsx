import {
  format,
  isAfter,
  isBefore,
  addMinutes,
  differenceInMilliseconds,
} from "date-fns";

export const getTimelineConfig =
  (timelineStart: Date, timelineLength: number) => (date: Date) => {
    const percent =
      (differenceInMilliseconds(date, timelineStart) / timelineLength) * 100;
    const value = Number(format(date, "T"));
    return { percent, value };
  };

export const getFormattedBlockedIntervals = (
  blockedDates: Array<{ start: Date; end: Date }> = [],
  [startTime, endTime]: [Date, Date]
) => {
  if (!blockedDates.length) return [];

  const timelineLength = differenceInMilliseconds(endTime, startTime);
  const getConfig = getTimelineConfig(startTime, timelineLength);

  const formattedBlockedDates: Array<{
    id: string;
    source: { value: number };
    target: { value: number };
  }> = blockedDates.map((interval, index) => {
    let { start, end } = interval;

    if (isBefore(start, startTime)) start = startTime;
    if (isAfter(end, endTime)) end = endTime;

    const source = getConfig(start);
    const target = getConfig(end);

    return { id: `blocked-track-${index}`, source, target };
  });

  return formattedBlockedDates;
};

export const getNowConfig = ([startTime, endTime]: [Date, Date]) => {
  const timelineLength = differenceInMilliseconds(endTime, startTime);
  const getConfig = getTimelineConfig(startTime, timelineLength);

  const source = getConfig(new Date());
  const target = getConfig(addMinutes(new Date(), 1));

  return { id: "now-track", source, target };
};

