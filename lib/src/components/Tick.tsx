import { getMinutes } from "date-fns";
import React from "react";

interface TickData {
  id: string;
  value: number;
  percent: number;
}

interface TickProps {
  tick: TickData;
  count: number;
  format: (value: number) => string;
}

export const Tick: React.FC<TickProps> = ({
  tick,
  count,
  format = (d) => d.toString(),
}) => {
  const isFullHour = !getMinutes(new Date(tick.value));

  const tickLabelStyle = {
    marginLeft: `${-(100 / count) / 2}%`,
    width: `${100 / count}%`,
    left: `${tick.percent}%`,
  };

  return (
    <>
      <div
        className={`react_ts_tr__tick_marker${
          isFullHour ? "__large" : ""
        }`}
        style={{ left: `${tick.percent}%` }}
      />
      {isFullHour && (
        <div className="react_ts_tr__tick_label" style={tickLabelStyle}>
          {format(tick.value)}
        </div>
      )}
    </>
  );
};
