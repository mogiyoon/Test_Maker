import React, {useEffect, useState} from 'react';
import {
  readConvertTime,
  writeConvertTimePlusOne,
} from '../../db/TimeAsyncStorage';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {
  Container,
  ExampleContainer,
  ExampleText,
  RowContainer,
  StyledButton,
  StyledSwitch,
  StyledText,
  StyledTextInput,
} from '../../components/makerTabScreen/MakerSetting';
import {useDispatch, useSelector} from 'react-redux';
import {setIsChanged, setIsUsedOCR} from '../../redux/ContentsSlice';
import {
  setMeanFind,
  setWordFind,
  setWordInsideMean,
} from '../../redux/MakerSettingSlice';
import { getLanguageSet } from '../../services/LanguageSet';

export const MakerSetting = () => {
  const isChanged = useSelector(state => state.contentChanged.isChanged);
  const isUsingOCR = useSelector(state => state.usingOCR.setIsUsedOCR);

  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  //저장된 설정 받아오기
  const wordInsideMean = useSelector(state => state.wordInsideMean.wordInsideMean);
  const wordFind = useSelector(state => state.wordFind.wordFind);
  const meanFind = useSelector(state => state.meanFind.meanFind);

  const dispatch = useDispatch();

  const timeValue = readConvertTime();
  const [appearingTime, setAppearingTime] = useState(timeValue);
  const [settingWordInsideMean, setSettingWordInsideMean] =
    useState(wordInsideMean);
  const [settingName, setSettingName] = useState(wordFind);
  const [settingMean, setSettingMean] = useState(meanFind);

  useEffect(() => {
    const processingOCR = async () => {
      const time = await readConvertTime();
      setAppearingTime(time);
      dispatch(setIsUsedOCR(false));
    };

    if (isChanged === false && isUsingOCR === true) {
      processingOCR();
    }
  }, [isChanged]);

  const handlePlusConvertTime = async () => {
    const value = await writeConvertTimePlusOne();
    const time = await readConvertTime();
    if (value) {
      setAppearingTime(time);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <Container>
        <RowContainer>
          {/* 광고 */}
          <StyledText>{appearingTime}</StyledText>
          <StyledButton onPress={handlePlusConvertTime}>
            <StyledText>{languageSet.Read}</StyledText>
          </StyledButton>
        </RowContainer>

        {wordInsideMean ? (
          <ExampleContainer>
            <ExampleText>
              {settingMean[0]}{languageSet.ThisIs}{' '}
              {settingName[0]}{languageSet.Example}{settingName[1]}
              {' '}{languageSet.Sentence} {settingMean[1]} 
            </ExampleText>
        </ExampleContainer>) : (
          <ExampleContainer>
            <ExampleText>
              {settingName[0]}{languageSet.Example}{settingName[1]}{' '}
              {settingMean[0]}{languageSet.ExampleMean}{settingMean[1]}
            </ExampleText>
          </ExampleContainer>
        )}
        <RowContainer>
          {/* Word Inside Mean */}
          <StyledText>
            {languageSet.AnswerInParagraph}
          </StyledText>
          <StyledSwitch
            value={settingWordInsideMean}
            onValueChange={value => {
              setSettingWordInsideMean(value);
              dispatch(setWordInsideMean(value));
              dispatch(setIsChanged(true));
            }}
          />
        </RowContainer>

        <RowContainer>
          {/* Word Finder */}
          <StyledText>
            {languageSet.Answer}
          </StyledText>
          <StyledTextInput
            value={settingName}
            onChangeText={text => setSettingName(text)}
          />
          <StyledButton
            onPress={() => {
              dispatch(setWordFind(settingName));
              dispatch(setIsChanged(true));
            }}>
            <StyledText>{languageSet.Ok}</StyledText>
          </StyledButton>
        </RowContainer>

        <RowContainer>
          {/* Mean Finder */}
          <StyledText>
            {languageSet.Explanation}
          </StyledText>
          <StyledTextInput
            value={settingMean}
            onChangeText={text => setSettingMean(text)}
          />
          <StyledButton
            onPress={() => {
              dispatch(setMeanFind(settingMean));
              dispatch(setIsChanged(true));
            }}>
            <StyledText>{languageSet.Ok}</StyledText>
          </StyledButton>
        </RowContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};
