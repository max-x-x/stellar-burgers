import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrderByNumber } from '@slices';
import {
  selectCurrentOrder,
  selectIngredients,
  selectOrderError,
  selectOrderLoading
} from '@selectors';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const orderData = useSelector(selectCurrentOrder);
  const isOrderLoading = useSelector(selectOrderLoading);
  const orderError = useSelector(selectOrderError);
  const ingredients: TIngredient[] = useSelector(selectIngredients);

  useEffect(() => {
    if (number) {
      const orderNumber = Number(number);
      if (!Number.isNaN(orderNumber)) {
        dispatch(fetchOrderByNumber(orderNumber));
      }
    }
  }, [dispatch, number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isOrderLoading) {
    return <Preloader />;
  }

  if (orderError) {
    return <p className='text text_type_main-medium pt-10'>{orderError}</p>;
  }

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
