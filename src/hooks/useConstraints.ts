import { ConstraintFunction, getConstraintFn, MatchFunction } from "@util/DatetimeHelpers";
import { useCallback } from "react";
import { DateTimeState } from "src/context/datetime";

const useConstraints = (datetime: DateTimeState, matchFn: MatchFunction): ConstraintFunction => {
  const constraintFn = useCallback(
    getConstraintFn(datetime, matchFn),
    [datetime.constraints, matchFn]
  )
  return constraintFn
}

export default useConstraints