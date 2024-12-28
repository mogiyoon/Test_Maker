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
      console.log('addRealmData')
      console.log(state)
      console.log(action)
    },
    removeRealmData: (state, action) => {
      console.log('remove')
      console.log(state)
      console.log(action)
      const {id, word} = action.payload
      console.log(id)
      console.log(word)
      state.realmData.filter((item) => 
        item.id !== id && item.word !== word) // TODO 테스트 확인
      console.log(state)
    }
  }
})

export const { setRealmData, addRealmData, removeRealmData } = realmSlice.actions

export const syncReduxWithRealm = () => {
  const myTest = testRealm.objects('MyTest')
  const refinedMyTest = myTest.toJSON()
  store.dispatch(setRealmData(Array.from(refinedMyTest)))
}