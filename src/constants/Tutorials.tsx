import React from 'react'
import { testSpaceExplainList } from './TutorialsExplain';
import { ExplainWindow } from '../components/ExplainWindow';
import { useSelector } from 'react-redux';

export interface ExplainSet {
  imageUri: string
  explainText: string
}

// TestSpace
export const TestSpaceTutorialSet = () => {
  let languageSetting = useSelector(state => state.language.language)
  let typedLanguageSetting = languageSetting as keyof typeof testSpaceExplainList
  const testSpaceTutorialSet : ExplainSet[] = [
    {
      imageUri: require('../assets/images/tutorials/testTab/testSpace/1.png'),
      explainText: testSpaceExplainList[typedLanguageSetting].test1
    },
    {
      imageUri: require('../assets/images/tutorials/testTab/testSpace/2.png'),
      explainText: testSpaceExplainList[typedLanguageSetting].test2
    },
  ]

  return (
    <ExplainWindow
      explainList={testSpaceTutorialSet}
    />
  )
}



// MakerTab


