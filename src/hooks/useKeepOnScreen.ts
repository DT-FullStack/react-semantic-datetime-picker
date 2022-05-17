import { useEffect } from "react"

const useKeepOnScreen = (ref: React.RefObject<HTMLElement>) => {
  const body = document.querySelector('body')
  if (!body) return
  const viewBox = body.getBoundingClientRect()
  const isAbove = (ele: DOMRect): boolean => ele.top < 5
  const isBelow = (ele: DOMRect): boolean => viewBox.bottom - ele.bottom < 5
  const isToLeft = (ele: DOMRect): boolean => ele.left < 5
  const isToRight = (ele: DOMRect): boolean => viewBox.right - ele.right < 5

  useEffect(() => {
    if (ref.current) {
      const refBox = ref.current.getBoundingClientRect()
      console.log({ viewBox, refBox })
      if (isAbove(refBox)) ref.current.classList.add('top-guard')
      if (isBelow(refBox)) ref.current.classList.add('bottom-guard')
      if (isToLeft(refBox)) ref.current.classList.add('left-guard')
      if (isToRight(refBox)) ref.current.classList.add('right-guard')

    }
  }, [ref.current])
}

export default useKeepOnScreen