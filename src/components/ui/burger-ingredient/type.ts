import { DragEvent } from 'react';
import { Location } from 'react-router-dom';
import { TIngredient } from '@utils-types';

export type TBurgerIngredientUIProps = {
  ingredient: TIngredient;
  count: number;
  locationState: { background: Location };
  handleAdd: () => void;
  handleDragStart: (e: DragEvent<HTMLLIElement>) => void;
};
