import { useEffect, useRef } from "react";

export interface ClickOutOptions {
  ref?: React.RefObject<HTMLElement>
  onClickOut: () => void
}

const useClickOut = ({ ref, onClickOut }: ClickOutOptions): React.RefObject<HTMLElement> => {
  if (!ref) ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      const element = e.target;
      if (ref && ref.current && !ref.current.contains(element as Node)) {
        e.preventDefault();
        e.stopPropagation();
        onClickOut();
      }
    };
    document.addEventListener('click', onClickOutside)
    return () => document.removeEventListener('click', onClickOutside);
  }, [ref, onClickOut])

  return ref;
}

export default useClickOut