import { IPortalLead } from '@/utils/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ILeadAdmin {
  data: IPortalLead[];
}
const initialState: ILeadAdmin = {
  data: [],
};

const leadsSlide = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    updateLeadsAdmin (state, action: PayloadAction<IPortalLead[]>) {
      state.data = action.payload;
    },
  },
});

export const { updateLeadsAdmin } = leadsSlide.actions;

export default leadsSlide.reducer;
