import { IPortalLead } from '@/utils/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ILeadAdmin {
  data: IPortalLead[];
  refreshLeadData: boolean;
}
const initialState: ILeadAdmin = {
  refreshLeadData: false,
  data: [],
};

const leadsSlide = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    updateLeadsAdmin (state, action: PayloadAction<IPortalLead[]>) {
      state.data = action.payload;
    },
    setRefreshLeadData: (state, action) => {
      state.refreshLeadData = action.payload;
    }
  },
});

export const { updateLeadsAdmin, setRefreshLeadData } = leadsSlide.actions;

export default leadsSlide.reducer;
