import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, useAppDispatch } from 'src/app/reducers/store';
import { useSelector } from 'react-redux';

export type FiltrationType = {
  status: string | null;
  boardId: number | null;
};

interface FiltrationState {
  search: string;
  filtration: FiltrationType;
}

const initialState: FiltrationState = {
  search: '',
  filtration: {
    status: null,
    boardId: null,
  },
};

const filtrationSlice = createSlice({
  name: 'filtration',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<string>) {
      state.filtration.status = action.payload;
    },
    setBoardId(state, action: PayloadAction<number>) {
      state.filtration.boardId = action.payload;
    },

    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export default filtrationSlice.reducer;

export const useFiltrationState = () => useSelector((state: RootState) => state.filtrationSlice);

export const useFiltrationActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(filtrationSlice.actions, dispatch);
};
