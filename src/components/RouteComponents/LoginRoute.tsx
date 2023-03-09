import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../app/slices/user";
import { LoadingPage } from "../../pages";

export const LoginRoute: React.FC = () => {
  const { status, user } = useAppSelector(selectUser);
  const location = useLocation();

  if (status === "loading:access" || status === "idle") {
    return <LoadingPage />;
  }

  if (user) {
    return <Navigate to={location.state || "/"} />;
  }

  return <Outlet />;
};
