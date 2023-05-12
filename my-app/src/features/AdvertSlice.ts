import { AdvertisementData } from "./AdvertFormInputs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdvertisementState {
  advertisements: AdvertisementData[];
}

const initialState: AdvertisementState = {
  advertisements: [],
};

export const advertisementSlice = createSlice({
  name: "advertisement",
  initialState,
  reducers: {
    setAdvertisements: (state, action: PayloadAction<AdvertisementData[]>) => {
      state.advertisements = action.payload;
    },
  },
});

export const { setAdvertisements } = advertisementSlice.actions;

export default advertisementSlice.reducer;
