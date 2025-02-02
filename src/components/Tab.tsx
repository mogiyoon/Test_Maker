import React from 'react'
import styled from 'styled-components/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationProp, NavigationState, ParamListBase, RouteProp, useNavigation } from '@react-navigation/native';
import { getLanguageSet, wordList } from '../services/LanguageSet';
import { useSelector } from 'react-redux';

const IconContainer = styled.TouchableOpacity`
  margin: 0px 10px;
`

interface TabNavigatorHomeIconProps {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, "getState"> & {
    getState(): NavigationState | undefined;
  },
}

export const TabNavigatorHomeIcon = ({navigation} : TabNavigatorHomeIconProps) => {
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  const onPressFunction = () => {
    navigation.navigate(languageSet.Home)
  }

  return (
    <IconContainer
      onPress={onPressFunction}
    >
      <Ionicons name={'home-outline'} size={30} color={'skyblue'} />
    </IconContainer>
  );
};

interface TabNavigatorInfoIconProps {
  callbackFunction?: () => void
}

export const TabNavigatorInfoIcon = ({callbackFunction = () => {}} : TabNavigatorInfoIconProps) => {

  return (
    <IconContainer
      onPress={callbackFunction}
    >
      <Ionicons name={'information-circle-outline'} size={30} color={'skyblue'} />
    </IconContainer>
  );
};

export const TestTabIconName = (
  route: RouteProp<ParamListBase, string>, 
  focused: boolean, 
  languageSet: wordList
) => {
  let iconName
  switch (route.name) {
    case languageSet.TestSpace:
      iconName = focused ? 'checkmark-outline' : 'checkmark-outline'
      break
    case languageSet.Testing:
      iconName = focused ? 'document-text-outline' : 'document-text-outline'
      break
    case languageSet.WrongAnswer:
      iconName = focused ? 'star' : 'star-outline'
      break
    case languageSet.Export:
      iconName = focused ? 'share-outline' : 'share-outline'
      break
    case languageSet.Setting:
      iconName = focused ? 'settings-outline' : 'settings-outline'
      break
  }
  return iconName
}

export const MakerTabIconName = (
  route: RouteProp<ParamListBase, string>, 
  focused: boolean, 
  languageSet: wordList
) => {
  let iconName
  switch (route.name) {
    case languageSet.MyTest:
      iconName = focused ? 'heart-outline' : 'heart-outline';
      break;
    case languageSet.Camera:
      iconName = focused ? 'camera-outline' : 'camera-outline';
      break;
    case languageSet.File:
      iconName = focused ? 'folder-outline' : 'folder-outline';
      break;
    case languageSet.TextBox:
      iconName = focused ? 'clipboard-outline' : 'clipboard-outline';
      break;
    case languageSet.Edit:
      iconName = focused ? 'create-outline' : 'create-outline';
      break;
    case languageSet.Setting:
      iconName = focused ? 'settings-outline' : 'settings-outline';
      break;
  }
  return iconName
}