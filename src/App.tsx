import React from 'react'
import { StackNavigation } from './navigations/Stack'
import { initiateTimeStorage } from './db/TimeAsyncStorage'
import { initiateMakerSettingStorage } from './db/MakerSettingAsyncStorage'

const App = () => {
  const initiateStorage = async () => {
    await initiateTimeStorage()
    await initiateMakerSettingStorage()
  }

  initiateStorage()

  return <StackNavigation />
}

export default App