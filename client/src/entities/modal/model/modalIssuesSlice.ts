import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, useAppDispatch } from 'src/app/reducers/store';
import { useSelector } from 'react-redux';

interface ModalIssuesState {
  isOpen: boolean;
  type: 'create' | 'view' | null;
  taskId: string | null;
}

const initialState: ModalIssuesState = {
  isOpen: false,
  type: null,
  taskId: null,
};

const modalIssuesSlice = createSlice({
  name: 'modalIssues',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<{ type: 'create' | 'view'; taskId?: string }>) {
      state.isOpen = true;
      state.type = action.payload.type;
      state.taskId = action.payload.taskId || null;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
      state.taskId = null;
    },
  },
});

export default modalIssuesSlice.reducer;

export const useModalIssuesState = () => useSelector((state: RootState) => state.modalIssuesSlice);

export const useModalIssuesActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(modalIssuesSlice.actions, dispatch);
};
