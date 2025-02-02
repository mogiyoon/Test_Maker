import React, {useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {
  Container,
  ExampleContainer,
  ExampleText,
  RowContainer,
  StyledButton,
  StyledButtonLikeContainer,
  StyledSwitch,
  StyledText,
  StyledTextInput,
} from '../../components/makerTabScreen/MakerSetting';
import {useDispatch, useSelector} from 'react-redux';
import {setIsChanged} from '../../redux/ContentsSlice';
import {
  setMeanFind,
  setWordFind,
  setWordInsideMean,
} from '../../redux/MakerSettingSlice';
import { getLanguageSet } from '../../services/LanguageSet';
import { AdmobReward } from '../../services/GoogleAd';
import { plusOneAdTime } from '../../redux/TimeSlice';
import { ExplainWindow } from '../../components/ExplainWindow';

export const MakerSetting = () => {
  const dispatch = useDispatch();

  const isInfoWindowOpen = useSelector((state) => state.infoWindow.isInfoWindowOpen)

  //ad setting
  const adTime = useSelector((state) => state.adTime.adTime)

  //language setting
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  //saved setting
  const wordInsideMean = useSelector(state => state.wordInsideMean.wordInsideMean);
  const wordFind = useSelector(state => state.wordFind.wordFind);
  const meanFind = useSelector(state => state.meanFind.meanFind);

  //setting
  const [settingWordInsideMean, setSettingWordInsideMean] =
    useState(wordInsideMean);
  const [settingName, setSettingName] = useState(wordFind);
  const [settingMean, setSettingMean] = useState(meanFind);

  const handleDispatch = () => {
    dispatch(plusOneAdTime());
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <Container>
        <RowContainer>
          {/* 광고 */}
          <StyledText>{languageSet.OCR}</StyledText>
          <StyledText>{adTime}</StyledText>
            {adTime < 5 ? (
              <AdmobReward
                callBackFunction = {handleDispatch}
              >
                <StyledButtonLikeContainer>
                  <StyledText>{languageSet.WatchAd}</StyledText>
                </StyledButtonLikeContainer>
              </AdmobReward>
            ) : (
              <StyledButton>
                <StyledText>
                  {languageSet.Max}
                </StyledText>
              </StyledButton>
            )}
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
      {isInfoWindowOpen ? <ExplainWindow/> : null}
      </Container>

    </TouchableWithoutFeedback>
  );
};
