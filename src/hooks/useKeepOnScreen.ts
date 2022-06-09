import { useEffect } from "react"

const useKeepOnScreen = (ref: React.RefObject<HTMLElement>) => {
  const body = document.querySelector('body')
  if (!body) return
  const viewBox = body.getBoundingClientRect()
  const isAbove = (ele: DOMRect): boolean => ele.top < 0
  const isBelow = (ele: DOMRect): boolean => ele.bottom > viewBox.bottom
  const isToLeft = (ele: DOMRect): boolean => ele.left < 0
  const isToRight = (ele: DOMRect): boolean => ele.right > viewBox.right

  useEffect(() => {
    if (ref.current) {
      const refBox = ref.current.getBoundingClientRect()
      if (isAbove(refBox)) { console.log('top'); ref.current.classList.add('top-guard') }
      else if (isBelow(refBox)) { console.log('bottom'); ref.current.classList.add('bottom-guard') }
      else if (isToLeft(refBox)) { console.log('left'); ref.current.classList.add('left-guard') }
      else if (isToRight(refBox)) { console.log('right'); ref.current.classList.add('right-guard') }

    }
  }, [ref])
}

export default useKeepOnScreen