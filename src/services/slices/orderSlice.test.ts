import { fetchOrderByNumber, orderReducer } from './orderSlice';

const orderPayload = {
  _id: 'order-id',
  status: 'done',
  name: 'Тестовый заказ',
  createdAt: '2026-06-16T12:00:00.000Z',
  updatedAt: '2026-06-16T12:05:00.000Z',
  number: 123,
  ingredients: ['ingredient-1']
};

describe('orderSlice reducer', () => {
  it('обрабатывает pending', () => {
    const state = orderReducer(undefined, {
      type: fetchOrderByNumber.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fulfilled', () => {
    const state = orderReducer(undefined, {
      type: fetchOrderByNumber.fulfilled.type,
      payload: orderPayload
    });

    expect(state.currentOrder).toEqual(orderPayload);
    expect(state.isLoading).toBe(false);
  });

  it('обрабатывает rejected', () => {
    const state = orderReducer(undefined, {
      type: fetchOrderByNumber.rejected.type,
      payload: 'Заказ не найден'
    });

    expect(state.currentOrder).toBeNull();
    expect(state.error).toBe('Заказ не найден');
    expect(state.isLoading).toBe(false);
  });
});
