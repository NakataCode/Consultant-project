import { createSlice } from "@reduxjs/toolkit";

interface RefreshState {
  key: number;
}

const initialState: RefreshState = {
  key: 0,
};

export const refreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    updateRefreshKey: (state) => {
      state.key += 1;
    },
  },
});

export const { updateRefreshKey } = refreshSlice.actions;

export default refreshSlice.reducer;
