import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import type { RootState } from "@/store/index";

type IRouteGuardProps = {
  isPrivate?: boolean; // true = chỉ cho login vào, false = chỉ cho chưa login vào
  redirectPath?: string;
};

export default function RouteGuard({
  isPrivate,
  redirectPath,
}: IRouteGuardProps) {
  const { isAuth } = useAppSelector((state: RootState) => state.auth);

  // Nếu là private route nhưng chưa login → về login
  if (isPrivate && !isAuth) {
    return <Navigate to="/login" replace />;
  }

  // Nếu là public route nhưng đã login → về dashboard
  if (!isPrivate && isAuth) {
    return <Navigate to={redirectPath || "/admin"} replace />;
  }

  return <Outlet />;
}
