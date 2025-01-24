import React, {useState} from 'react';
import {Keyboard, Platform, TouchableWithoutFeedback} from 'react-native';
import {
  Container,
  RowContainer,
  StyledButton,
  StyledText,
  StyledTextInput,
} from '../../components/makerTabScreen/TextBox';
import {useDispatch, useSelector} from 'react-redux';
import {setContentData, setIsChanged} from '../../redux/ContentsSlice';
import { getLanguageSet } from '../../services/LanguageSet';

export const TextBox = () => {
    const languageSetting = useSelector((state) => state.language.language)
    const languageSet = getLanguageSet(languageSetting)

  const content = useSelector(state => state.content.contentData);
  const contentDispatch = useDispatch();
  const [testContext, setTestContext] = useState(content); // TextBox의 값

  const updateContent = () => {
    contentDispatch(setContentData(testContext));
    contentDispatch(setIsChanged(true));
  };

  const deleteContent = () => {
    setTestContext('');
    contentDispatch(setContentData(''));
    contentDispatch(setIsChanged(true));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <Container
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <RowContainer>
          <StyledButton onPress={() => updateContent()}>
            <StyledText fontSize={14}>{languageSet.Confirm}</StyledText>
          </StyledButton>
          <StyledButton onPress={() => deleteContent()}>
            <StyledText fontSize={14}>{languageSet.Delete}</StyledText>
          </StyledButton>
        </RowContainer>
        <StyledTextInput
          value={testContext}
          onChangeText={text => setTestContext(text)}
          placeholder="Input Contents"
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};
