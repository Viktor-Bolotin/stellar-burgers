import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  authorizationSelector,
  loginUser
} from '../../services/slices/authorizationSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loginUserError } = useSelector(authorizationSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    dispatch(loginUser({ email: email, password: password }));
    e.preventDefault();
  };

  return (
    <LoginUI
      errorText={loginUserError || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
