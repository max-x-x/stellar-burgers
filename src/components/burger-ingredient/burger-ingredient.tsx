import { DragEvent, FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { addIngredient } from '@slices';

import { BurgerIngredientUI } from '@ui';
import { useDispatch } from '../../services/store';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    const handleDragStart = (e: DragEvent<HTMLLIElement>) => {
      e.dataTransfer.setData('dragType', 'ingredient');
      e.dataTransfer.setData('ingredientId', ingredient._id);
      e.dataTransfer.effectAllowed = 'copy';
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
        handleDragStart={handleDragStart}
      />
    );
  }
);
