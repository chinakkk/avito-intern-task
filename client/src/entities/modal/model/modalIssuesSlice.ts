import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, useAppDispatch } from 'src/app/reducers/store';
import { useSelector } from 'react-redux';
import { IssueType } from 'src/entities/issue/model/types/issueTypes';

interface ModalIssuesState {
  isOpen: boolean;
  type: 'create' | 'view' | null;
  selectedIssue: IssueType | null;
}

const initialState: ModalIssuesState = {
  isOpen: false,
  type: null,
  selectedIssue: null,
};

const modalIssuesSlice = createSlice({
  name: 'modalIssues',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<{ type: 'create' | 'view'; issue?: IssueType }>) {
      state.isOpen = true;
      state.type = action.payload.type;
      state.selectedIssue = action.payload.issue || null;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
      state.selectedIssue = null;
    },
  },
});

export default modalIssuesSlice.reducer;

export const useModalIssuesState = () => useSelector((state: RootState) => state.modalIssuesSlice);

export const useModalIssuesActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(modalIssuesSlice.actions, dispatch);
};
