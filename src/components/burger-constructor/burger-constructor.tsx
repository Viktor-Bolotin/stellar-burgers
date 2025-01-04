import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearBasket,
  getIngredientsSelector
} from '../../services/slices/burgerIngredientsSlice';
import {
  closeOrderModalData,
  makeOrder,
  orderSelector
} from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { authorizationSelector } from '../../services/slices/authorizationSlice';

export const BurgerConstructor: FC = () => {
  const { orderRequest, orderModalData } = useSelector(orderSelector);
  const { basket } = useSelector(getIngredientsSelector);
  const { isAuthenticated } = useSelector(authorizationSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = basket;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) {
      return;
    }
    if (!isAuthenticated) {
      return navigate('/login');
    }
    const orderData = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );
    orderData.unshift(constructorItems.bun._id);
    orderData.push(constructorItems.bun._id);
    dispatch(makeOrder(orderData));
  };

  const closeOrderModal = () => {
    dispatch(clearBasket());
    dispatch(closeOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
