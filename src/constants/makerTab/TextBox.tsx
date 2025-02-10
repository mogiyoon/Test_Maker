import React from "react"
import { useSelector } from "react-redux"
import { ExplainSet } from "../Tutorials"
import { SlideComponent } from "../../components/SlideComponent"

export const TextBoxTutorialSet = () => {
  let languageSetting = useSelector(state => state.language.language)
  let typedLanguageSetting = languageSetting as keyof typeof textBoxExplainList

  const textBoxTutorialSet : ExplainSet[] = [
    {
      imageUri: require('../../assets/images/tutorials/makerTab/textBox/1.png'),
      explainText: textBoxExplainList[typedLanguageSetting].explain1
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/textBox/2.png'),
      explainText: textBoxExplainList[typedLanguageSetting].explain2
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/textBox/3.png'),
      explainText: textBoxExplainList[typedLanguageSetting].explain3
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/textBox/4.png'),
      explainText: textBoxExplainList[typedLanguageSetting].explain4
    },
  ]
  return (
    <SlideComponent
      inputList={textBoxTutorialSet}
    />
  )
}

interface textBoxExplainList {
  explain1: string
  explain2: string
  explain3: string
  explain4: string
}
const englishTextBoxExplainList : textBoxExplainList = {
  explain1: 'Write the question you want to create in the text box and press confirm to send the data. OCR data is automatically sent and can be edited.',
  explain2: 'Press the delete button to reset the text box.',
  explain3: 'You can check the converted question in the edit tab.',
  explain4: 'In the settings tab, you can set symbols to distinguish answers from explanations.'
}
const koreanTextBoxExplainList : textBoxExplainList = {
  explain1: '만들고 싶은 문제를 글 상자에 쓰고 확인을 누르면 데이터가 전달됩니다. OCR 데이터는 자동 전달되며 수정 가능합니다.',
  explain2: '삭제 버튼을 누르면 글 상자를 초기화할 수 있습니다.',
  explain3: '전달된 데이터가 문제로 변환된 것을 편집 탭에서 확인할 수 있습니다.',
  explain4: '설정탭에서 기호를 정하여 답과 설명을 구분할 수 있습니다.',
}

export const textBoxExplainList = {
  English : englishTextBoxExplainList,
  Korean : koreanTextBoxExplainList,
} as const