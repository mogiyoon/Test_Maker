import {Dimensions} from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { getLanguageSet } from '../../services/LanguageSet';

export const windowWidth = Dimensions.get('window').width;

export const ScrollView = styled.ScrollView`
  margin: 5px;
`;
export const Container = styled.View`
  align-items: center;
`;

export const ResultContainer = styled.View`
  height: 30px;
  width: 70px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: ${({bottomRightSize}) => bottomRightSize}px;
  border-bottom-left-radius: ${({bottomLeftSize}) => bottomLeftSize}px;
  background-color: ${({color}) => color};
  justify-content: center;
  align-items: center;
`
export const ResultText = styled.Text`
  font-size: 16px;
`

export const AnswerContainer = styled.View`
  flex: 1;
  padding: 10px;
  padding-bottom: 15px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: ${({color}) => color};
`
export const AnswerText = styled.Text`
  font-size: 15px;
`
export const RAFullContainer = styled.View`
  width: 95%;
  background-color: ${({color}) => color};
  border-radius: 10px;
  padding: 15px;
`
export const AnswerResultContainer = ({isRight, wasExplain, wasAnswer, wasReply}) => {
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  const showRightOnly = useSelector(state => state.showRightOnly.showRightOnly)

  return (
    <RAFullContainer
      color={isRight === languageSet.True ? ('#00ff37') : ('#ff4444')}
    >
      <ResultContainer
        color={isRight === languageSet.True ? ('#c7ffd3') : ('#ff9b9b')}
        bottomRightSize={showRightOnly ? 10 : 0}
        bottomLeftSize={showRightOnly ? 10 : 0}
      >
        <ResultText>
          {isRight === languageSet.True ? (languageSet.True) : (languageSet.Incorrect)}
        </ResultText>
      </ResultContainer>
      { showRightOnly ? (
        null
      ) : (
        <AnswerContainer
          color={isRight === languageSet.True ? ('#c7ffd3') : ('#ff9b9b')}
        >
          <AnswerText>{languageSet.Problem}: {wasExplain}</AnswerText>
          <AnswerText/>
          <AnswerText/>
          <AnswerText>{languageSet.Answer}: {wasAnswer}</AnswerText>
          <AnswerText>{languageSet.MyAnswer}: {wasReply}</AnswerText>
        </AnswerContainer>
      )}

    </RAFullContainer>
  )
}

export const RowContainerWithColor = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #c3c7ff;
  padding: 4px;
`;
export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

export const MeaningContainer = styled.View`
  background-color: #c4c0f4;
  justify-content: center;
  align-items: center;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
`;
export const FlexContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 2px;
`;
export const TextBox = styled.Text`
  font-size: 15px;
`;

export const ChoiceBox = styled.TouchableOpacity`
  height: 100px;
  flex: 1;
  background-color: #ffffaf;
  margin: 2px 6px;
  justify-content: center;
  align-items: center;
`;
export const ChoiceText = styled.Text`
  font-size: 20px;
`

export const TextWriteBox = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  textAlignVertical: 'center',
  multiline: true,
})`
  height: 50px;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px;
  padding: 10px;
  font-size: 20px;
`;
export const Button = styled.TouchableOpacity`
  height: 30px;
  width: 70px;
  margin: 10px;
  padding: 0px;
  border-radius: 15px;
  background-color: #cacdff;
  justify-content: center;
  align-items: center;
`;