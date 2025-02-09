import React from "react"
import { useSelector } from "react-redux"
import { ExplainSet } from "../Tutorials"
import { SlideComponent } from "../../components/SlideComponent"

export const TestSpaceTutorialSet = () => {
  let languageSetting = useSelector(state => state.language.language)
  let typedLanguageSetting = languageSetting as keyof typeof testSpaceExplainList

  const testSpaceTutorialSet : ExplainSet[] = [
    {
      imageUri: require('../../assets/images/tutorials/testTab/testSpace/1.png'),
      explainText: testSpaceExplainList[typedLanguageSetting].explain1
    },
    {
      imageUri: require('../../assets/images/tutorials/testTab/testSpace/2.png'),
      explainText: testSpaceExplainList[typedLanguageSetting].explain2
    },
  ]
  return (
    <SlideComponent
      inputList={testSpaceTutorialSet}
    />
  )
}

interface TestSpaceExplainList {
  explain1: string
  explain2: string
}
const englishTestSpaceExplainList : TestSpaceExplainList = {
  explain1: 'explain1',
  explain2: 'explain2'
}
const koreanTestSpaceExplainList : TestSpaceExplainList = {
  explain1: '테스트1',
  explain2: '테스트2'
}

export const testSpaceExplainList = {
  English : englishTestSpaceExplainList,
  Korean : koreanTestSpaceExplainList,
} as const