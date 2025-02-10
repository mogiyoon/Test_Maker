import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';
import { TestTreeCategory } from '../db/TestTree';

export const testChangedSlice = createSlice({
  name: 'testChanged',
  initialState: {isTestChanged: false},
  reducers: {
    setIsTestChanged: (state, action) => {
      state.isTestChanged = action.payload;
    },
  },
});

export const {setIsTestChanged} = testChangedSlice.actions;

let itemIds : string[] = [];

export const readItemIds = () => {
  const tempList = _.cloneDeep(itemIds);
  return tempList;
};

export const testChooser = (node : TestTreeCategory) => {
  itemIdReset();
  _itemIdAdder(node);
};

export const itemIdReset = () => {
  itemIds = [];
};

const _itemIdAdder = (node : TestTreeCategory) => {
  for (const itemId of node.childId) {
    itemIds.push(itemId);
  }

  for (const childNode of node.childCategory) {
    _itemIdAdder(childNode);
  }
};
