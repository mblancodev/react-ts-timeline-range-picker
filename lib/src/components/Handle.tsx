import React from "react";
import { HandleProps } from "../types";

export const Handle: React.FC<HandleProps> = ({
  error,
  domain: [min, max],
  handle: { id, value, percent = 0 },
  disabled = false,
  getHandleProps,
}) => {
  const leftPosition = `${percent}%`;

  return (
    <>
      <button
        type="button"
        className="react_ts_tr__handle_wrapper"
        style={{ left: leftPosition }}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className={`react_ts_tr__handle_container${
          disabled ? "__disabled" : ""
        }`}
        style={{ left: leftPosition }}
      >
        <div
          className={`react_ts_tr__handle_marker${error ? "__error" : ""}`}
        />
      </div>
    </>
  );
};
