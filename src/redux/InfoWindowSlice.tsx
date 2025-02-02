import {createSlice} from '@reduxjs/toolkit';

export const infoWindowSlice = createSlice({
  name: 'infoWindowOpen',
  initialState: {isInfoWindowOpen: false},
  reducers: {
    setIsInfoWindowOpen: (state, action) => {
      state.isInfoWindowOpen = action.payload;
    },
  },
});

export const {setIsInfoWindowOpen} = infoWindowSlice.actions;
