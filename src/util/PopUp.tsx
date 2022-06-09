import useClickOut from '@hooks/useClickOut';
import React, { PropsWithChildren, useEffect, useRef } from 'react'
import { OnClickOut } from './DatetimeHelpers';
import "./PopUp.sass"
import useKeepOnScreen from '../hooks/useKeepOnScreen';

export interface PopUpProps extends OnClickOut {

}

const PopUp = ({ children, onClickOut = () => { } }: PropsWithChildren<PopUpProps>) => {
  const ref = useRef<HTMLDivElement>(null);
  const isAbove = (ele: DOMRect): boolean => ele.top < 0
  const isBelow = (ele: DOMRect, viewBox: DOMRect): boolean => ele.bottom > viewBox.bottom
  const isToLeft = (ele: DOMRect): boolean => ele.left < 0
  const isToRight = (ele: DOMRect, viewBox: DOMRect): boolean => ele.right > viewBox.right

  useClickOut(ref, onClickOut)
  useKeepOnScreen(ref)

  useEffect(() => {
    const body = document.querySelector('body')

    if (!body || !ref.current) return
    const viewBox = body.getBoundingClientRect()
    const refBox = ref.current.getBoundingClientRect();
    // console.log({ viewBox, refBox })
    if (isAbove(refBox)) { console.log('top'); ref.current.classList.add('top-guard') }
    else if (isBelow(refBox, viewBox)) { console.log('bottom'); ref.current.classList.add('bottom-guard') }
    else if (isToLeft(refBox)) { console.log('left'); ref.current.classList.add('left-guard') }
    else if (isToRight(refBox, viewBox)) { console.log('right'); ref.current.classList.add('right-guard') }

  }, [ref.current])
  return (
    <div className='pop-up' ref={ref}>{children}</div>
  )
}

export default PopUp