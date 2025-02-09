import React from "react"
import { useSelector } from "react-redux"
import { ExplainSet } from "../Tutorials"
import { SlideComponent } from "../../components/SlideComponent"

export const EditTutorialSet = () => {
  let languageSetting = useSelector(state => state.language.language)
  let typedLanguageSetting = languageSetting as keyof typeof editExplainList

  const editTutorialSet : ExplainSet[] = [
    {
      imageUri: require('../../assets/images/tutorials/makerTab/edit/1.png'),
      explainText: editExplainList[typedLanguageSetting].explain1
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/edit/2.png'),
      explainText: editExplainList[typedLanguageSetting].explain2
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/edit/3.png'),
      explainText: editExplainList[typedLanguageSetting].explain3
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/edit/4.png'),
      explainText: editExplainList[typedLanguageSetting].explain4
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/edit/5.png'),
      explainText: editExplainList[typedLanguageSetting].explain5
    },
  ]
  return (
    <SlideComponent
      inputList={editTutorialSet}
    />
  )
}

interface editExplainList {
  explain1: string
  explain2: string
  explain3: string
  explain4: string
  explain5: string
}
const englishEditExplainList : editExplainList = {
  explain1: 'If there is provided data, the question will be generated automatically.',
  explain2: 'Selected data is highlighted in red, while unselected data appears in gray. You can select all data at once using the "Choose All" option.',
  explain3: 'Press Save to store the data. A category is required.',
  explain4: "Use '-' to separate categories. The further to the right, the more specific the subcategory. Example: Main Category - Middle Category - Subcategory - ...",
  explain5: "Saved data can be viewed in 'My Test'."
}
const koreanEditExplainList : editExplainList = {
  explain1: '전달된 데이터가 있으면 문제는 자동으로 생성됩니다.',
  explain2: '선택된 데이터는 붉게, 선택되지 않은 데이터는 회색으로 표시됩니다. 모두 선택으로 전체를 선택할 수 있습니다.',
  explain3: '저장을 누르면 데이터가 저장되며 카테고리는 필수입니다.',
  explain4: "'-'를 사용하여 카테고리를 나눌 수 있습니다. 오른쪽으로 갈수록 더욱 하위 카테고리입니다. 예시) 상위 카테고리-중간 카테고리-하위 카테고리-...",
  explain5: "저장된 데이터는 '내 문제'에서 확인할 수 있습니다.",
}

export const editExplainList = {
  English : englishEditExplainList,
  Korean : koreanEditExplainList,
} as const