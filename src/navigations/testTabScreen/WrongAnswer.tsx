import React from 'react';
import {
  Container,
  DataContainer,
  GridContainer,
  GridInnerContainer,
  StyledText,
  TouchableContainer,
} from '../../components/testTabScreen/WrongAnswer';
import {useDispatch, useSelector} from 'react-redux';
import {removeWrongAnswerRealmData} from '../../redux/RealmSlice';
import { GridComponent } from '../../components/GridComponent';

export const WrongAnswer = () => {
  const wrongAnswerList = useSelector(
    state => state.wrongAnswerRealm.realmData,
  );
  const dispatch = useDispatch();

  return (
    <Container>
      {wrongAnswerList.length === 0 ? (
        <DataContainer>
          <StyledText>No Data</StyledText>
        </DataContainer>
      ) : (
        <GridComponent
          isFull={true}
          columnNumber={2}
          data={wrongAnswerList}
          renderItem={({item}) => (
            <TouchableContainer
            onLongPress={() => {
              dispatch(removeWrongAnswerRealmData({id: item.id, word: item.word}));
            }}>
              <GridContainer>
                <GridInnerContainer>
                  <StyledText>Category : {item.category + '\n'}</StyledText>
                  <StyledText>Word : {item.word + '\n'}</StyledText>
                  <StyledText>Wrong Time : {item.wrongNumber}</StyledText>
                </GridInnerContainer>
              </GridContainer>
          </TouchableContainer>
          )}
        />
      )}
    </Container>
  );
};
