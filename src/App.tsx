import React, { useEffect, useState } from 'react';
import {Provider} from 'react-redux';
import {syncReduxWithRealm} from './redux/RealmSlice';
import {StackNavigation} from './navigations/Stack';
import {initiateTimeStorage} from './db/TimeAsyncStorage';
import {initiateMakerSettingStorage} from './db/MakerSettingAsyncStorage';
import {store} from './redux/ReduxStore';
import {testTreeInitiate} from './redux/TestTreeSlice';
import {makerSettingInit} from './redux/MakerSettingSlice';
import { HomeView, ImageContainer, InitiateImg, InitiateText } from './components/App';
import { initiateLanguageStorage } from './db/LanguageAsyncStorage';
import { initiateTestSettingStorage } from './db/TestSettingAsyncStorage';
import { testSettingInit } from './redux/TestSettingSlice';
import { languageSettingInit } from './redux/LanguageSlice';



const App = () => {
  const [loading, setLoading] = useState(0)
  const initiateStorage = async () => {
    await initiateTimeStorage();
    await initiateMakerSettingStorage();
    await initiateTestSettingStorage();
    await initiateLanguageStorage();
  };

  useEffect(() => {
    try {
      initiateStorage().then(() => {
        setLoading((preVal) => preVal + 1)
        languageSettingInit();
        syncReduxWithRealm();
        testTreeInitiate();
        makerSettingInit();
        testSettingInit();
        setLoading((preVal) => preVal + 1)
      })
    } catch (e) {
      console.log(e)
    }
  }, [])

  const loadingMax = 2
  if (loading > loadingMax) {
    //overLoad
    setLoading(loadingMax)
  }
  return (
    <HomeView>
      { loading === loadingMax ? (
        <Provider store={store}>
          <StackNavigation />
        </Provider>
      ) : (
        <ImageContainer>
          <InitiateImg
            source={require('./assets/images/TestMaker.png')}
            resizeMode={'contain'}
          />
          <InitiateText>
            Test Maker
          </InitiateText>
        </ImageContainer>
      )}
    </HomeView>
  );
};

export default App;
