import { useState, useEffect } from "react";

export const useVideoMute = () => {
  const [isMute, setIsMute] = useState(
    Boolean(localStorage.getItem("isVideoMute"))
  );

  useEffect(() => {
    const handleStorageChange = (evt: StorageEvent) => {
      setIsMute(Boolean(localStorage.getItem("isVideoMute")));
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleIsMute = () => {
    setIsMute((prev) => {
      localStorage.setItem("isVideoMute", !prev ? "true" : "");
      window.dispatchEvent(new Event("storage"));
      return !prev;
    });
  };

  return { isMute, toggleIsMute };
};