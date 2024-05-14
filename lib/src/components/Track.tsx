import React, { CSSProperties } from "react";
import { TrackProps } from "../types";

// Helper function to generate style based on props
const getTrackConfig = ({
  error,
  source,
  target,
  disabled,
}: TrackProps): CSSProperties => {
  const basicStyle: CSSProperties = {
    left: `${source.percent}%`,
    width: `calc(${(target.percent as number) - (source.percent as number)}% - 1px)`,
  };

  if (disabled) return basicStyle;

  const coloredTrackStyle: CSSProperties = error
    ? {
        backgroundColor: "rgba(214,0,11,0.5)",
        borderLeft: "1px solid rgba(214,0,11,0.5)",
        borderRight: "1px solid rgba(214,0,11,0.5)",
      }
    : {
        backgroundColor: "rgba(98, 203, 102, 0.5)",
        borderLeft: "1px solid #62CB66",
        borderRight: "1px solid #62CB66",
      };

  return { ...basicStyle, ...coloredTrackStyle };
};

// The Track component defined using TypeScript
export const Track: React.FC<TrackProps> = ({
  error,
  source,
  target,
  getTrackProps,
  disabled = false,
}) => (
  <div
    className={`react_ts_tr__track${disabled ? "__disabled" : ""}`}
    style={getTrackConfig({ error, source, target, disabled } as TrackProps)}
    {...getTrackProps()}
  />
);
