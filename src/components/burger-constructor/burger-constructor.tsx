import { DragEvent, FC, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { addIngredient, clearOrderModalData, createOrder } from '@slices';
import {
  selectConstructorItems,
  selectConstructorOrderError,
  selectConstructorOrderModalData,
  selectConstructorOrderRequest,
  selectIngredients,
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
  const ingredients = useSelector(selectIngredients);
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

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const dragType = e.dataTransfer.getData('dragType');
    if (dragType === 'constructor') {
      return;
    }

    const ingredientId = e.dataTransfer.getData('ingredientId');
    if (!ingredientId) {
      return;
    }

    const ingredient = ingredients.find((item) => item._id === ingredientId);
    if (!ingredient) {
      return;
    }

    dispatch(addIngredient(ingredient));
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
      handleDrop={handleDrop}
      handleDragOver={handleDragOver}
    />
  );
};
