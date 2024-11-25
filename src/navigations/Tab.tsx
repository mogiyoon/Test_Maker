import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { MyTest } from './TabScreen/MyTest'
import { CameraScreen } from './TabScreen/Camera'
import { FileIndex } from './TabScreen/FileIndex'
import { Edit } from './TabScreen/Edit'
import { Setting } from './TabScreen/Setting'
import { TextBox } from './TabScreen/TextBox'
import { ContentsProvider } from '../context/Contents'


const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return (
  <ContentsProvider>
    <Tab.Navigator
      initialRouteName="MyTest"
      screenOptions={{headerTitle: "Test Maker"}}
      backBehavior='order'>
      <Tab.Screen name="MyTest" component={MyTest} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="File" component={FileIndex} />
      <Tab.Screen name="TextBox" component={TextBox} />
      <Tab.Screen name="Edit" component={Edit} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
   </ContentsProvider>
  )
}

export default TabNavigation