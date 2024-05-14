import React from "react";

// Define TypeScript interface for the props
interface SliderRailProps {
  getRailProps: () => React.HTMLAttributes<HTMLElement>;
}

// The SliderRail functional component using TypeScript
export const SliderRail: React.FC<SliderRailProps> = ({ getRailProps }) => (
  <>
    <div className="react_ts_tr__rail__outer" {...getRailProps()} />
    <div className="react_ts_tr__rail__inner" />
  </>
);
