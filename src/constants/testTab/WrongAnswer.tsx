import React from "react"
import { useSelector } from "react-redux"
import { ExplainSet } from "../Tutorials"
import { SlideComponent } from "../../components/SlideComponent"

export const WrongAnswerTutorialSet = () => {
  let languageSetting = useSelector(state => state.language.language)
  let typedLanguageSetting = languageSetting as keyof typeof wrongAnswerExplainList

  const wrongAnswerTutorialSet : ExplainSet[] = [
    {
      imageUri: require('../../assets/images/tutorials/testTab/wrongAnswer/1.png'),
      explainText: wrongAnswerExplainList[typedLanguageSetting].explain1
    },
    {
      imageUri: require('../../assets/images/tutorials/testTab/wrongAnswer/2.png'),
      explainText: wrongAnswerExplainList[typedLanguageSetting].explain2
    },
  ]
  return (
    <SlideComponent
      inputList={wrongAnswerTutorialSet}
    />
  )
}

interface wrongAnswerExplainList {
  explain1: string
  explain2: string
}
const englishWrongAnswerExplainList : wrongAnswerExplainList = {
  explain1: 'Incorrect questions from the test are sorted in descending order.',
  explain2: 'Selecting an incorrect question will display a delete button, which you can press to remove the question.',
}
const koreanWrongAnswerExplainList : wrongAnswerExplainList = {
  explain1: '테스트에서 틀린 문제들이 내림차순으로 정렬됩니다.',
  explain2: '틀린 문제를 선택하면 삭제할 수 있는 버튼이 나오며 버튼을 누르면 틀린 문제를 삭제할 수 있습니다.'
}

export const wrongAnswerExplainList = {
  English : englishWrongAnswerExplainList,
  Korean : koreanWrongAnswerExplainList,
} as const