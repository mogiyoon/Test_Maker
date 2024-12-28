import React, { useEffect, useState } from "react"
import { Dimensions, Keyboard, TouchableWithoutFeedback } from "react-native"
import { Container, RowContainer, StyledButton, StyledText, StyledTextInput } from "../../components/makerTabScreen/TextBox"
import { useDispatch, useSelector } from "react-redux"
import { setContentData, setIsChanged } from "../../redux/ContentsSlice"

const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height

export const TextBox = () => {
  const [testContext, setTestContext] = useState('') // TextBox의 값
  const content = useSelector((state) => state.content.contentData)
  const isChanged = useSelector((state) => state.contentChanged.isChanged)
  const contentDispatch = useDispatch()

  const updateContent = () => {
    contentDispatch(setContentData(testContext))
    contentDispatch(setIsChanged(true))
  }

  const deleteContent = () => {
    setTestContext('')
    contentDispatch(setContentData(''))
    contentDispatch(setIsChanged(true))
  }

  useEffect(() => {
    if(isChanged === true) {
      console.log('useEffect')
      console.log(content)
      setTestContext(content)
      contentDispatch(setIsChanged(false))
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
