import {
    checkUserAuth,
    loginUser,
    setAuthChecked,
    userReducer
  } from './userSlice';
  
  const userPayload = {
    email: 'test@yandex.ru',
    name: 'Тест'
  };
  
  describe('userSlice reducer', () => {
    it('обрабатывает setAuthChecked', () => {
      const state = userReducer(undefined, setAuthChecked(true));
      expect(state.isAuthChecked).toBe(true);
    });
  
    it('обрабатывает checkUserAuth pending/fulfilled/rejected', () => {
      const pendingState = userReducer(undefined, {
        type: checkUserAuth.pending.type
      });
      expect(pendingState.isLoading).toBe(true);
      expect(pendingState.error).toBeNull();
  
      const fulfilledState = userReducer(undefined, {
        type: checkUserAuth.fulfilled.type,
        payload: userPayload
      });
      expect(fulfilledState.user).toEqual(userPayload);
      expect(fulfilledState.isAuthChecked).toBe(true);
      expect(fulfilledState.isLoading).toBe(false);
  
      const rejectedState = userReducer(undefined, {
        type: checkUserAuth.rejected.type,
        payload: 'Ошибка авторизации'
      });
      expect(rejectedState.user).toBeNull();
      expect(rejectedState.isAuthChecked).toBe(true);
      expect(rejectedState.isLoading).toBe(false);
      expect(rejectedState.error).toBe('Ошибка авторизации');
    });
  
    it('обрабатывает loginUser pending/fulfilled/rejected', () => {
      const pendingState = userReducer(undefined, {
        type: loginUser.pending.type
      });
      expect(pendingState.isLoading).toBe(true);
      expect(pendingState.error).toBeNull();
  
      const fulfilledState = userReducer(undefined, {
        type: loginUser.fulfilled.type,
        payload: userPayload
      });
      expect(fulfilledState.user).toEqual(userPayload);
      expect(fulfilledState.isAuthChecked).toBe(true);
      expect(fulfilledState.isLoading).toBe(false);
  
      const rejectedState = userReducer(undefined, {
        type: loginUser.rejected.type,
        payload: 'Ошибка входа'
      });
      expect(rejectedState.isLoading).toBe(false);
      expect(rejectedState.error).toBe('Ошибка входа');
    });
  });
  