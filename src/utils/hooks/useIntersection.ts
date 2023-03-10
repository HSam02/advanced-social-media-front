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

    element.current && observer.observe(element.current);

    return () => {
      element.current && observer.unobserve(element.current);
    };
  }, [element, rootMargin]);

  return isVisible;
};
