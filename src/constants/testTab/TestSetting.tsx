import React from "react"
import { useSelector } from "react-redux"
import { ExplainSet } from "../Tutorials"
import { SlideComponent } from "../../components/SlideComponent"

export const TestSettingTutorialSet = () => {
  let languageSetting = useSelector(state => state.language.language)
  let typedLanguageSetting = languageSetting as keyof typeof testSettingExplainList

  const testSettingTutorialSet : ExplainSet[] = [
    {
      imageUri: require('../../assets/images/tutorials/testTab/testSetting/1.png'),
      explainText: testSettingExplainList[typedLanguageSetting].explain1
    },
    {
      imageUri: require('../../assets/images/tutorials/testTab/testSetting/2.png'),
      explainText: testSettingExplainList[typedLanguageSetting].explain2
    },
    {
      imageUri: require('../../assets/images/tutorials/testTab/testSetting/3.png'),
      explainText: testSettingExplainList[typedLanguageSetting].explain3
    },
  ]
  return (
    <SlideComponent
      inputList={testSettingTutorialSet}
    />
  )
}

interface testSettingExplainList {
  explain1: string
  explain2: string
  explain3: string
}
const englishTestSettingExplainList : testSettingExplainList = {
  explain1: 'Sets the number of questions to be extracted.',
  explain2: 'Displays the numbers of the extracted questions.',
  explain3: 'Configures the setting to view explanations or only the answers.',
}
const koreanTestSettingExplainList : testSettingExplainList = {
  explain1: '추출되는 문제의 수를 설정합니다.',
  explain2: '추출되는 문제의 번호를 보여줍니다.',
  explain3: '해설을 보거나 정답만 보게 설정합니다.',
}

export const testSettingExplainList = {
  English : englishTestSettingExplainList,
  Korean : koreanTestSettingExplainList,
} as const