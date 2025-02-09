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
  explain1: 'explain1',
  explain2: 'explain2'
}
const koreanWrongAnswerExplainList : wrongAnswerExplainList = {
  explain1: '테스트1',
  explain2: '테스트2'
}

export const wrongAnswerExplainList = {
  English : englishWrongAnswerExplainList,
  Korean : koreanWrongAnswerExplainList,
} as const