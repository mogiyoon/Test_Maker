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
}
const englishExportTabExplainList : exportTabExplainList = {
  explain1: 'explain1',
  explain2: 'explain2'
}
const koreanExportTabExplainList : exportTabExplainList = {
  explain1: '테스트1',
  explain2: '테스트2'
}

export const exportTabExplainList = {
  English : englishExportTabExplainList,
  Korean : koreanExportTabExplainList,
} as const