import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {HomeScreen} from './HomeScreen';
import {MakerTabNavigation, TestTabNavigation} from './Tab';

const Stack = createStackNavigator();

export const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Test" component={TestTabNavigation} />
        <Stack.Screen name="Maker" component={MakerTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
