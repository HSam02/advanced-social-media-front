import { useLocation } from "react-router-dom";

export const useGetPostFilter = () => {
  const { pathname } = useLocation();

  const filter = pathname.includes("saved")
    ? "saved"
    : pathname.includes("reels")
    ? "reels"
    : "posts";
  return filter;
};
