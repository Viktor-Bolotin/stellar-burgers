import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getOrders, orderSelector } from '../../services/slices/orderSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/burgerIngredientsSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orderList } = useSelector(orderSelector);

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getIngredients());
  }, []);

  return <ProfileOrdersUI orders={orderList} />;
};
