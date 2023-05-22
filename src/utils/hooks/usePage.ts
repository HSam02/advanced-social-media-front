import { useEffect, useState } from "react";
import { postsDataType } from "../../app/slices/posts";

export const usePage = (postsData: postsDataType | null) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const onScroll = (event: Event) => {
      const scrollY = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (scrollHeight - scrollY < 200 && postsData && page < postsData.pages) {
        setPage(
          Math.floor(
            (postsData.posts.length / postsData.postsCount) * postsData.pages
          ) + 1
        );
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [postsData, page]);

  return { page, setPage };
};
