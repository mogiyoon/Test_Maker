import React, { useEffect, useState } from "react"
import styled from "styled-components/native"
import { readConvertTime, writeConvertTimePlusOne } from "../../db/TimeAsyncStorage"
import { useContentContext } from "../../context/Contents"
import { Dimensions } from "react-native"

const windowWidth = Dimensions.get('window').width
const Container = styled.View`
  flex: 1;
  justify-content: start;
  align-items: center;
`
const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`

const StyledText = styled.Text`
  font-size: 15px;
`
const StyledTextInput =styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  textAlignVertical: 'top',
  maxLength: 2,
  multiline: false,
})`
  background-color: #FFFFFF;
  border-radius: 8px;
  border: 1px;
  padding: 10px;
  margin: 10px 0px;
  font-size: 20px;
  width: 40px;
  height: 15px;
`
const StyledButton = styled.TouchableOpacity`
  background-color: #FFFFFF;
  height: 20px;
  width: 60px;
  margin: 10px;
  justify-content: center;
  align-items: center;
`

export const MakerSetting = () => {
  const timeValue = readConvertTime()
  const [appearingTime, setAppearingTime] = useState(timeValue)
  const {content, setContent, isChanged, setIsChanged, isUsingOCR, setIsUsingOCR} = useContentContext()

  useEffect(() => {
    const processingOCR = async () => {
      const time = await readConvertTime()
      setAppearingTime(time)
      setIsUsingOCR(false)
    }

    if (isChanged === false && isUsingOCR === true) {
      processingOCR()
    }
  }, [isChanged])



  const handlePlusConvertTime = async () => {
    const value = await writeConvertTimePlusOne()
    const time = await readConvertTime()
    if (value) {
      setAppearingTime(time)
    }
  }

  return (
    <Container>
      <RowContainer>
        <StyledText>{appearingTime}</StyledText>
        <StyledButton
          onPress={handlePlusConvertTime}>
          <StyledText>read</StyledText>
        </StyledButton>
      </RowContainer>
      <RowContainer>
        <StyledTextInput>

        </StyledTextInput>
        <StyledButton>
          <StyledText>OK</StyledText>
        </StyledButton>
      </RowContainer>
    </Container>
  )
}