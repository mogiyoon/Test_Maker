import React, { useEffect, useState } from 'react';
import {
  Container,
  DataContainer,
  RecursionTreeFlatList,
  NoDataText,
  MaxHeightContainer,
} from '../../components/makerTabScreen/MyTest';
import { useSelector } from 'react-redux';
import { testTree } from '../../db/TestTree';
import { getLanguageSet } from '../../services/LanguageSet';
import { ExplainWindow } from '../../components/ExplainWindow';
import { MyTestTutorialSet } from '../../constants/makerTab/MyTest';

export const MyTest = () => {
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  const myTestList = useSelector(state => state.testRealm.realmData);

  const isInfoWindowOpen = useSelector((state) => state.infoWindow.isInfoWindowOpen)

  const [myTestTree, setMyTestTree] = useState(testTree);
  const [nowCategory, setNowCategory] = useState(myTestTree[0]); // 현재 카테고리

  useEffect(() => {
    setNowCategory(myTestTree[0]);
  }, []);

  return (
    <Container>
      {myTestList.length === 0 ? (
        <DataContainer>
          <NoDataText>{languageSet.NoData}</NoDataText>
        </DataContainer>
      ) : (
        <MaxHeightContainer>
          <RecursionTreeFlatList
            node={nowCategory}
            beforeCategoryName={''}
            testList={myTestList}
          />
        </MaxHeightContainer>
      )}
      {isInfoWindowOpen ? (
        <ExplainWindow>
          <MyTestTutorialSet/>
        </ExplainWindow>
      ) : (
        null
      )}
    </Container>
  );
};
