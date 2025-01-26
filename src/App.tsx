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
import { wait } from './services/ChoreFunction';

const App = () => {
  const [loading, setLoading] = useState(0)
  const [loadingImg, setLoadingImg] = useState(false)
  const initiateStorage = async () => {
    await initiateTimeStorage();
    await initiateMakerSettingStorage();
    await initiateTestSettingStorage();
    await initiateLanguageStorage();
  };

  const initiateWait = async () => {
    await wait(666)
    setLoadingImg(true)
    await wait(333)
  }

  useEffect(() => {
    try {
      initiateStorage().then(() => {
        setLoading((preVal) => preVal + 1)
        languageSettingInit();
        syncReduxWithRealm();
        testTreeInitiate();
        makerSettingInit();
        testSettingInit();
      })
      initiateWait().then(() => {
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
            source={loadingImg === false ? require('./assets/images/loading1.png') : require('./assets/images/loading2.png')}
            resizeMode={'contain'}
          />
          <InitiateText>
            {loadingImg === false ? 'Test' : 'Maker'}
          </InitiateText>
        </ImageContainer>
      )}
    </HomeView>
  );
};

export default App;
