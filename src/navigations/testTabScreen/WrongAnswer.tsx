import React from 'react';
import {
  Container,
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

const FlatListComponent = ({id, category, word, wrongNumber, dispatch}) => {
  return (
    <TouchableContainer
      onLongPress={() => {
        dispatch(removeTestRealmData({id, word}));
        testTreeInitiate();
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
          <StyledText>{wrongNumber}</StyledText>
        </MeaningContainer>
      </FlatListContainer>
    </TouchableContainer>
  );
};

export const WrongAnswer = () => {
  const wrongAnswerList = useSelector(
    state => state.wrongAnswerRealm.realmData,
  );
  const dispatch = useDispatch();

  return (
    <Container>
      {wrongAnswerList.length === 0 ? (
        <StyledText>No Data</StyledText>
      ) : (
        <StyledFlatList
          data={wrongAnswerList}
          renderItem={({item}) => (
            <FlatListComponent
              id={item.id}
              category={item.category}
              word={item.word}
              wrongNumber={item.wrongNumber}
              dispatch={dispatch}
            />
          )}
        />
      )}
    </Container>
  );
};
