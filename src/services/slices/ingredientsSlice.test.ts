import { fetchIngredients, ingredientsReducer } from './ingredientsSlice';

describe('ingredientsSlice reducer', () => {
  it('обрабатывает pending', () => {
    const state = ingredientsReducer(undefined, {
      type: fetchIngredients.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fulfilled', () => {
    const payload = [
      {
        _id: 'ingredient-1',
        name: 'Ингредиент',
        type: 'main',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'image',
        image_large: 'image_large',
        image_mobile: 'image_mobile'
      }
    ];

    const state = ingredientsReducer(undefined, {
      type: fetchIngredients.fulfilled.type,
      payload
    });

    expect(state.items).toEqual(payload);
    expect(state.isLoading).toBe(false);
  });

  it('обрабатывает rejected', () => {
    const state = ingredientsReducer(undefined, {
      type: fetchIngredients.rejected.type,
      payload: 'Ошибка загрузки'
    });

    expect(state.error).toBe('Ошибка загрузки');
    expect(state.isLoading).toBe(false);
  });
});
