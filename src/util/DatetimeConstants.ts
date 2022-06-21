function numberArray(start: number, max: number, step = 1) {
  let array = [];
  while (start < max) {
    array.push(start)
    start += step
  }
  return array
}

export const minutes = (step = 1) => numberArray(0, 60, step)
export const seconds = (step = 1) => numberArray(0, 60, step)
export const millis = (step = 50) => numberArray(0, 1000, step)
export const weekdays = numberArray(0, 7)
export const months = numberArray(1, 12)