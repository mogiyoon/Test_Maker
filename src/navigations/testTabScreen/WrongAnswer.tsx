import React from 'react';
import {
  Container,
  DataContainer,
  GridContainer,
  GridInnerContainer,
  OpenWordContainer,
  StyledText,
} from '../../components/testTabScreen/WrongAnswer';
import {useDispatch, useSelector} from 'react-redux';
import { GridComponent } from '../../components/GridComponent';
import { getLanguageSet } from '../../services/LanguageSet';

export const WrongAnswer = () => {
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

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
            <OpenWordContainer
              inputId={item.id}
            >
              <GridContainer>
                <GridInnerContainer>
                  <StyledText>{languageSet.Category} : {item.category + '\n'}</StyledText>
                  <StyledText>{languageSet.Word} : {item.word + '\n'}</StyledText>
                  <StyledText>{languageSet.WrongTime} : {item.wrongNumber}</StyledText>
                </GridInnerContainer>
              </GridContainer>
            </OpenWordContainer>
          )}
        />
      )}
    </Container>
  );
};
