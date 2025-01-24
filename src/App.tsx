import React, { useEffect, useState } from 'react';
import {Provider} from 'react-redux';
import {syncReduxWithRealm} from './redux/RealmSlice';
import {StackNavigation} from './navigations/Stack';
import {initiateTimeStorage} from './db/TimeAsyncStorage';
import {initiateMakerSettingStorage} from './db/MakerSettingAsyncStorage';
import {store} from './redux/ReduxStore';
import {testTreeInitiate} from './redux/TestTreeSlice';
import {makerSettingInit} from './redux/MakerSettingSlice';
import { HomeView, ImageContainer, InitiateImg } from './components/App';



const App = () => {
  const [loading, setLoading] = useState(0)
  const initiateStorage = async () => {
    await initiateTimeStorage();
    await initiateMakerSettingStorage();
  };

  useEffect(() => {
    initiateStorage().then(() => {
      setLoading((preVal) => preVal + 1)
      try {
        syncReduxWithRealm();
        testTreeInitiate();
        makerSettingInit();
        setLoading((preVal) => preVal + 1)
      } catch (e) {
      }
    })
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
          />
        </ImageContainer>
      )}
    </HomeView>
  );
};

export default App;
