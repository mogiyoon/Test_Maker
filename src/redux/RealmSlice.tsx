import { createSlice } from "@reduxjs/toolkit"
import { testRealm } from "../db/MyTestDB"
import { store } from "./ReduxStore"

export const realmSlice = createSlice({
  name: 'realmUpdate',
  initialState: {realmData: []},
  reducers: {
    setRealmData: (state, action) => {
      state.realmData = action.payload
    },
    addRealmData: (state, action) => {
      state.realmData.push(action.payload)
      testRealm.write(() => {
        testRealm.create('MyTest', action.payload)
      })
    },
    removeRealmData: (state, action) => {
      const {id, word} = action.payload
      state.realmData = state.realmData.filter((item) => 
        !(item.id === id && item.word === word))
      testRealm.write(() => {
        const dataToDelete = testRealm.objects('MyTest').filtered(`word == "${word}" AND id == "${id}"`)
        testRealm.delete(dataToDelete)
      })
    }
  }
})

export const { setRealmData, addRealmData, removeRealmData } = realmSlice.actions

export const syncReduxWithRealm = () => {
  const myTest = testRealm.objects('MyTest')
  const refinedMyTest = myTest.toJSON()
  store.dispatch(setRealmData(refinedMyTest))
}