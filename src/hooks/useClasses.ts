import { ClassFunction, ClassFnGenerator, ConstraintFunction, getClassFn } from "@util/DatetimeHelpers";
import { useCallback } from "react";
import { DateTimeState } from "src/context/datetime";


const useClasses = (datetime: DateTimeState, constraintFn: ConstraintFunction, classFns: ClassFnGenerator[] = []): ClassFunction => {

  const classes = useCallback(
    getClassFn(datetime, constraintFn, classFns),
    [datetime.constraints, datetime.current, datetime.cursor]
  )

  return classes;
}

export default useClasses