import { fetchProfileOrders, profileOrdersReducer } from './profileOrdersSlice';
import { logoutUser } from './userSlice';

const ordersPayload = [
  {
    _id: 'profile-order-id',
    status: 'done',
    name: 'Мой заказ',
    createdAt: '2026-06-16T12:00:00.000Z',
    updatedAt: '2026-06-16T12:05:00.000Z',
    number: 321,
    ingredients: ['ingredient-1']
  }
];

describe('profileOrdersSlice reducer', () => {
  it('обрабатывает pending', () => {
    const state = profileOrdersReducer(undefined, {
      type: fetchProfileOrders.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fulfilled', () => {
    const state = profileOrdersReducer(undefined, {
      type: fetchProfileOrders.fulfilled.type,
      payload: ordersPayload
    });

    expect(state.orders).toEqual(ordersPayload);
    expect(state.isLoading).toBe(false);
  });

  it('обрабатывает rejected', () => {
    const state = profileOrdersReducer(undefined, {
      type: fetchProfileOrders.rejected.type,
      payload: 'Ошибка загрузки заказов'
    });

    expect(state.error).toBe('Ошибка загрузки заказов');
    expect(state.isLoading).toBe(false);
  });

  it('сбрасывает состояние при logoutUser.fulfilled', () => {
    const filledState = profileOrdersReducer(undefined, {
      type: fetchProfileOrders.fulfilled.type,
      payload: ordersPayload
    });

    const resetState = profileOrdersReducer(filledState, {
      type: logoutUser.fulfilled.type
    });

    expect(resetState).toEqual({
      orders: [],
      isLoading: false,
      error: null
    });
  });
});
