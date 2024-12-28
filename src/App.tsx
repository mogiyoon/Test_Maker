import React from 'react'
import { Provider, useDispatch} from 'react-redux'
import { syncReduxWithRealm } from './redux/RealmSlice'
import { StackNavigation } from './navigations/Stack'
import { initiateTimeStorage } from './db/TimeAsyncStorage'
import { initiateMakerSettingStorage } from './db/MakerSettingAsyncStorage'
import { store } from './redux/ReduxStore'
import { setTestTreeInitiate, testTreeInitiate } from './redux/TestTreeSlice'

const App = () => {
  const initiateStorage = async () => {
    await initiateTimeStorage()
    await initiateMakerSettingStorage()
  }

  initiateStorage()
  syncReduxWithRealm()
  testTreeInitiate()

  return (
  <Provider store={store}>
    <StackNavigation />
  </Provider>
)}

export default App