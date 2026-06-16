import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthChecked, selectIsAuthenticated } from '@selectors';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

import { TProtectedRouteProps } from './type';

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const location = useLocation();
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const isAuth = useSelector(selectIsAuthenticated);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth) {
    return isAuth ? <Navigate to='/' replace /> : children;
  }

  return isAuth ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};
