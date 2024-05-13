import { isBefore } from "date-fns"

export const sortIntervals = (intervals: Interval[]): Interval[] => {
  const newIntervals = intervals.toSorted((a, b) => {
    if (isBefore(a.start, b.start)) {
      return -1;
    } 
    if (isBefore(b.start, a.start)) {
      return 1;
    }
    if (isBefore(a.end, b.end)) {
      return -1;
    }
    if (isBefore(b.end, a.end)) {
      return 1;
    }
    return 0;
  });
  return newIntervals;
}