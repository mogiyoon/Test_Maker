import {createSlice} from '@reduxjs/toolkit';

export const contentSlice = createSlice({
  name: 'contentUpdate',
  initialState: {contentData: ''},
  reducers: {
    setContentData: (state, action) => {
      state.contentData = action.payload;
    },
  },
});

export const contentChangedSlice = createSlice({
  name: 'contentChanged',
  initialState: {isChanged: false},
  reducers: {
    setIsChanged: (state, action) => {
      state.isChanged = action.payload;
    },
  },
});

export const {setContentData} = contentSlice.actions;
export const {setIsChanged} = contentChangedSlice.actions;
