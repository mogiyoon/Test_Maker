import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
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
import { useDispatch, useSelector } from 'react-redux';
import { getLanguageSet } from '../services/LanguageSet';
import { MakerTabIconName, TabNavigatorHomeIcon, TabNavigatorInfoIcon, TestTabIconName } from '../components/Tab';
import { setIsInfoWindowOpen } from '../redux/InfoWindowSlice';

export const MakerTab = createBottomTabNavigator();
export const TestTab = createBottomTabNavigator();

export const TestTabNavigation = ({navigation}) => {
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  const dispatch = useDispatch();

  return (
    <TestTab.Navigator
      initialRouteName={languageSet.TestSpace}
      screenOptions={({route}) => ({
        tabBarIcon: ({ focused, color, size}) => {
          const iconName = TestTabIconName(route, focused, languageSet)
          return <Ionicons name={iconName} size={size} color={color} />
          },
        headerShown: true
      })}
      backBehavior="order"
    >
      <TestTab.Screen 
        name={languageSet.TestSpace} 
        component={TestSpace}
        listeners={({navigation}) => ({
          blur: () => {dispatch(setIsInfoWindowOpen(false))},
        })}
        options={{
          headerLeft: () => <TabNavigatorHomeIcon navigation={navigation} />,
          headerRight: () => <TabNavigatorInfoIcon />,
        }}
      />
      <TestTab.Screen 
        name={languageSet.Testing} 
        component={Testing}
        listeners={({navigation}) => ({
          blur: () => {dispatch(setIsInfoWindowOpen(false))},
        })}
        options={{
          headerLeft: () => <TabNavigatorHomeIcon navigation={navigation} />,
          headerRight: () => <TabNavigatorInfoIcon />,
        }}
      />
      <TestTab.Screen 
        name={languageSet.WrongAnswer} 
        component={WrongAnswer}
        listeners={({navigation}) => ({
          blur: () => {dispatch(setIsInfoWindowOpen(false))},
        })}
        options={{
          headerLeft: () => <TabNavigatorHomeIcon navigation={navigation} />,
          headerRight: () => <TabNavigatorInfoIcon />,
        }}
      />
      <TestTab.Screen 
        name={languageSet.Export} 
        component={ExportTab}
        listeners={({navigation}) => ({
          blur: () => {dispatch(setIsInfoWindowOpen(false))},
        })}
        options={{
          headerLeft: () => <TabNavigatorHomeIcon navigation={navigation} />,
          headerRight: () => <TabNavigatorInfoIcon />,
        }}
      />
      <TestTab.Screen 
        name={languageSet.Setting} 
        component={TestSetting}
        listeners={({navigation}) => ({
          blur: () => {dispatch(setIsInfoWindowOpen(false))},
        })}
        options={{
          headerLeft: () => <TabNavigatorHomeIcon navigation={navigation} />,
          headerRight: () => <TabNavigatorInfoIcon />,
        }}
      />
    </TestTab.Navigator>
  );
};

export const MakerTabNavigation = ({navigation}) => {
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)
  const dispatch = useDispatch()

  return (
    <MakerTab.Navigator
      initialRouteName={languageSet.MyTest}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = MakerTabIconName(route, focused, languageSet);
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: true,
      })}
      backBehavior="order">
      {/* Tab Screen */}
      <MakerTab.Screen
        name={languageSet.MyTest}
        component={MyTest}
        listeners={({navigation}) => ({
          blur: () => {
            dispatch(setIsInfoWindowOpen(false));
          },
        })}
        options={{
          headerLeft: () => <TabNavigatorHomeIcon navigation={navigation} />,
          headerRight: () => <TabNavigatorInfoIcon />,
        }}
      />
      <MakerTab.Screen
        name={languageSet.Camera}
        component={CameraScreen}
        listeners={({navigation}) => ({
          blur: () => {
            dispatch(setIsInfoWindowOpen(false));
          },
        })}
        options={{
          headerLeft: () => <TabNavigatorHomeIcon navigation={navigation} />,
          headerRight: () => <TabNavigatorInfoIcon />,
        }}
      />
      <MakerTab.Screen
        name={languageSet.File}
        component={FileIndex}
        listeners={({navigation}) => ({
          blur: () => {
            dispatch(setIsInfoWindowOpen(false));
          },
        })}
        options={{
          headerLeft: () => <TabNavigatorHomeIcon navigation={navigation} />,
          headerRight: () => <TabNavigatorInfoIcon />,
        }}
      />
      <MakerTab.Screen
        name={languageSet.TextBox}
        component={TextBox}
        listeners={({navigation}) => ({
          blur: () => {
            dispatch(setIsInfoWindowOpen(false));
          },
        })}
        options={{
          headerLeft: () => <TabNavigatorHomeIcon navigation={navigation} />,
          headerRight: () => <TabNavigatorInfoIcon />,
        }}
      />
      <MakerTab.Screen
        name={languageSet.Edit}
        component={Edit}
        listeners={({navigation}) => ({
          blur: () => {
            dispatch(setIsInfoWindowOpen(false));
          },
        })}
        options={{
          headerLeft: () => <TabNavigatorHomeIcon navigation={navigation} />,
          headerRight: () => <TabNavigatorInfoIcon />,
        }}
      />
      <MakerTab.Screen
        name={languageSet.Setting}
        component={MakerSetting}
        listeners={({navigation}) => ({
          blur: () => {
            dispatch(setIsInfoWindowOpen(false));
          },
        })}
        options={{
          headerLeft: () => <TabNavigatorHomeIcon navigation={navigation} />,
          headerRight: () => <TabNavigatorInfoIcon />,
        }}
      />
    </MakerTab.Navigator>
  );
};
