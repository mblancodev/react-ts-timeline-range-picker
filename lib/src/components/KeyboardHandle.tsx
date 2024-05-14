import React from "react";
import { HandleData } from "../types";

interface KeyboardHandleProps {
  domain: [number, number];
  handle: HandleData;
  disabled?: boolean;
  getHandleProps: (id: string) => React.HTMLAttributes<HTMLElement>;
}

export const KeyboardHandle: React.FC<KeyboardHandleProps> = ({
  domain: [min, max],
  handle: { id, value, percent = 0 },
  disabled = false,
  getHandleProps,
}) => (
  <button
    role="slider"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    className="react_ts_tr__keyboard_handle"
    style={{
      left: `${percent}%`,
      backgroundColor: disabled ? "#666" : "#ffc400",
    }}
    {...getHandleProps(id)}
  />
);
