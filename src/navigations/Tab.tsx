import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {MyTest} from './makerTabScreen/MyTest';
import {CameraScreen} from './makerTabScreen/Camera';
import {FileIndex} from './makerTabScreen/FileIndex';
import {Edit} from './makerTabScreen/Edit';
import {MakerSetting} from './makerTabScreen/MakerSetting';
import {TextBox} from './makerTabScreen/TextBox';
import {TestSpace} from './testTabScreen/TestSpace';
import {WrongAnswer} from './testTabScreen/WrongAnswer';
import {TestSetting} from './testTabScreen/TestSetting';
import {Testing} from './testTabScreen/Testing';
import {ExportTab} from './testTabScreen/ExportTab';
import { useSelector } from 'react-redux';
import { getLanguageSet } from '../services/LanguageSet';

const MakerTab = createBottomTabNavigator();
const TestTab = createBottomTabNavigator();

export const TestTabNavigation = ({navigation}) => {
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  return (
    <TestTab.Navigator
      initialRouteName={languageSet.TestSpace}
      screenOptions={{headerShown: false}}
      backBehavior="order">
      <TestTab.Screen name={languageSet.TestSpace} component={TestSpace} />
      <TestTab.Screen name={languageSet.Testing} component={Testing} />
      <TestTab.Screen name={languageSet.WrongAnswer} component={WrongAnswer} />
      <TestTab.Screen name={languageSet.Export} component={ExportTab} />
      <TestTab.Screen name={languageSet.Setting} component={TestSetting} />
    </TestTab.Navigator>
  );
};

export const MakerTabNavigation = ({navigation}) => {
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  return (
    <MakerTab.Navigator
      initialRouteName={languageSet.MyTest}
      screenOptions={{headerShown: false}}
      backBehavior="order">
      <MakerTab.Screen name={languageSet.MyTest} component={MyTest} />
      <MakerTab.Screen name={languageSet.Camera} component={CameraScreen} />
      <MakerTab.Screen name={languageSet.File} component={FileIndex} />
      <MakerTab.Screen name={languageSet.TextBox} component={TextBox} />
      <MakerTab.Screen name={languageSet.Edit} component={Edit} />
      <MakerTab.Screen name={languageSet.Setting} component={MakerSetting} />
    </MakerTab.Navigator>
  );
};
