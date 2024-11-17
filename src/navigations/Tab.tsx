import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { MyTest } from './TabScreen/MyTest'
import { Camera } from './TabScreen/Camera'
import { FileIndex } from './TabScreen/FileIndex'
import { Edit } from './TabScreen/Edit'
import { Setting } from './TabScreen/Setting'


const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="MyTest"
      screenOptions={{headerTitle: "Test Maker"}}>
      <Tab.Screen name="MyTest" component={MyTest} />
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen name="File" component={FileIndex} />
      <Tab.Screen name="Edit" component={Edit} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  )
}

export default TabNavigation