import { useEffect, useRef } from "react";

const useClickOut = (ref: React.RefObject<HTMLElement>, onClickOut: () => void): void => {
  const isInDocument = (element: any) => document.contains(element)
  const isInRef = (element: any) => ref.current?.contains(element)

  const onClickOutside = (e: MouseEvent) => {
    const element = e.target;
    if (ref.current !== null && isInDocument(element) && !isInRef(element)) {
      e.preventDefault();
      e.stopPropagation();
      onClickOut();
    }
  };
  const addListener = () => document.addEventListener('click', onClickOutside)
  const removeListener = () => document.removeEventListener('click', onClickOutside);

  useEffect(() => {
    if (ref.current) addListener();
    return removeListener;
  }, [ref])

  // return ref;
}

export default useClickOut