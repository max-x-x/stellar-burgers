import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectIngredients = (state: RootState) => state.ingredients.items;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const selectBunIngredients = createSelector(selectIngredients, (items) =>
  items.filter((item) => item.type === 'bun')
);

export const selectMainIngredients = createSelector(
  selectIngredients,
  (items) => items.filter((item) => item.type === 'main')
);

export const selectSauceIngredients = createSelector(
  selectIngredients,
  (items) => items.filter((item) => item.type === 'sauce')
);
