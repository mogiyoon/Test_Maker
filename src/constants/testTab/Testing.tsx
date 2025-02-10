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
    {
      imageUri: require('../../assets/images/tutorials/testTab/testing/3.png'),
      explainText: testingExplainList[typedLanguageSetting].explain3
    },
    {
      imageUri: require('../../assets/images/tutorials/testTab/testing/4.png'),
      explainText: testingExplainList[typedLanguageSetting].explain4
    },
    {
      imageUri: require('../../assets/images/tutorials/testTab/testing/5.png'),
      explainText: testingExplainList[typedLanguageSetting].explain5
    },
    {
      imageUri: require('../../assets/images/tutorials/testTab/testing/6.png'),
      explainText: testingExplainList[typedLanguageSetting].explain6
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
  explain3: string
  explain4: string
  explain5: string
  explain6: string
}
const englishTestingExplainList : testingExplainList = {
  explain1: 'Questions are created based on the previously selected category and its subcategories.',
  explain2: 'You can choose between subjective and multiple-choice questions.',
  explain3: 'In the settings, you can choose to view explanations or only the answers.',
  explain4: '',
  explain5: '',
  explain6: 'You can pass a question by pressing the pass button, and it will not be recorded in the incorrect answers list.',
}
const koreanTestingExplainList : testingExplainList = {
  explain1: '앞서 선택한 카테고리 및 하위 카테고리에 포함된 문제들로 출제가 됩니다.',
  explain2: '주관식과 객관식을 선택할 수 있습니다.',
  explain3: '설정에서 해설 보기와 정답만 보기를 선택할 수 있습니다.',
  explain4: '',
  explain5: '',
  explain6: '패스 버튼을 누르면 문제를 패스할 수 있고, 오답 목록에 기록되지 않습니다.',
}

export const testingExplainList = {
  English : englishTestingExplainList,
  Korean : koreanTestingExplainList,
} as const