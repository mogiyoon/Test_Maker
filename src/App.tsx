import React from 'react'
import { StackNavigation } from './navigations/Stack'
import { initiateStorage } from './db/TimeAsyncStorage'

const App = () => {
  initiateStorage()

  return <StackNavigation />
}

export default App