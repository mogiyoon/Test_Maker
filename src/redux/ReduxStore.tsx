import {configureStore} from '@reduxjs/toolkit';
import {testRealmSlice, wrongAnswerRealmSlice} from './RealmSlice';
import {
  contentChangedSlice,
  contentSlice,
  usingOCRSlice,
} from './ContentsSlice';
import {
  meanFindSlice,
  wordFindSlice,
  wordInsideMeanSlice,
} from './MakerSettingSlice';
import {testChangedSlice} from './TestChoiceSlice';
import { languageSlice } from './LanguageSlice';

export const store = configureStore({
  reducer: {
    language: languageSlice.reducer,

    testRealm: testRealmSlice.reducer,
    wrongAnswerRealm: wrongAnswerRealmSlice.reducer,

    content: contentSlice.reducer,
    contentChanged: contentChangedSlice.reducer,
    usingOCR: usingOCRSlice.reducer,

    testChanged: testChangedSlice.reducer,
    wordInsideMean: wordInsideMeanSlice.reducer,
    wordFind: wordFindSlice.reducer,
    meanFind: meanFindSlice.reducer,
  },
});
