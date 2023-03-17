import { useState, useEffect, RefObject } from "react";

export const useIntersection = (
  element: RefObject<HTMLElement>,
  rootMargin: string
) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // if (entry.isIntersecting) {
        //   setState(entry.isIntersecting);
        //   element.current && observer.unobserve(element.current);
        // } // hook fires once
        setState(entry.isIntersecting);
      },
      { rootMargin }
    );
    const currentElement = element.current;
    currentElement && observer.observe(currentElement);

    return () => {
      currentElement && observer.unobserve(currentElement);
    };
  }, [element, rootMargin]);

  return isVisible;
};
