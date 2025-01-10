import {createSlice} from '@reduxjs/toolkit';
import {testMakerRealm} from '../db/TestMakerDB';
import {store} from './ReduxStore';
import _ from 'lodash';
import {Heap} from 'heap-js'

export const testRealmSlice = createSlice({
  name: 'myTestRealmUpdate',
  initialState: {realmData: []},
  reducers: {
    setTestRealmData: (state, action) => {
      state.realmData = action.payload;
    },
    addTestRealmData: (state, action) => {
      state.realmData.push(action.payload);
      testMakerRealm.write(() => {
        testMakerRealm.create('MyTest', action.payload);
      });
    },
    removeTestRealmData: (state, action) => {
      const {id, word} = action.payload;
      state.realmData = state.realmData.filter(
        item => !(item.id === id && item.word === word),
      );
      testMakerRealm.write(() => {
        const dataToDelete = testMakerRealm
          .objects('MyTest')
          .filtered(`word == "${word}" AND id == "${id}"`);
        testMakerRealm.delete(dataToDelete);
      });
    },
  },
});

export const {setTestRealmData, addTestRealmData, removeTestRealmData} =
  testRealmSlice.actions;

export const wrongAnswerRealmSlice = createSlice({
  name: 'wrongAnswerRealmUpdate',
  initialState: {realmData: []},
  reducers: {
    setWrongAnswerRealmData: (state, action) => {
      state.realmData = action.payload;
    },
    addWrongAnswerRealmData: (state, action) => {
      const tempValue = _.cloneDeep(action.payload);
      tempValue.wrongNumber = 1;

      const existingItem = state.realmData.find(
        item => item.id === tempValue.id,
      );
      if (existingItem) {
        existingItem.wrongNumber += 1;
        customHeapInit(state.realmData)
        state.realmData = customHeapToList()
        testMakerRealm.write(() => {
          const testMakerValue = testMakerRealm
            .objects('WrongAnswer')
            .filtered(
              `word == "${tempValue.word}" AND id == "${tempValue.id}"`,
            );
          testMakerValue[0].wrongNumber += 1;
        });
      } else {
        state.realmData.push(tempValue);
        testMakerRealm.write(() => {
          testMakerRealm.create('WrongAnswer', tempValue);
        });
      }
    },
    removeWrongAnswerRealmData: (state, action) => {
      const {id, word} = action.payload;
      const tempData = state.realmData.filter(
        item => !(item.id === id && item.word === word),
      );
      customHeapInit(tempData)
      state.realmData = customHeapToList()
      testMakerRealm.write(() => {
        const dataToDelete = testMakerRealm
          .objects('WrongAnswer')
          .filtered(`word == "${word}" AND id == "${id}"`);
        testMakerRealm.delete(dataToDelete);
      });
    },
  },
});

export const {
  setWrongAnswerRealmData,
  addWrongAnswerRealmData,
  removeWrongAnswerRealmData,
} = wrongAnswerRealmSlice.actions;

export const syncReduxWithRealm = () => {
  const myTest = testMakerRealm.objects('MyTest');
  const refinedMyTest = myTest.toJSON();
  store.dispatch(setTestRealmData(refinedMyTest));

  const wrongAnswer = testMakerRealm.objects('WrongAnswer');
  const refinedWrongAnswer = wrongAnswer.toJSON();
  customHeapInit(refinedWrongAnswer)
  const HeapedList = customHeapToList()
  store.dispatch(setWrongAnswerRealmData(HeapedList));
};

const customWrongNumberComparator = (a, b) => b.wrongNumber - a.wrongNumber
const customHeap = new Heap(customWrongNumberComparator)
const customHeapInit = (inputList) => {
  customHeap.init(inputList)
}
const customHeapPush = (inputData) => {
  customHeap.push(inputData)
}
const customHeapToList = () => {
  const tempList = []
  for (const data of customHeap) {
    tempList.push(data)
  }
  return tempList
}