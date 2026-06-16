import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  constructorReducer,
  feedReducer,
  ingredientsReducer,
  orderReducer,
  profileOrdersReducer,
  userReducer
} from '@slices';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  constructorBurger: constructorReducer,
  ingredients: ingredientsReducer,
  feed: feedReducer,
  order: orderReducer,
  profileOrders: profileOrdersReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
