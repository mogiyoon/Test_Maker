import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { MyTest } from './makerTabScreen/MyTest'
import { CameraScreen } from './makerTabScreen/Camera'
import { FileIndex } from './makerTabScreen/FileIndex'
import { Edit } from './makerTabScreen/Edit'
import { MakerSetting } from './makerTabScreen/MakerSetting'
import { TextBox } from './makerTabScreen/TextBox'
import { TestSpace } from './testTabScreen/TestSpace'
import { WrongAnswer } from './testTabScreen/WrongAnswer'
import { TestSetting } from './testTabScreen/TestSetting'
import { ContentsProvider } from '../context/Contents'


const MakerTab = createBottomTabNavigator()
const TestTab = createBottomTabNavigator()

export const MakerTabNavigation = ({navigation}) => {
  return (
    <ContentsProvider>
      <MakerTab.Navigator
        initialRouteName="MyTest"
        screenOptions={{headerShown: false}}
        backBehavior='order'>
        <MakerTab.Screen name="MyTest" component={MyTest} />
        <MakerTab.Screen name="Camera" component={CameraScreen} />
        <MakerTab.Screen name="File" component={FileIndex} />
        <MakerTab.Screen name="TextBox" component={TextBox} />
        <MakerTab.Screen name="Edit" component={Edit} />
        <MakerTab.Screen name="Setting" component={MakerSetting} />
      </MakerTab.Navigator>
    </ContentsProvider>
  )
}

export const TestTabNavigation = ({navigation}) => {
  return (
    <TestTab.Navigator
      initialRouteName='Test Space'
      screenOptions={{headerShown: false}}
      backBehavior='order'>
      <TestTab.Screen name="Test Space" component={TestSpace} />
      <TestTab.Screen name="Wrong Answer" component={WrongAnswer} />
      <TestTab.Screen name="Setting" component={TestSetting} />
    </TestTab.Navigator>
  )
}