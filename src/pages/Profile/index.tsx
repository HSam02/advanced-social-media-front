import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearPostSlice } from "../../app/slices/posts";
import { clearComments } from "../../app/slices/comments";
import { selectUser } from "../../app/slices/user";
import { MyProfile } from "./MyProfile";
import { UserProfile } from "./UserProfile";
import scss from "./Profile.module.scss";

export const Profile: React.FC = () => {
  console.log("Profile");
  const { user } = useAppSelector(selectUser);
  const { username } = useParams();

  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(clearPostSlice());
      dispatch(clearComments());
    };
  }, [dispatch, user, username]);

  if (!user || !username) {
    return null;
  }

  return (
    <div className={scss.profile}>
      {user.username === username ? <MyProfile /> : <UserProfile />}
    </div>
  );
};
