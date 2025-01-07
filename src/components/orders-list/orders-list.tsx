import { FC, memo } from 'react';

import { OrdersListProps } from './type';
import { OrdersListUI, Preloader } from '@ui';
import { orderSelector } from '../../services/slices/orderSlice';
import { getIngredientsSelector } from '../../services/slices/burgerIngredientsSlice';
import { useSelector } from '../../services/store';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const { loadingOrderList } = useSelector(orderSelector);
  const { isIngredientsLoading } = useSelector(getIngredientsSelector);

  const isData: boolean = !loadingOrderList && !isIngredientsLoading;

  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return isData ? <OrdersListUI orderByDate={orderByDate} /> : <Preloader />;
});
