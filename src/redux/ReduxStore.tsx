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
import { languageSlice } from './LanguageSlice';
import { exportNumSlice, showExportNumSlice } from './TestSettingSlice';
import { testChangedSlice } from './TestChoiceSlice';

export const store = configureStore({
  reducer: {
    language: languageSlice.reducer,

    testRealm: testRealmSlice.reducer,
    wrongAnswerRealm: wrongAnswerRealmSlice.reducer,

    content: contentSlice.reducer,
    contentChanged: contentChangedSlice.reducer,
    usingOCR: usingOCRSlice.reducer,

    testChanged: testChangedSlice.reducer,

    //Maker Setting
    wordInsideMean: wordInsideMeanSlice.reducer,
    wordFind: wordFindSlice.reducer,
    meanFind: meanFindSlice.reducer,

    //Test Setting
    exportNum: exportNumSlice.reducer,
    showExportNum: showExportNumSlice.reducer,
  },
});
