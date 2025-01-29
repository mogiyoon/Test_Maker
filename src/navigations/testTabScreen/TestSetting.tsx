import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLanguageSet } from '../../services/LanguageSet';
import { setExportNum, setShowCommentary, setShowExportNum } from '../../redux/TestSettingSlice';
import { Container, RowContainer, StyledButton, StyledSwitch, StyledText, StyledTextInput } from '../../components/testTabScreen/TestSetting';


export const TestSetting = () => {
  const tempExportNum = useSelector(state => state.exportNum.exportNum)
  const exportNum = String(tempExportNum)
  const showExportNum = useSelector(state => state.showExportNum.showExportNum)
  const showCommentary = useSelector(state => state.showCommentary.showCommentary)
  const dispatch = useDispatch()

  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  const [settingExportNum, setSettingExportNum] = useState(exportNum)
  const [settingShowExportNum, setSettingShowExportNum] = useState(showExportNum)
  const [settingShowCommentary, setSettingShowCommentary] = useState(showCommentary)

  return (
    <Container>
      <RowContainer>
        <StyledText>
          {languageSet.ExportNum}
        </StyledText>
        <StyledTextInput
          value={settingExportNum}
          onChangeText={val => {
            let tempNumToStr = '0'
            if (val !== '') {
              const tempValToNum = parseInt(val, 10)
              tempNumToStr = String(tempValToNum)
            }
            setSettingExportNum(tempNumToStr)
          }}
        />
        <StyledButton
          onPress={() => {
            dispatch(setExportNum(settingExportNum))
          }}
        >
          <StyledText>
            {languageSet.Ok}
          </StyledText>
        </StyledButton>
      </RowContainer>

      <RowContainer>
        {/* show export number*/}
        <StyledText>
          {languageSet.ShowProblemNumber}
        </StyledText>
        <StyledSwitch
          value={settingShowExportNum}
          onValueChange={value => {
            setSettingShowExportNum(value);
            dispatch(setShowExportNum(value));
          }}
        />
      </RowContainer>

      <RowContainer>
        {/* show commentary */}
        <StyledText>
          {languageSet.ShowCommentary}
        </StyledText>
        <StyledSwitch
          value={settingShowCommentary}
          onValueChange={value => {
            setSettingShowCommentary(value);
            dispatch(setShowCommentary(value));
          }}
        />
      </RowContainer>
    </Container>
  );
};
