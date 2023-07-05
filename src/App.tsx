import React, { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { getUserAsync } from "./app/slices/user";
import { Home, Login, Messages, Profile, Register } from "./pages";
import { LoginRoute } from "./components/RouteComponents/LoginRoute";
import { PrivateRoute } from "./components/RouteComponents/PrivateRoute";
import { Posts, Reels, Saved } from "./pages/Profile/content/";
import {
  PostsSlider,
  ReelsSlider,
  SavedSlider,
} from "./pages/Profile/PostsFilter/filters";
import scss from "./App.module.scss";
import { FollowersModal } from "./pages/Profile/FollowersModal";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserAsync());
  }, [dispatch]);

  return (
    <>
      <div className={scss.app}>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Home />} />
            <Route path=":username" element={<Profile />}>
              <Route path="" element={<Posts />}>
                <Route path=":postId" element={<PostsSlider />} />
              </Route>
              <Route path="reels" element={<Reels />}>
                <Route path=":postId" element={<ReelsSlider />} />
              </Route>
              <Route path="saved" element={<Saved />}>
                <Route path=":postId" element={<SavedSlider />} />
              </Route>
            </Route>
            <Route path="direct" element={<Messages />} />
            <Route path="*" element={<>Not Found</>} />
          </Route>
          <Route path="/auth" element={<LoginRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
