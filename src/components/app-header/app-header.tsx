import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { userSelector } from '../../services/slices/authorizationSlice';

export const AppHeader: FC = () => {
  const { name } = useSelector(userSelector);

  return <AppHeaderUI userName={name} />;
};
