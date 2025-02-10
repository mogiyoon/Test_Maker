import React from "react"
import { useSelector } from "react-redux"
import { ExplainSet } from "../Tutorials"
import { SlideComponent } from "../../components/SlideComponent"

export const FileIndexTutorialSet = () => {
  let languageSetting = useSelector(state => state.language.language)
  let typedLanguageSetting = languageSetting as keyof typeof fileIndexExplainList

  const fileIndexTutorialSet : ExplainSet[] = [
    {
      imageUri: require('../../assets/images/tutorials/makerTab/fileIndex/1.png'),
      explainText: fileIndexExplainList[typedLanguageSetting].explain1
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/fileIndex/2.png'),
      explainText: fileIndexExplainList[typedLanguageSetting].explain2
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/fileIndex/3.png'),
      explainText: fileIndexExplainList[typedLanguageSetting].explain3
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/fileIndex/4.png'),
      explainText: fileIndexExplainList[typedLanguageSetting].explain4
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/fileIndex/4.png'),
      explainText: fileIndexExplainList[typedLanguageSetting].explain4
    },
  ]
  return (
    <SlideComponent
      inputList={fileIndexTutorialSet}
    />
  )
}

interface fileIndexExplainList {
  explain1: string
  explain2: string
  explain3: string
  explain4: string
  explain5: string
}
const englishFileIndexExplainList : fileIndexExplainList = {
  explain1: 'This tab allows you to extract text from saved images. You can select a saved image by tapping on a file.',
  explain2: 'Tap a file to reselect an image or press select to convert it to text using OCR.',
  explain3: 'The data converted by OCR is sent to the text box tab, and the screen switches automatically.',
  explain4: 'You can check the available OCR attempts in the settings.',
  explain5: 'Conversion is not possible if the network is disconnected, there are no OCR tokens available, or the image is difficult to recognize.'
}
const koreanFileIndexExplainList : fileIndexExplainList = {
  explain1: '저장된 사진의 문자를 가져올 수 있는 탭입니다. 파일을 눌러 저장된 사진을 선택할 수 있습니다.',
  explain2: '파일을 눌러 다시 사진을 선택하거나 선택을 눌러 OCR를 통해 글자로 변환할 수 있습니다.',
  explain3: 'OCR로 변환된 데이터는 글 상자 탭으로 전송되며 화면이 전환됩니다.',
  explain4: '가능한 OCR 횟수는 Setting에서 확인할 수 있습니다.',
  explain5: '네트워크 연결이 끊기거나 OCR토큰이 없거나 인식이 어려운 사진은 변환이 불가능합니다.',
}

export const fileIndexExplainList = {
  English : englishFileIndexExplainList,
  Korean : koreanFileIndexExplainList,
} as const