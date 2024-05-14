export type DateValuesType = readonly number[];

export interface TrackPointValue {
  value: number;
}

export interface TrackPoint extends TrackPointValue {
  id?: string;
  value: number;
  percent?: number;
}

export interface TrackProps {
  error?: boolean;
  source: TrackPoint;
  target: TrackPoint;
  disabled?: boolean;
  getTrackProps: () => React.HTMLAttributes<HTMLElement>;
}

export interface HandleData {
  id: string;
  value: number;
  percent?: number; // percent is made optional and can default to 0
}

export interface HandleProps {
  error?: boolean;
  handle: HandleData;
  disabled?: boolean;
  domain: DateValuesType;
  getHandleProps: (id: string) => React.HTMLAttributes<HTMLElement>;
}