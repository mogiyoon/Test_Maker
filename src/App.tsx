import React from 'react'
import { StackNavigation } from './navigations/Stack'
import { initiateStorage } from './services/AsyncStorage'

const App = () => {
  initiateStorage()

  return <StackNavigation />
}

export default App