import React, { useEffect, useState } from 'react';
import {Provider} from 'react-redux';
import {syncReduxWithRealm} from './redux/RealmSlice';
import {StackNavigation} from './navigations/Stack';
import {initiateTimeStorage} from './repository/TimeAsyncStorage';
import {initiateMakerSettingStorage} from './repository/MakerSettingAsyncStorage';
import {store} from './redux/ReduxStore';
import {testTreeInitiate} from './repository/TestTree';
import {makerSettingInit} from './redux/MakerSettingSlice';
import { HomeView, ImageContainer, InitiateImg, InitiateText } from './components/App';
import { initiateLanguageStorage } from './repository/LanguageAsyncStorage';
import { initiateTestSettingStorage } from './repository/TestSettingAsyncStorage';
import { testSettingInit } from './redux/TestSettingSlice';
import { languageSettingInit } from './redux/LanguageSlice';
import { wait } from './services/ChoreFunction';
import { initializeAdMob } from './services/GoogleAd';
import { adTimeInit } from './redux/TimeSlice';
import { loadingImages } from './assets/images/ImagesPath';
import { Tutorial } from './tutorial/Tutorial';

const App = () => {
  const [loading, setLoading] = useState(0)
  const [loadingImg, setLoadingImg] = useState(false)
  const [tutorialMode, setTutorialMode] = useState(true);

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
        initializeAdMob()
        languageSettingInit();
        syncReduxWithRealm();
        testTreeInitiate();
        adTimeInit();
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
    tutorialMode ? 
    (<Tutorial>
      <HomeView>
      {loading === loadingMax ? (
        <Provider store={store}>
          <StackNavigation />
        </Provider>
      ) : (
        <ImageContainer>
          {loadingImg === false ? (
            <ImageContainer>
              <InitiateImg
                source={loadingImages.loading1}
                resizeMode={'contain'}
              />
              <InitiateText>
                {'Test'}
              </InitiateText>
            </ImageContainer>
          ) : (
            <ImageContainer>
              <InitiateImg
                source={loadingImages.loading2}
                resizeMode={'contain'}
              />
              <InitiateText>
                {'Maker'}
              </InitiateText>
            </ImageContainer>
          )}
        </ImageContainer>
      )}
    </HomeView>
    </Tutorial>)
     : 
    (<HomeView>
      {loading === loadingMax ? (
        <Provider store={store}>
          <StackNavigation />
        </Provider>
      ) : (
        <ImageContainer>
          {loadingImg === false ? (
            <ImageContainer>
              <InitiateImg
                source={loadingImages.loading1}
                resizeMode={'contain'}
              />
              <InitiateText>
                {'Test'}
              </InitiateText>
            </ImageContainer>
          ) : (
            <ImageContainer>
              <InitiateImg
                source={loadingImages.loading2}
                resizeMode={'contain'}
              />
              <InitiateText>
                {'Maker'}
              </InitiateText>
            </ImageContainer>
          )}
        </ImageContainer>
      )}
    </HomeView>)
  );
};

export default App;
