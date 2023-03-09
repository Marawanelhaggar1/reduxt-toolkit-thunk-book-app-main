import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
  name: "report",
  initialState: { logs: [] },
  reducers: {
    loginsert: (state, action) => {
      state.logs.push(action.payload);
    },
  },
});

export const { loginsert } = reportSlice.actions;

export default reportSlice.reducer;
