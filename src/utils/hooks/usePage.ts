import { useEffect } from "react";
import { postsDataType } from "../../app/slices/posts";

export const usePage = (postsData: postsDataType, callback: () => void) => {
  useEffect(() => {
    if (!postsData.posts && postsData.status !== "loading") {
      callback();
    }
    const onScroll = (event: Event) => {
      const scrollY = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (
        scrollHeight - scrollY < 200 &&
        postsData.status !== "loading" &&
        postsData.posts &&
        postsData.postsCount &&
        postsData.posts.length < postsData.postsCount
      ) {
        callback();
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [postsData, callback]);
};
