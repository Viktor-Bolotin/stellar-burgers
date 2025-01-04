import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  authorizationSelector,
  registerUser
} from '../../services/slices/authorizationSlice';
import { TRegisterData } from '@api';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const registerData: TRegisterData = {
    email: email,
    name: userName,
    password: password
  };

  const { isAuthChecked, loginUserError } = useSelector(authorizationSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser(registerData));
  };

  return !isAuthChecked ? (
    <Preloader />
  ) : (
    <RegisterUI
      errorText={loginUserError ? loginUserError : ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
