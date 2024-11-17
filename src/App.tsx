import React from 'react'
import styled from 'styled-components/native'
import TabNavigation from './navigations/Tab'
import { NavigationContainer } from '@react-navigation/native'
import { PERMISSIONS, requestMultiple } from 'react-native-permissions'
import { Platform } from 'react-native'

const Container = styled.View`
  justify-content: center;
  align-items: center;
`

requestMultiple(Platform.OS === 'ios' ?
  [PERMISSIONS.IOS.CAMERA]
  :
  [PERMISSIONS.ANDROID.CAMERA])
  .then((result) => {
    console.log(result)
  });

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  )
}

export default App