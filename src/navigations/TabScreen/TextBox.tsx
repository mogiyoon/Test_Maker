import React, { useContext, useEffect, useState } from "react"
import { Dimensions } from "react-native"
import styled from "styled-components/native"
import { useContentContext } from "../../context/Contents"

const Container = styled.View`
  flex: 1;
  justify-content: start;
  align-items: center;
`
const StyledText = styled.Text`
  font-size: ${({fontSize}) => fontSize}px;
`
const StyledTextInput = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  textAlignVertical: 'top',
  multiline: true,
})`
  background-color: #FFFFFF;
  border-radius: 8px;
  border: 1px;
  padding: 10px;
  margin: 10px 0px;
  font-size: 20px;
  width: ${({width}) => width * 0.9}px;
  height: ${({height}) => height * 0.7}px;
`
const StyledButton = styled.TouchableOpacity`
  background-color: #28A0FF;
  padding: 10px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`

export const TextBox = () => {
  const WindowWidth = Dimensions.get('window').width
  const WindowHeight = Dimensions.get('window').height
  const [testContext, setTestContext] = useState('')
  const {content, setContent} = useContentContext()

  const updateContent = () => {
    setContent(testContext)
    console.log(content)
  }

  return (
    <Container>
      <StyledTextInput
        value = {testContext}
        onChangeText={text => setTestContext(text)}
        placeholder="Input Contents"
        width={WindowWidth}
        height={WindowHeight}
      />
      <StyledButton
        onPress={() => updateContent()}>
        <StyledText
          fontSize={17}>Confirm</StyledText>
      </StyledButton>
    </Container>
  )
}
