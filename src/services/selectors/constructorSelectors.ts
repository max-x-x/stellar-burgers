import { RootState } from '../store';

export const selectConstructorItems = (state: RootState) =>
  state.constructorBurger;
export const selectConstructorOrderRequest = (state: RootState) =>
  state.constructorBurger.orderRequest;
export const selectConstructorOrderModalData = (state: RootState) =>
  state.constructorBurger.orderModalData;
export const selectConstructorOrderError = (state: RootState) =>
  state.constructorBurger.orderError;
