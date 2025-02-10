import React from "react"
import { useSelector } from "react-redux"
import { ExplainSet } from "../Tutorials"
import { SlideComponent } from "../../components/SlideComponent"

export const ExportTabTutorialSet = () => {
  let languageSetting = useSelector(state => state.language.language)
  let typedLanguageSetting = languageSetting as keyof typeof exportTabExplainList

  const exportTabTutorialSet : ExplainSet[] = [
    {
      imageUri: require('../../assets/images/tutorials/testTab/exportTab/1.png'),
      explainText: exportTabExplainList[typedLanguageSetting].explain1
    },
    {
      imageUri: require('../../assets/images/tutorials/testTab/exportTab/2.png'),
      explainText: exportTabExplainList[typedLanguageSetting].explain2
    },
    {
      imageUri: require('../../assets/images/tutorials/testTab/exportTab/3.png'),
      explainText: exportTabExplainList[typedLanguageSetting].explain3
    },
    {
      imageUri: require('../../assets/images/tutorials/testTab/exportTab/4.png'),
      explainText: exportTabExplainList[typedLanguageSetting].explain4
    },
  ]
  return (
    <SlideComponent
      inputList={exportTabTutorialSet}
    />
  )
}

interface exportTabExplainList {
  explain1: string
  explain2: string
  explain3: string
  explain4: string
}
const englishExportTabExplainList : exportTabExplainList = {
  explain1: 'Pressing the extract button will generate multiple-choice questions based on the selected category after watching an advertisement.',
  explain2: 'You can copy the questions and answers using the copy button.',
  explain3: 'You can set the number of questions through the export count and add numbers to the extracted questions using the show question numbers option.',
  explain4: '',
}
const koreanExportTabExplainList : exportTabExplainList = {
  explain1: '추출 버튼을 누르면 광고를 시청한 뒤, 선택된 카테고리를 중심으로 4지선다형 문제가 만들어집니다.',
  explain2: '복사 버튼을 통해 문제와 정답을 복사할 수 있습니다.',
  explain3: '내보내기 수를 통해 문제의 수를 설정할 수 있고, 문제 번호 보기를 통해 추출한 문제에 번호를 만들 수 있습니다.',
  explain4: '',
}

export const exportTabExplainList = {
  English : englishExportTabExplainList,
  Korean : koreanExportTabExplainList,
} as const