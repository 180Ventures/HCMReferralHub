import { ILead } from '@/utils/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ILeadAdmin {
  data: ILead[];
}
const initialState: ILeadAdmin = {
  data: [],
};

const leadsSlide = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    updateLeadsAdmin(state, action: PayloadAction<ILead[]>) {
      state.data = action.payload;
    },
  },
});

export const { updateLeadsAdmin } = leadsSlide.actions;

export default leadsSlide.reducer;
