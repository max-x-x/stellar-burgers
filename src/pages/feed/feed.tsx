import { FC, useEffect } from 'react';

import { fetchFeed } from '@slices';
import {
  selectFeedError,
  selectFeedLoading,
  selectFeedOrders
} from '@selectors';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';

const FEED_POLLING_INTERVAL = 5000;

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);
  const error = useSelector(selectFeedError);

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchFeed());
    }

    const timerId = window.setInterval(() => {
      dispatch(fetchFeed());
    }, FEED_POLLING_INTERVAL);

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

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
