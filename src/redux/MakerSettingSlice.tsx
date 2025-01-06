import { createSlice } from "@reduxjs/toolkit";
import { readMakerSetting, writeMakerSetting } from "../db/MakerSettingAsyncStorage";
import { store } from "./ReduxStore";

export const makerSettingChangeSlice = createSlice({
  name: 'makerSettingChange',
  initialState: {isMakerSettingChanged: false},
  reducers: {
    setIsMakerSettingChanged: (state, action) => {
      state.isMakerSettingChanged = action.payload
    }
  }
})

export const wordInsideMeanSlice = createSlice({
  name: 'wordInsideMean',
  initialState: {wordInsideMean: false},
  reducers: {
    setWordInsideMean: (state, action) => {
      const tempValue = action.payload
      state.wordInsideMean = tempValue
      const tempStringValue = String(tempValue)
      writeMakerSetting('wordInsideMean', tempStringValue)
    }
  }
})

export const wordFindSlice = createSlice({
  name: 'wordFind',
  initialState: {wordFind: ''},
  reducers: {
    setWordFind: (state, action) => {
      state.wordFind = action.payload
      writeMakerSetting('name', action.payload)
    }
  }
})

export const meanFindSlice = createSlice({
  name: 'meanFind',
  initialState: {meanFind: ''},
  reducers: {
    setMeanFind: (state, action) => {
      state.meanFind = action.payload
      writeMakerSetting('mean', action.payload)
    }
  }
})

export const { setWordInsideMean } = wordInsideMeanSlice.actions
export const { setWordFind } = wordFindSlice.actions
export const { setMeanFind } = meanFindSlice.actions

export const makerSettingInit = async () => {
  const tempWordInsideMean = await readMakerSetting('wordInsideMean')
  const wordInsideMean = (tempWordInsideMean === 'true')
  const wordFind = await readMakerSetting('name')
  const meanFind = await readMakerSetting('mean')

  store.dispatch(setWordInsideMean(wordInsideMean))
  store.dispatch(setWordFind(wordFind))
  store.dispatch(setMeanFind(meanFind))
}