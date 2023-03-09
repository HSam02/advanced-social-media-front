import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../app/slices/user";
import { LoadingPage } from "../../pages";
import { SideBar } from "../SideBar";

export const PrivateRoute: React.FC = () => {
  const { user, status } = useAppSelector(selectUser);
  const location = useLocation();

  if (status === "loading:access" || status === "idle") {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/auth/login" state={location.pathname} />;
  }

  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};
