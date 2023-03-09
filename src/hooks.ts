import { useEffect, RefObject, useState } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  onClickOutside: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
};

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
