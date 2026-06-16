import { TConstructorIngredient, TIngredient } from '@utils-types';
import {
  addIngredient,
  constructorReducer,
  moveIngredient,
  removeIngredient
} from './constructorSlice';

const bun: TIngredient = {
  _id: 'bun-id',
  name: 'Булка',
  type: 'bun',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 100,
  image: 'image',
  image_large: 'image_large',
  image_mobile: 'image_mobile'
};

const fillingA: TConstructorIngredient = {
  ...bun,
  _id: 'main-a',
  name: 'Начинка A',
  type: 'main',
  id: 'filling-a'
};

const fillingB: TConstructorIngredient = {
  ...bun,
  _id: 'main-b',
  name: 'Начинка B',
  type: 'main',
  id: 'filling-b'
};

describe('constructorSlice reducer', () => {
  it('добавляет ингредиент (булку и начинку)', () => {
    const withBun = constructorReducer(undefined, addIngredient(bun));
    expect(withBun.bun).toEqual(bun);

    const withFilling = constructorReducer(withBun, {
      type: addIngredient.type,
      payload: fillingA
    });
    expect(withFilling.ingredients).toEqual([fillingA]);
  });

  it('удаляет ингредиент из начинки', () => {
    const stateWithFillings = {
      ...constructorReducer(undefined, { type: '@@INIT' }),
      ingredients: [fillingA, fillingB]
    };

    const nextState = constructorReducer(
      stateWithFillings,
      removeIngredient('filling-a')
    );

    expect(nextState.ingredients).toEqual([fillingB]);
  });

  it('меняет порядок ингредиентов в начинке', () => {
    const stateWithFillings = {
      ...constructorReducer(undefined, { type: '@@INIT' }),
      ingredients: [fillingA, fillingB]
    };

    const nextState = constructorReducer(
      stateWithFillings,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(nextState.ingredients).toEqual([fillingB, fillingA]);
  });
});
