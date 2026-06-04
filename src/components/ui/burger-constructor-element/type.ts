import { DragEvent } from 'react';
import { TConstructorIngredient } from '@utils-types';

export type BurgerConstructorElementUIProps = {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  handleClose: () => void;
  handleDragStart: (e: DragEvent<HTMLLIElement>) => void;
  handleDrop: (e: DragEvent<HTMLLIElement>) => void;
  handleDragOver: (e: DragEvent<HTMLLIElement>) => void;
};
