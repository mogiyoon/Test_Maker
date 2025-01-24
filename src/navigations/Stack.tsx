import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {HomeScreen} from './HomeScreen';
import {MakerTabNavigation, TestTabNavigation} from './Tab';
import { useSelector } from 'react-redux';
import { getLanguageSet } from '../services/LanguageSet';

const Stack = createStackNavigator();

export const StackNavigation = () => {
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={languageSet.Home}>
        <Stack.Screen name={languageSet.Home} component={HomeScreen} />
        <Stack.Screen name={languageSet.Test} component={TestTabNavigation} />
        <Stack.Screen name={languageSet.Maker} component={MakerTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
