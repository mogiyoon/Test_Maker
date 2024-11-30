import React, { useContext, useEffect, useState } from "react"
import { Dimensions } from "react-native"
import styled from "styled-components/native"
import { useContentContext } from "../../context/Contents"

const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height

const Container = styled.View`
  flex: 1;
  justify-content: start;
  align-items: center;
`
const RowContainer = styled.View`
  width: ${WindowWidth}px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: stretch;
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
  border-radius: 10px;
  height: 30px;
  width: 80px;
  align-items: center;
  justify-content: center;
`

export const TextBox = () => {
  const [testContext, setTestContext] = useState('') // TextBox의 값
  const {content, setContent, isChanged, setIsChanged} = useContentContext() // Edit으로 가는 값

  const updateContent = () => {
    setContent(testContext)
    setIsChanged(true)
  }

  const deleteContent = () => {
    setTestContext('')
    setContent('')
    setIsChanged(true)
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
  )
}
