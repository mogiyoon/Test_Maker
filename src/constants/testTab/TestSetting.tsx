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
}
const englishTestSettingExplainList : testSettingExplainList = {
  explain1: 'explain1',
  explain2: 'explain2'
}
const koreanTestSettingExplainList : testSettingExplainList = {
  explain1: '테스트1',
  explain2: '테스트2'
}

export const testSettingExplainList = {
  English : englishTestSettingExplainList,
  Korean : koreanTestSettingExplainList,
} as const