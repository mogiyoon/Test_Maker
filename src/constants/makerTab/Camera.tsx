import React from 'react';
import { useSelector } from 'react-redux';
import { ExplainSet } from '../Tutorials';
import { SlideComponent } from '../../components/SlideComponent';

export const CameraTutorialSet = () => {
  let languageSetting = useSelector(state => state.language.language);
  let typedLanguageSetting = languageSetting as keyof typeof cameraExplainList;

  const cameraTutorialSet : ExplainSet[] = [
    {
      imageUri: require('../../assets/images/tutorials/makerTab/camera/1.png'),
      explainText: cameraExplainList[typedLanguageSetting].explain1,
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/camera/2.png'),
      explainText: cameraExplainList[typedLanguageSetting].explain2,
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/camera/3.png'),
      explainText: cameraExplainList[typedLanguageSetting].explain3,
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/camera/4.png'),
      explainText: cameraExplainList[typedLanguageSetting].explain4,
    },
    {
      imageUri: require('../../assets/images/tutorials/makerTab/camera/5.png'),
      explainText: cameraExplainList[typedLanguageSetting].explain5,
    },
  ];
  return (
    <SlideComponent
      inputList={cameraTutorialSet}
    />
  );
};

interface cameraExplainList {
  explain1: string
  explain2: string
  explain3: string
  explain4: string
  explain5: string
}
const englishCameraExplainList : cameraExplainList = {
  explain1: 'This tab allows you to capture text for extraction using the camera.',
  explain2: 'Press "Select" to extract text from the captured image using OCR, or press "Cancel" to retake the photo.',
  explain3: 'The data converted by OCR is sent to the text box tab, and the screen switches automatically.',
  explain4: 'You can check the available OCR usage in the settings.',
  explain5: 'Conversion is not possible if the network is disconnected or there are no OCR tokens.',
};
const koreanCameraExplainList : cameraExplainList = {
  explain1: '추출하고자 하는 글자를 카메라로 촬영할 수 있는 탭입니다.',
  explain2: '선택을 눌러 OCR을 통해 촬영한 사진의 글자를 추출하거나 취소를 눌러 사진을 재촬영할 수 있습니다.',
  explain3: 'OCR로 변환된 데이터는 글 상자 탭으로 전송되며 화면이 전환됩니다.',
  explain4: '가능한 OCR 횟수는 Setting에서 확인할 수 있습니다.',
  explain5: '네트워크 연결이 끊기거나 OCR토큰이 없으면 변환이 불가능합니다.',
};

export const cameraExplainList = {
  English : englishCameraExplainList,
  Korean : koreanCameraExplainList,
} as const;
