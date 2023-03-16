import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { removeUserUnsaves, selectUser } from "../../../app/slices/user";
import { PostGallery } from "../../../components";

export const Saved: React.FC = () => {
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  console.log("Posts", user);

  useEffect(() => {
    dispatch(removeUserUnsaves());
    return () => {
      dispatch(removeUserUnsaves());
    };
  }, [dispatch]);

  if (!user) {
    return null;
  }
  return user.saved.length > 0 ? (
    <>
      <PostGallery posts={user.saved} />
      <Outlet />
    </>
  ) : (
    <h5>You don't have saved post</h5>
  );
};
