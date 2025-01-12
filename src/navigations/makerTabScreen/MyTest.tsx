import React from 'react';
import {
  Container,
  DataContainer,
  FlatListContainer,
  MeaningContainer,
  StyledFlatList,
  StyledText,
  TouchableContainer,
  WordContainer,
} from '../../components/makerTabScreen/MyTest';
import {useDispatch, useSelector} from 'react-redux';
import {removeTestRealmData} from '../../redux/RealmSlice';
import {testTreeInitiate, setIsTreeChanged} from '../../redux/TestTreeSlice';
import {itemIdReset} from '../../redux/TestChoiceSlice';

const FlatListComponent = ({id, category, word, meaning, dispatch}) => {
  return (
    <TouchableContainer
      onLongPress={() => {
        dispatch(removeTestRealmData({id, word}));
        testTreeInitiate();
        itemIdReset();
        dispatch(setIsTreeChanged(true));
      }}>
      <FlatListContainer>
        <WordContainer>
          <StyledText>{category}</StyledText>
        </WordContainer>
        <WordContainer>
          <StyledText>{word}</StyledText>
        </WordContainer>
        <MeaningContainer>
          <StyledText>{meaning}</StyledText>
        </MeaningContainer>
      </FlatListContainer>
    </TouchableContainer>
  );
};

export const MyTest = () => {
  const myTestList = useSelector(state => state.testRealm.realmData);
  const dispatch = useDispatch();

  return (
    <Container>
      {myTestList.length === 0 ? (
        <DataContainer>
          <StyledText>No Data</StyledText>
        </DataContainer>
      ) : (
        <StyledFlatList
          data={myTestList}
          renderItem={({item}) => (
            <FlatListComponent
              id={item.id}
              category={item.category}
              word={item.word}
              meaning={item.meaning}
              dispatch={dispatch}
            />
          )}
        />
      )}
    </Container>
  );
};
