import React from 'react'
import styled from 'styled-components/native'
import TabNavigation from './navigations/Tab'
import { NavigationContainer } from '@react-navigation/native'

const Container = styled.View`
  justify-content: center;
  align-items: center;
`

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  )
}

export default App