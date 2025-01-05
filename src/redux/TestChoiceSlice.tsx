import { createSlice } from "@reduxjs/toolkit"
import _ from 'lodash'

export const testChangedSlice = createSlice({
  name: 'testChanged',
  initialState: {isTestChanged: false},
  reducers: {
    setIsTestChanged: (state, action) => {
      state.isTestChanged = action.payload
    },
  },
})

export const { setIsTestChanged } = testChangedSlice.actions

let itemIds = []

export const readItemIds = () => {
  const tempList = _.cloneDeep(itemIds)
  return tempList
}

export const testChooser = (node) => {
  _itemIdReset()
  _itemIdAdder(node)
}

const _itemIdReset = () => {
  itemIds = []
}

const _itemIdAdder = (node) => {
  for (const itemId of node.childId) {
    itemIds.push(itemId)
  }

  for (const childNode of node.childCategory) {
    _itemIdAdder(childNode)
  }
}