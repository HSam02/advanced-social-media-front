import { RefObject, useEffect } from "react";

export const useScrollEnd = (
  boxRef: RefObject<HTMLElement>,
  distance: number = 80,
  callback: () => void
) => {
  useEffect(() => {
    if (!boxRef.current) {
      return;
    }
    const onScroll = (event: Event) => {
      if (boxRef.current) {
        const scrollY = boxRef.current.scrollTop;
        const scrollHeight =
          boxRef.current.scrollHeight - boxRef.current.clientHeight;
        if (scrollHeight - scrollY < distance) {
          callback();
        }
      }
    };

    boxRef.current.addEventListener("scroll", onScroll);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => boxRef.current?.removeEventListener("scroll", onScroll);
  }, [boxRef, distance, callback]);
};
