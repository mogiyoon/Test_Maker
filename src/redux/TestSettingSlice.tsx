import {createSlice} from '@reduxjs/toolkit';
import {
  readTestSetting,
  writeTestSetting,
} from '../db/TestSettingAsyncStorage';
import {store} from './ReduxStore';

export const exportNumSlice = createSlice({
  name: 'exportNum',
  initialState: {exportNum: 0},
  reducers: {
    setExportNum: (state, action) => {
      const payloadToNum = parseInt(action.payload, 10)
      state.exportNum = payloadToNum
      const numToStringValue = String(action.payload)
      writeTestSetting('exportNum', numToStringValue);
    },
  },
});

export const showExportNumSlice = createSlice({
  name: 'showExportNum',
  initialState: {showExportNum: ''},
  reducers: {
    setShowExportNum: (state, action) => {
      const tempValue = action.payload;
      state.showExportNum = tempValue;
      const tempStringValue = String(tempValue);
      writeTestSetting('showExportNum', tempStringValue);
    },
  },
});

export const showCommentarySlice = createSlice({
  name: 'showCommentary',
  initialState: {showCommentary: ''},
  reducers: {
    setShowCommentary: (state, action) => {
      const tempValue = action.payload;
      state.showCommentary = tempValue;
      const tempStringValue = String(tempValue);
      writeTestSetting('showCommentary', tempStringValue);
    },
  },
});


export const { setExportNum } = exportNumSlice.actions;
export const { setShowExportNum} = showExportNumSlice.actions;
export const { setShowCommentary } = showCommentarySlice.actions;

export const testSettingInit = async () => {
  const tempExportNum = await readTestSetting('exportNum');
  const exportNum = parseInt(tempExportNum, 10)
  const tempShowExportNum = await readTestSetting('showExportNum')
  const showExportNum = tempShowExportNum === 'true';
  const tempShowCommentary = await readTestSetting('showCommentary')
  const showCommentary = tempShowCommentary === 'true';

  store.dispatch(setExportNum(exportNum));
  store.dispatch(setShowExportNum(showExportNum))
  store.dispatch(setShowCommentary(showCommentary))
};
