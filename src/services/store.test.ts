import { rootReducer } from './store';
import {
  constructorReducer,
  feedReducer,
  ingredientsReducer,
  orderReducer,
  profileOrdersReducer,
  userReducer
} from '@slices';

describe('rootReducer', () => {
  it('инициализирует стор корректным начальным состоянием', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);

    expect(state).toEqual({
      constructorBurger: constructorReducer(undefined, initAction),
      ingredients: ingredientsReducer(undefined, initAction),
      feed: feedReducer(undefined, initAction),
      order: orderReducer(undefined, initAction),
      profileOrders: profileOrdersReducer(undefined, initAction),
      user: userReducer(undefined, initAction)
    });
  });

  it('обрабатывает неизвестный экшен корректно', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, unknownAction);

    expect(state).toEqual({
      constructorBurger: constructorReducer(undefined, unknownAction),
      ingredients: ingredientsReducer(undefined, unknownAction),
      feed: feedReducer(undefined, unknownAction),
      order: orderReducer(undefined, unknownAction),
      profileOrders: profileOrdersReducer(undefined, unknownAction),
      user: userReducer(undefined, unknownAction)
    });
  });
});
