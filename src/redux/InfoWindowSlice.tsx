import {createSlice} from '@reduxjs/toolkit';

export const infoWindowSlice = createSlice({
  name: 'infoWindowOpen',
  initialState: {isInfoWindowOpen: false},
  reducers: {
    setIsInfoWindowOpen: (state, action) => {
      state.isInfoWindowOpen = action.payload;
    },
    toggleInfoWindowOpen: (state) => {
      state.isInfoWindowOpen = !state.isInfoWindowOpen
    }
  },
});

export const {setIsInfoWindowOpen, toggleInfoWindowOpen} = infoWindowSlice.actions;
