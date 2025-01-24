import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import { Container, LangButton, LangRowContainer, LangText, SelectionButton, StyledText } from '../components/HomeScreen';
import { useDispatch, useSelector } from 'react-redux';
import { languageIndex } from '../db/LanguageAsyncStorage';
import { setLanguageData } from '../redux/LanguageSlice';

export const HomeScreen = ({navigation}) => {
  const [windowSize, setWindowSize] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });
  const languageSetting = useSelector((state) => state.language.language)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleSize = () => {
      setWindowSize({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      });
    };

    const subscription = Dimensions.addEventListener('change', handleSize);

    return () => subscription.remove();
  }, []);

  return (
    <Container inputWidth={windowSize.width} inputHeight={windowSize.height}>
      <SelectionButton
        color={'#7c7cff'}
        onPress={() => navigation.navigate('Test')}>
        <StyledText>Test</StyledText>
      </SelectionButton>
      <LangRowContainer>

        <LangButton
          onPress={() => {
            dispatch(setLanguageData(languageIndex.English))
          }}
          color={languageSetting === languageIndex.English ? '#b7b7b7' : '#FFFFFF'}
        >
          <LangText>
            English
          </LangText>
        </LangButton>

        <LangButton
          onPress={() => {
            dispatch(setLanguageData(languageIndex.Korean))
          }}
          color={languageSetting === languageIndex.Korean ? '#b7b7b7' : '#FFFFFF'}
        >
          <LangText>
            한국어
          </LangText>
        </LangButton>

      </LangRowContainer>
      <SelectionButton
        color={'#ff7c7c'}
        onPress={() => navigation.navigate('Maker')}>
        <StyledText>Maker</StyledText>
      </SelectionButton>
    </Container>
  );
};
