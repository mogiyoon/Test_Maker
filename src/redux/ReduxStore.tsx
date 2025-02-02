import {configureStore} from '@reduxjs/toolkit';
import {testRealmSlice, wrongAnswerRealmSlice} from './RealmSlice';
import {
  contentChangedSlice,
  contentSlice,
} from './ContentsSlice';
import {
  meanFindSlice,
  wordFindSlice,
  wordInsideMeanSlice,
} from './MakerSettingSlice';
import { languageSlice } from './LanguageSlice';
import { exportNumSlice, showCommentarySlice, showExportNumSlice, showRightOnlySlice } from './TestSettingSlice';
import { testChangedSlice } from './TestChoiceSlice';
import { adTimeSlice } from './TimeSlice';
import { infoWindowSlice } from './InfoWindowSlice';

export const store = configureStore({
  reducer: {
    language: languageSlice.reducer,

    testRealm: testRealmSlice.reducer,
    wrongAnswerRealm: wrongAnswerRealmSlice.reducer,

    content: contentSlice.reducer,
    contentChanged: contentChangedSlice.reducer,

    testChanged: testChangedSlice.reducer,

    //Maker Setting
    wordInsideMean: wordInsideMeanSlice.reducer,
    wordFind: wordFindSlice.reducer,
    meanFind: meanFindSlice.reducer,

    //Test Setting
    exportNum: exportNumSlice.reducer,
    showExportNum: showExportNumSlice.reducer,
    showCommentary: showCommentarySlice.reducer,
    showRightOnly: showRightOnlySlice.reducer,

    //Ad setting
    adTime: adTimeSlice.reducer,

    //Info setting
    infoWindow: infoWindowSlice.reducer,
  },
});
