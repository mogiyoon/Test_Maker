import React from "react"
import { useSelector } from "react-redux"
import { ExplainSet } from "../Tutorials"
import { SlideComponent } from "../../components/SlideComponent"

export const TestSpaceTutorialSet = () => {
  let languageSetting = useSelector(state => state.language.language)
  let typedLanguageSetting = languageSetting as keyof typeof testSpaceExplainList

  const testSpaceTutorialSet : ExplainSet[] = [
    {
      imageUri: require('../assets/images/tutorials/testTab/testSpace/1.png'),
      explainText: testSpaceExplainList[typedLanguageSetting].test1
    },
    {
      imageUri: require('../assets/images/tutorials/testTab/testSpace/2.png'),
      explainText: testSpaceExplainList[typedLanguageSetting].test2
    },
  ]
  return (
    <SlideComponent
      inputList={testSpaceTutorialSet}
    />
  )
}

interface TestSpaceExplainList {
  test1: string
  test2: string
}
const englishTestSpaceExplainList : TestSpaceExplainList = {
  test1: 'test1',
  test2: 'test2'
}
const koreanTestSpaceExplainList : TestSpaceExplainList = {
  test1: '테스트1',
  test2: '테스트2'
}

export const testSpaceExplainList = {
  English : englishTestSpaceExplainList,
  Korean : koreanTestSpaceExplainList,
} as const