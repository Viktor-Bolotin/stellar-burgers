import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { userSelector } from '../../services/slices/authorizationSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { name } = useSelector(userSelector);

  return <AppHeaderUI userName={name} />;
};
