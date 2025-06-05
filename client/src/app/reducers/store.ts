import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import modalIssuesSlice from 'src/entities/modal/model/modalIssuesSlice';

export const store = configureStore({
  reducer: {
    modalIssuesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
