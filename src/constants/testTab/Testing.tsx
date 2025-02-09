import React from "react"
import { useSelector } from "react-redux"
import { ExplainSet } from "../Tutorials"
import { SlideComponent } from "../../components/SlideComponent"

export const TestingTutorialSet = () => {
  let languageSetting = useSelector(state => state.language.language)
  let typedLanguageSetting = languageSetting as keyof typeof testingExplainList

  const testingTutorialSet : ExplainSet[] = [
    {
      imageUri: require('../../assets/images/tutorials/testTab/testing/1.png'),
      explainText: testingExplainList[typedLanguageSetting].explain1
    },
    {
      imageUri: require('../../assets/images/tutorials/testTab/testing/2.png'),
      explainText: testingExplainList[typedLanguageSetting].explain2
    },
  ]
  return (
    <SlideComponent
      inputList={testingTutorialSet}
    />
  )
}

interface testingExplainList {
  explain1: string
  explain2: string
}
const englishTestingExplainList : testingExplainList = {
  explain1: 'explain1',
  explain2: 'explain2'
}
const koreanTestingExplainList : testingExplainList = {
  explain1: '테스트1',
  explain2: '테스트2'
}

export const testingExplainList = {
  English : englishTestingExplainList,
  Korean : koreanTestingExplainList,
} as const