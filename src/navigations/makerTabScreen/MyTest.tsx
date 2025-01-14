import React, { useEffect, useState } from 'react';
import {
  Container,
  DataContainer,
  FlatListContainer,
  MeaningContainer,
  RecursionTreeFlatList,
  StyledText,
  TouchableContainer,
  WordContainer,
} from '../../components/makerTabScreen/MyTest';
import {useDispatch, useSelector} from 'react-redux';
import {removeTestRealmData} from '../../redux/RealmSlice';
import {testTreeInitiate, setIsTreeChanged, testTree, setIsTreeMyTestChanged} from '../../redux/TestTreeSlice';
import {itemIdReset} from '../../redux/TestChoiceSlice';

export const FlatListChild = ({inputItem, dispatch}) => {
  return (
    <TouchableContainer
      onLongPress={() => {
        dispatch(removeTestRealmData({id: inputItem.id, word: inputItem.word}));
        testTreeInitiate();
        itemIdReset();
        dispatch(setIsTreeChanged(true));
      }}>
      <FlatListContainer>
        <WordContainer>
          <StyledText>{inputItem.category}</StyledText>
        </WordContainer>
        <WordContainer>
          <StyledText>{inputItem.word}</StyledText>
        </WordContainer>
        <MeaningContainer>
          <StyledText>{inputItem.meaning}</StyledText>
        </MeaningContainer>
      </FlatListContainer>
    </TouchableContainer>
  );
};

export const MyTest = () => {
  const myTestList = useSelector(state => state.testRealm.realmData);
  const treeChange = useSelector(state => state.treeChanged.isTreeChanged);
  const dispatch = useDispatch();

  const [myTestTree, setMyTestTree] = useState(testTree);
  const [nowCategory, setNowCategory] = useState(myTestTree[0]); // 현재 카테고리

  if (treeChange[1]) {
    setMyTestTree(testTree);
    setNowCategory(myTestTree[0]);
    dispatch(setIsTreeMyTestChanged(false));
  }

  useEffect(() => {
    setNowCategory(myTestTree[0]);
  }, []);

  return (
    <Container>
      {myTestList.length === 0 ? (
        <DataContainer>
          <StyledText>No Data</StyledText>
        </DataContainer>
      ) : (
        <RecursionTreeFlatList
          node={nowCategory}
          beforeCategoryName={''}
          testList={myTestList}
        />
      )}
    </Container>
  );
};
