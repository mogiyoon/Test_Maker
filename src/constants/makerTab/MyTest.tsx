import React from "react"
import { useSelector } from "react-redux"
import { ExplainSet } from "../Tutorials"
import { SlideComponent } from "../../components/SlideComponent"

export const MyTestTutorialSet = () => {
  let languageSetting = useSelector(state => state.language.language)
  let typedLanguageSetting = languageSetting as keyof typeof myTestExplainList

  const myTestTutorialSet : ExplainSet[] = [
    {
      imageUri: require('../../assets/images/tutorials/makerTab/myTest/1.png'),
      explainText: myTestExplainList[typedLanguageSetting].explain1
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/myTest/2.png'),
      explainText: myTestExplainList[typedLanguageSetting].explain2
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/myTest/3.png'),
      explainText: myTestExplainList[typedLanguageSetting].explain3
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/myTest/4.png'),
      explainText: myTestExplainList[typedLanguageSetting].explain4
    },
  ]
  return (
    <SlideComponent
      inputList={myTestTutorialSet}
    />
  )
}

interface MyTestExplainList {
  explain1: string
  explain2: string
  explain3: string
  explain4: string
}
const englishMyTestExplainList : MyTestExplainList = {
  explain1: 'This category is the main category.',
  explain2: 'Selecting a category will display its subcategories and words.',
  explain3: 'Long-pressing a category will show a delete button. Deleting it will also remove its subcategories and words.',
  explain4: 'Tap a word to modify or delete it.'
}
const koreanMyTestExplainList : MyTestExplainList = {
  explain1: '이 카테고리는 중심이 되는 카테고리입니다.',
  explain2: '카테고리를 선택하면 해당 카테고리가 가지고 있는 하위 카테고리 및 단어가 나옵니다.',
  explain3: '카테고리를 길게 선택하면 삭제 버튼이 나옵니다. 삭제할 경우 하위 카테고리 및 단어도 삭제됩니다.',
  explain4: '단어를 누르면 수정하거나 삭제할 수 있습니다.'
}

export const myTestExplainList = {
  English : englishMyTestExplainList,
  Korean : koreanMyTestExplainList,
} as const