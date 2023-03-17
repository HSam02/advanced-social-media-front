import { useEffect } from "react";

export const useDisableScroll = () => {
  useEffect(() => {
    if (document.body.style.overflowY === "hidden") {
      return;
    }
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
};