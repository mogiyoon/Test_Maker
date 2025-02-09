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
    {
      imageUri: require('../../assets/images/tutorials/testTab/testSpace/3.png'),
      explainText: testSpaceExplainList[typedLanguageSetting].explain3
    },
    {
      imageUri: require('../../assets/images/tutorials/testTab/testSpace/4.png'),
      explainText: testSpaceExplainList[typedLanguageSetting].explain4
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
  explain3: string
  explain4: string
}
const englishTestSpaceExplainList : TestSpaceExplainList = {
  explain1: 'The chosen category is displayed. You can solve or extract problems using this category.',
  explain2: 'The current category is displayed. Subcategories will be shown.',
  explain3: 'Words included in the current category are displayed.',
  explain4: "'Choose' can be pressed to choose a category, or 'Back' can be pressed to move to the parent category.",
}
const koreanTestSpaceExplainList : TestSpaceExplainList = {
  explain1: '선택된 카테고리가 보입니다. 해당 카테고리로 문제를 풀거나 추출할 수 있습니다.',
  explain2: '현재 카테고리를 나타냅니다. 하위 카테고리가 표시됩니다.',
  explain3: '현재 카테고리의 포함된 단어가 표시됩니다.',
  explain4: "'선택'을 눌러 카테고리를 선택하거나 '뒤로'를 눌러 상위 카테고리로 이동 가능합니다.",
}

export const testSpaceExplainList = {
  English : englishTestSpaceExplainList,
  Korean : koreanTestSpaceExplainList,
} as const