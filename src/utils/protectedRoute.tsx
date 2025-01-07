import { Preloader } from '@ui';
import { useSelector } from '../services/store';
import { Navigate, useLocation } from 'react-router';
import { authorizationSelector } from '../services/slices/authorizationSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const { isAuthChecked } = useSelector(authorizationSelector);
  const { user } = useSelector(authorizationSelector);
  const location = useLocation();
  let isUserData: boolean;

  if (user.name !== '' && user.email !== '') {
    isUserData = true;
  } else {
    isUserData = false;
  }

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isUserData) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isUserData) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate to={from} />;
  }

  return children;
};
