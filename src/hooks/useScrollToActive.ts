import { useEffect, useRef } from "react";

const useScrollToActive = (...deps: any[]) => {
  const scrollRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (scrollRef.current) {
      let container = scrollRef.current;
      const activeItem = container.querySelector('.item.active')
      if (activeItem) {
        const { top: itemTop, bottom: itemBottom } = activeItem.getBoundingClientRect();
        const { top: containerTop, bottom: containerBottom, height } = container.getBoundingClientRect();
        const middleYPos = (containerBottom - containerTop) / 2;
        const distanceToItem = itemTop - middleYPos;
        container.scrollTop = container.scrollTop + distanceToItem
      }
    }
  }, [...deps, scrollRef.current])
  return scrollRef;
}

export default useScrollToActive;