import React, {useEffect, useState} from 'react';
import {
  readConvertTime,
  writeConvertTimePlusOne,
} from '../../db/TimeAsyncStorage';
import {Keyboard, Switch, TouchableWithoutFeedback} from 'react-native';
import {
  Container,
  RowContainer,
  StyledButton,
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

export const MakerSetting = () => {
  const isChanged = useSelector(state => state.contentChanged.isChanged);
  const isUsingOCR = useSelector(state => state.usingOCR.setIsUsedOCR);

  const wordInsideMean = useSelector(
    state => state.wordInsideMean.wordInsideMean,
  );
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
            <StyledText>read</StyledText>
          </StyledButton>
        </RowContainer>

        <RowContainer>
          {/* Word Inside Mean */}
          <Switch
            value={settingWordInsideMean}
            onValueChange={value => {
              setSettingWordInsideMean(value);
              dispatch(setWordInsideMean(value));
            }}
          />
        </RowContainer>

        <RowContainer>
          {/* Word Finder */}
          <StyledTextInput
            value={settingName}
            onChangeText={text => setSettingName(text)}
          />
          <StyledButton
            onPress={() => {
              dispatch(setWordFind(settingName));
              dispatch(setIsChanged(true));
            }}>
            <StyledText>OK</StyledText>
          </StyledButton>
        </RowContainer>

        <RowContainer>
          {/* Mean Finder */}
          <StyledTextInput
            value={settingMean}
            onChangeText={text => setSettingMean(text)}
          />
          <StyledButton
            onPress={() => {
              dispatch(setMeanFind(settingMean));
              dispatch(setIsChanged(true));
            }}>
            <StyledText>OK</StyledText>
          </StyledButton>
        </RowContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};
