import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {HomeScreen} from './HomeScreen';
import {MakerTabNavigation, TestTabNavigation} from './Tab';
import { useSelector } from 'react-redux';
import { getLanguageSet } from '../services/LanguageSet';
import { OpenSourceLicense } from './OpenSourceLicense';

const Stack = createStackNavigator();

export const StackNavigation = () => {
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  //TODO Navigation별 설명넣기
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={languageSet.Home}>
        <Stack.Screen name={languageSet.Home} component={HomeScreen} />
        <Stack.Screen name={languageSet.Test} component={TestTabNavigation} />
        <Stack.Screen name={languageSet.Maker} component={MakerTabNavigation} />
        <Stack.Screen name={languageSet.OpenSourceLicenses} component={OpenSourceLicense} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
