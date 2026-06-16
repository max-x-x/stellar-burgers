import { rootReducer } from './store';

describe('rootReducer', () => {
  it('инициализирует стор корректным начальным состоянием', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      constructorBurger: {
        bun: null,
        ingredients: [],
        orderRequest: false,
        orderModalData: null,
        orderError: null
      },
      ingredients: {
        items: [],
        isLoading: false,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      },
      order: {
        currentOrder: null,
        isLoading: false,
        error: null
      },
      profileOrders: {
        orders: [],
        isLoading: false,
        error: null
      },
      user: {
        user: null,
        isAuthChecked: false,
        isLoading: false,
        error: null
      }
    });
  });
});
