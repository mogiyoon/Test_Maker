import React from 'react';
import {
  Container,
  DataContainer,
  GridContainer,
  GridInnerContainer,
  NoDataText,
  OpenWordContainer,
  StyledText,
} from '../../components/testTabScreen/IncorrectAnswer';
import {useSelector} from 'react-redux';
import { GridComponent } from '../../components/GridComponent';
import { getLanguageSet } from '../../services/LanguageSet';
import { ExplainWindow } from '../../components/ExplainWindow';
import { IncorrectAnswerTutorialSet } from '../../constants/testTab/IncorrectAnswer';

export const IncorrectAnswer = () => {
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  const isInfoWindowOpen = useSelector((state) => state.infoWindow.isInfoWindowOpen)

  const incorrectAnswerList = useSelector(
    state => state.incorrectAnswerRealm.realmData,
  );

  return (
    <Container>
      {incorrectAnswerList.length === 0 ? (
        <DataContainer>
          <NoDataText>{languageSet.NoData}</NoDataText>
        </DataContainer>
      ) : (
        <GridComponent
          isFull={true}
          columnNumber={2}
          data={incorrectAnswerList}
          renderItem={({item}) => (
            <OpenWordContainer
              inputId={item.id}
            >
              <GridContainer>
                <GridInnerContainer>
                  <StyledText>{languageSet.Category} : {item.category + '\n'}</StyledText>
                  <StyledText>{languageSet.Word} : {item.word + '\n'}</StyledText>
                  <StyledText>{languageSet.IncorrectTime} : {item.incorrectNumber}</StyledText>
                </GridInnerContainer>
              </GridContainer>
            </OpenWordContainer>
          )}
        />
      )}
      {isInfoWindowOpen ? 
      <ExplainWindow>
        <IncorrectAnswerTutorialSet/>
      </ExplainWindow> : null}
    </Container>
  );
};
