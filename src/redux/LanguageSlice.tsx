import {createSlice} from '@reduxjs/toolkit';
import { languageIndex, writeLanguageSetting } from '../db/LanguageAsyncStorage';

export const languageSlice = createSlice({
  name: 'LanguageUpdate',
  initialState: {language: ''},
  reducers: {
    setLanguageData: (state, action) => {
      state.language = action.payload;
      writeLanguageSetting(languageIndex[action.payload])
    },
  },
});

export const { setLanguageData } = languageSlice.actions