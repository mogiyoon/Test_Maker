import React from 'react';
import {
  Container,
  DataContainer,
  GridContainer,
  GridInnerContainer,
  NoDataText,
  OpenWordContainer,
  StyledText,
} from '../../components/testTabScreen/WrongAnswer';
import {useSelector} from 'react-redux';
import { GridComponent } from '../../components/GridComponent';
import { getLanguageSet } from '../../services/LanguageSet';

export const WrongAnswer = () => {
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  const wrongAnswerList = useSelector(
    state => state.wrongAnswerRealm.realmData,
  );

  return (
    <Container>
      {wrongAnswerList.length === 0 ? (
        <DataContainer>
          <NoDataText>{languageSet.NoData}</NoDataText>
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
