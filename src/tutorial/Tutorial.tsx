import React from 'react'
import styled from 'styled-components/native'

const Screen = styled.View`
  flex: 1;
`
const ScreenOpacity = styled.View`
  flex: 1;
  opacity: 0.3;
  pointer-events: none;
`
const SkipTutorial = styled.TouchableOpacity`
  z-index: 1;
  position: absolute;
  padding: 5px;
  border: 1px;
  border-radius: 5px;
  right: 10%;
  bottom: 50px;
  background-color: white;
  justify-content: center;
  align-items: center;
`
const Text = styled.Text`
  size: 15px;
  color: black;
`

interface TutorialProps {
  children: React.ReactNode
}

export const Tutorial = ({children} : TutorialProps) => {

  return (
    <Screen>
      <SkipTutorial>
        <Text>
          {/* TODO language set으로 고치기 */}
          Skip Tutorial
        </Text>
      </SkipTutorial>
      <ScreenOpacity>
        {children}
      </ScreenOpacity>
    </Screen>
  )
}
