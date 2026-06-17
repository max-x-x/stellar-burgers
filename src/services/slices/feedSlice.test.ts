import { feedReducer, fetchFeed } from './feedSlice';

const feedPayload = {
  orders: [
    {
      _id: 'order-id',
      status: 'done',
      name: 'Заказ',
      createdAt: '2026-06-16T12:00:00.000Z',
      updatedAt: '2026-06-16T12:05:00.000Z',
      number: 10,
      ingredients: ['ingredient-1']
    }
  ],
  total: 10,
  totalToday: 2
};

describe('feedSlice reducer', () => {
  it('обрабатывает pending', () => {
    const state = feedReducer(undefined, { type: fetchFeed.pending.type });

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fulfilled', () => {
    const state = feedReducer(undefined, {
      type: fetchFeed.fulfilled.type,
      payload: feedPayload
    });

    expect(state.orders).toEqual(feedPayload.orders);
    expect(state.total).toBe(feedPayload.total);
    expect(state.totalToday).toBe(feedPayload.totalToday);
    expect(state.isLoading).toBe(false);
  });

  it('обрабатывает rejected', () => {
    const state = feedReducer(undefined, {
      type: fetchFeed.rejected.type,
      payload: 'Ошибка ленты'
    });

    expect(state.error).toBe('Ошибка ленты');
    expect(state.isLoading).toBe(false);
  });
});
