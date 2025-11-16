import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

type IRouteGuardProps = {
  isPrivate?: boolean; // true = chỉ cho login vào, false = chỉ cho chưa login vào
  redirectPath?: string;
};

export default function RouteGuard({ isPrivate }: IRouteGuardProps) {
  const { isAuth } = useAppSelector((state: any) => state.auth);

  // Nếu là private route nhưng chưa login → về login
  if (isPrivate && !isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
