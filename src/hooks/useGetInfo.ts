import { ClassFunction, MatchFunction, ConstraintFunction, ClassFnGenerator } from "@util/DatetimeHelpers"
import { DateTimeState } from "src/context/datetime"
import useClasses from "./useClasses"
import useConstraints from "./useConstraints"

const useGetInfo = (datetime: DateTimeState, matchFn: MatchFunction, extraClasses: ClassFnGenerator[] = []): [ClassFunction, ConstraintFunction] => {
  const constraints = useConstraints(datetime, matchFn)
  const classes = useClasses(datetime, constraints, extraClasses)

  return [classes, constraints]
}

export default useGetInfo