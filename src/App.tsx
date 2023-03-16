import React, { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { getUserAsync } from "./app/slices/user";
import { Home, Login, Messages, Profile, Register } from "./pages";
import { Route, Routes } from "react-router-dom";
import { LoginRoute } from "./components/RouteComponents/LoginRoute";
import { PrivateRoute } from "./components/RouteComponents/PrivateRoute";
import { FullPostSlider } from "./components";
import { Posts } from "./pages/Profile/Posts";
import { Saved } from "./pages/Profile/Saved";
import scss from "./App.module.scss";

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
                <Route path=":postId" element={<FullPostSlider />} />
              </Route>
              <Route path="saved" element={<Saved />}>
                <Route path=":postId" element={<FullPostSlider />} />
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
