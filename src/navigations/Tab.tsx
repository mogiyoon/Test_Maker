import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Camera, Edit, FileIndex, MyTest, Setting } from './TabScreen'

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MyTest" component={MyTest} />
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen name="FileIndex" component={FileIndex} />
      <Tab.Screen name="Edit" component={Edit} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  )
}

export default TabNavigation