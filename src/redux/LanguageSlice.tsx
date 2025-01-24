import {createSlice} from '@reduxjs/toolkit';
import { languageIndex, readLanguageSetting, writeLanguageSetting } from '../db/LanguageAsyncStorage';
import { store } from './ReduxStore';

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

export const languageSettingInit = async () => {
  const savedLanguage = await readLanguageSetting();

  store.dispatch(setLanguageData(savedLanguage));
};