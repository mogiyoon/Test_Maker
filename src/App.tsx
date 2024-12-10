import React from 'react'
import { StackNavigation } from './navigations/Stack'
import { initiateTimeStorage } from './db/TimeAsyncStorage'

const App = () => {
  initiateTimeStorage()

  return <StackNavigation />
}

export default App