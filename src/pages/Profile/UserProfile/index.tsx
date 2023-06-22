import { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { IUser } from "../../../app/slices/user";
import appAxios from "../../../appAxios";
import { AppButton, Avatar } from "../../../components";
import { DotsIcon, LoadingIcon } from "../../../components/icons";
import { PostsFilter } from "../PostsFilter";
import scss from "./UserProfile.module.scss";

export const UserProfile = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { username } = useParams();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await appAxios.get("/user/" + username);
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [username]);

  if (isLoading) {
    return (
      <div className={scss.loading}>
        <LoadingIcon />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className={scss.user}>
        <Avatar dest={user.avatarDest} size="150px" />
        <div className={scss.info}>
          <div>
            <p>{user.username}</p>
            <AppButton>Follow</AppButton>
            <AppButton gray>Message</AppButton>
            <DotsIcon />
          </div>
          <ul>
            <li>
              <span>{user.postsCount}</span> posts
            </li>
            <li>
              <a href="/">
                <span>{112}</span> followers
              </a>
            </li>
            <li>
              <a href="/">
                <span>{473}</span> following
              </a>
            </li>
          </ul>
          <h4>{user.fullname}</h4>
          <p>{user.bio}</p>
        </div>
      </div>
      <div className={scss.posts}>
        <PostsFilter />
        <Outlet />
      </div>
    </>
  );
};
