import { FC, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { clearOrderModalData, createOrder } from '@slices';
import {
  selectConstructorItems,
  selectConstructorOrderError,
  selectConstructorOrderModalData,
  selectConstructorOrderRequest,
  selectIsAuthenticated
} from '@selectors';
import { TConstructorIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const constructorItems = useSelector(selectConstructorItems);
  const orderError = useSelector(selectConstructorOrderError);
  const orderRequest = useSelector(selectConstructorOrderRequest);
  const orderModalData = useSelector(selectConstructorOrderModalData);

  const onOrderClick = () => {
    if (orderRequest) return;

    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }

    if (!constructorItems.bun) {
      return;
    }

    dispatch(createOrder());
  };
  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      orderError={orderError || undefined}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
