import { FC, useEffect } from 'react';

import { fetchProfileOrders } from '@slices';
import {
  selectProfileOrders,
  selectProfileOrdersError,
  selectProfileOrdersLoading
} from '@selectors';
import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';

const PROFILE_ORDERS_POLLING_INTERVAL = 5000;

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectProfileOrders);
  const isLoading = useSelector(selectProfileOrdersLoading);
  const error = useSelector(selectProfileOrdersError);

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchProfileOrders());
    }

    const timerId = window.setInterval(() => {
      dispatch(fetchProfileOrders());
    }, PROFILE_ORDERS_POLLING_INTERVAL);

    return () => {
      window.clearInterval(timerId);
    };
  }, [dispatch, orders.length]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  if (error && !orders.length) {
    return <p className='text text_type_main-medium pt-10'>{error}</p>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
