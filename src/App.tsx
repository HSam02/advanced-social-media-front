import React, { useEffect } from "react";
import scss from "./App.module.scss";
import { Home, Login, Messages, Profile, Register } from "./pages";
import { getUserAsync } from "./app/slices/user";
import { useAppDispatch } from "./app/hooks";
import { Route, Routes } from "react-router-dom";
import { LoginRoute } from "./components/LoginRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import Example from "./Example";

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
            <Route path="profile" element={<Profile />} />
            <Route path="direct" element={<Messages />} />
            <Route path="*" element={<>retgh</>} />
          </Route>
          <Route path="/auth" element={<LoginRoute />}>
            <Route path="example" element={<Example />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;