import React from "react"
import { useSelector } from "react-redux"
import { ExplainSet } from "../Tutorials"
import { SlideComponent } from "../../components/SlideComponent"

export const MakerSettingTutorialSet = () => {
  let languageSetting = useSelector(state => state.language.language)
  let typedLanguageSetting = languageSetting as keyof typeof makerSettingExplainList

  const makerSettingTutorialSet : ExplainSet[] = [
    {
      imageUri: require('../../assets/images/tutorials/makerTab/makerSetting/1.png'),
      explainText: makerSettingExplainList[typedLanguageSetting].explain1
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/makerSetting/2.png'),
      explainText: makerSettingExplainList[typedLanguageSetting].explain2
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/makerSetting/3.png'),
      explainText: makerSettingExplainList[typedLanguageSetting].explain3
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/makerSetting/4.png'),
      explainText: makerSettingExplainList[typedLanguageSetting].explain4
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/makerSetting/5.png'),
      explainText: makerSettingExplainList[typedLanguageSetting].explain5
    },
  ]
  return (
    <SlideComponent
      inputList={makerSettingTutorialSet}
    />
  )
}

interface makerSettingExplainList {
  explain1: string
  explain2: string
  explain3: string
  explain4: string
  explain5: string
}
const englishMakerSettingExplainList : makerSettingExplainList = {
  explain1: 'When extracting text from a captured photo or gallery image, OCR tokens are deducted. The deducted tokens can be earned by watching ads as a reward.',
  explain2: 'If the answer within a paragraph is deselected, the answer and explanation will be extracted in order when the question is generated.',
  explain3: 'If the answer within a paragraph is selected, the answer will be extracted from the explanation when the question is generated.',
  explain4: 'You can set symbols to identify the answer and explanation, and they will be applied by pressing the OK button.',
  explain5: 'You can change to a preferred symbol and create a question.'
}
const koreanMakerSettingExplainList : makerSettingExplainList = {
  explain1: '촬영된 사진이나 갤러리 사진에서 글자를 추출할 때 OCR 토큰이 차감됩니다. 차감된 토큰은 광고 시청 보상으로 획득할 수 있습니다.',
  explain2: '단락 안에 정답을 해제하면 문제를 추출할 때 정답과 설명을 순서대로 추출합니다.',
  explain3: '단락 안에 정답을 선택하면 문제를 추출할 때 설명 안에서 정답을 추출합니다.',
  explain4: '정답과 설명을 찾을 때 기호를 정할 수 있으며 확인 버튼을 누르면 적용됩니다.',
  explain5: '편한 기호로 바꿔 문제를 만들면 됩니다.',
}

export const makerSettingExplainList = {
  English : englishMakerSettingExplainList,
  Korean : koreanMakerSettingExplainList,
} as const