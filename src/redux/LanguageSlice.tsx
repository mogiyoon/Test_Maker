import {createSlice} from '@reduxjs/toolkit';
import { languageIndex, readLanguageSetting, writeLanguageSetting } from '../repository/LanguageAsyncStorage';
import { store } from './ReduxStore';
import { setMainLanguage, testTreeInitiate } from '../repository/TestTree';

export const languageSlice = createSlice({
  name: 'LanguageUpdate',
  initialState: {language: ''},
  reducers: {
    setLanguageData: (state, action) => {
      state.language = action.payload;
      setMainLanguage(action.payload);
      testTreeInitiate();
      writeLanguageSetting(languageIndex[action.payload])
    },
  },
});

export const { setLanguageData } = languageSlice.actions

export const languageSettingInit = async () => {
  const savedLanguage = await readLanguageSetting();

  store.dispatch(setLanguageData(savedLanguage));
};