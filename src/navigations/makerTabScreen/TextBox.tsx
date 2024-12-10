import React, { useEffect, useState } from "react"
import { Dimensions, Keyboard, TouchableWithoutFeedback } from "react-native"
import { useContentContext } from "../../context/Contents"
import { Container, RowContainer, StyledButton, StyledText, StyledTextInput } from "../../components/makerTabScreen/TextBox"

const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height

export const TextBox = () => {
  const [testContext, setTestContext] = useState('') // TextBox의 값

  const {content, setContent, isChanged, setIsChanged, isUsingOCR, setIsUsingOCR} = useContentContext() // Edit으로 가는 값

  const updateContent = () => {
    setContent(testContext)
    setIsChanged(true)
  }

  const deleteContent = () => {
    setTestContext('')
    setContent('')
    setIsChanged(true)
  }

  useEffect(() => {

    if(isChanged === true) {
      setTestContext(content)
      setIsChanged(false)
    }
  }, [isChanged])

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()}}>
      <Container>
        <StyledTextInput
          value = {testContext}
          onChangeText={text => setTestContext(text)}
          placeholder="Input Contents"
          width={WindowWidth}
          height={WindowHeight * 0.65}
        />
        <RowContainer>
          <StyledButton
            onPress={() => updateContent()}>
            <StyledText
              fontSize={14}>Confirm</StyledText>
          </StyledButton>
          <StyledButton
            onPress={() => deleteContent()}>
            <StyledText
              fontSize={14}>Delete</StyledText>
          </StyledButton>
        </RowContainer>
      </Container>
    </TouchableWithoutFeedback>
  )
}
