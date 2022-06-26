import React, { Reducer, useEffect } from 'react'
import { DateObjectUnits, DateTime } from "luxon";
import { ComponentProps, createContext, Dispatch, ReducerState, SetStateAction, useContext, useReducer, useState } from "react";
import { ConstraintOptions } from "src/components/DateTimePicker/DateTimePicker";
import { getDateTimeFromNumber } from '@util/DatetimeHelpers';


/**
 * Create types
 */
export interface DateTimeState {
  current: DateTime,
  cursor: DateTime,
  constraints: ConstraintOptions
}
type DateLike = DateTime | DateObjectUnits | number;
interface DateTimeDispatch {
  current: (value: DateLike) => void,
  cursor: (value: DateLike) => void,
  constraints: (options: ConstraintOptions) => void,
}

/**
 * Initial state
 */
const initialState: DateTimeState = {
  current: DateTime.now(),
  cursor: DateTime.now(),
  constraints: {},
}

/**
 * Creates contexts to use as Providers
 */
const DateStateContext = createContext<DateTimeState>(initialState)
const DateDispatchContext = createContext<DateTimeDispatch>({
  current: () => { },
  cursor: () => { },
  constraints: () => { }
})

/**
 * Define possible actions and payloads for reducer
 */
type DateActionTypes = 'SET_CURRENT' | 'SET_CURSOR'
type DatePayloadTypes = DateTime | DateObjectUnits | number
interface DateActions {
  type: DateActionTypes,
  payload: DatePayloadTypes
}
type ConstraintActionTypes = 'SET_CONSTRAINTS'
interface ConstraintActions {
  type: ConstraintActionTypes,
  payload: ConstraintOptions
}

/**
 * Returns a new DateTime instance
 * @param datetime reference to current datetime
 * @param value any new representation of a DateTime including timestamp (in millis)
 * @returns a DateTime instance
 */
const updateDateTime = (datetime: DateTime, value: DateTime | DateObjectUnits | number): DateTime =>
  (typeof value === 'number' || value instanceof DateTime)
    ? getDateTimeFromNumber(value)
    : datetime.set(value)

const reducer: Reducer<DateTimeState, DateActions | ConstraintActions> = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case ('SET_CURRENT'):
      const dt = updateDateTime(state.current, payload)
      return { ...state, current: dt, cursor: dt }
    case ('SET_CURSOR'):
      console.log(payload)
      return { ...state, cursor: updateDateTime(state.cursor, payload) }
    case ('SET_CONSTRAINTS'):
      return { ...state, constraints: { ...state.constraints, ...payload } }
    default:
      return { ...state }
  }
}

export const useDateTime = (): [DateTimeState, DateTimeDispatch] => [useContext(DateStateContext), useContext(DateDispatchContext)]

export const DateTimeProvider: React.FC<{ value?: DateLike, constraints?: ConstraintOptions }> = ({ value, children, constraints: constraintOptions }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const current = (payload: DateLike) => dispatch({ type: 'SET_CURRENT', payload })
  const cursor = (payload: DateLike) => dispatch({ type: 'SET_CURSOR', payload })
  const constraints = (payload: ConstraintOptions) => dispatch({ type: 'SET_CONSTRAINTS', payload })
  useEffect(() => {
    if (value) {
      current(value)
      cursor(value)
    }
  }, [value])
  useEffect(() => {
    if (constraintOptions) constraints(constraintOptions)
  }, [constraintOptions])
  return (
    <DateDispatchContext.Provider value={{ current, cursor, constraints }}>
      <DateStateContext.Provider value={state}>
        {children}
      </DateStateContext.Provider>
    </DateDispatchContext.Provider>
  )
}

