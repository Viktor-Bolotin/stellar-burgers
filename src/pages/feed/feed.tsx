import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds, getFeedsSelector } from '../../services/slices/feedSlice';
import { getIngredients } from '../../services/slices/burgerIngredientsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(getFeedsSelector).feeds;

  useEffect(() => {
    dispatch(getFeeds());
    dispatch(getIngredients());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
