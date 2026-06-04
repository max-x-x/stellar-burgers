import { DragEvent, FC, memo } from 'react';
import { moveIngredient, removeIngredient } from '@slices';

import { useDispatch } from '../../services/store';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(moveIngredient({ fromIndex: index, toIndex: index + 1 }));
    };

    const handleMoveUp = () => {
      dispatch(moveIngredient({ fromIndex: index, toIndex: index - 1 }));
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    const handleDragStart = (e: DragEvent<HTMLLIElement>) => {
      e.dataTransfer.setData('dragType', 'constructor');
      e.dataTransfer.setData('constructorIndex', index.toString());
      e.dataTransfer.effectAllowed = 'move';
    };

    const handleDrop = (e: DragEvent<HTMLLIElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fromIndex = Number(e.dataTransfer.getData('constructorIndex'));
      if (Number.isNaN(fromIndex) || fromIndex === index) {
        return;
      }

      dispatch(moveIngredient({ fromIndex, toIndex: index }));
    };

    const handleDragOver = (e: DragEvent<HTMLLIElement>) => {
      e.preventDefault();
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
      />
    );
  }
);
