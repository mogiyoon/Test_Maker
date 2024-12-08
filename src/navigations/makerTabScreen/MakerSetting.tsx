import React, { useEffect, useState } from "react"
import styled from "styled-components/native"
import { readConvertTime, writeConvertTimeMinusOne, writeConvertTimePlusOne } from "../../services/AsyncStorage"
import { useAsyncStorageContext } from "../../context/AsyncStorage"

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const StyledText = styled.Text`
  font-size: 30px;
`
const StyledButton = styled.TouchableOpacity`
  background-color: #000000;
  height: 50px;
  width: 50px;
  padding: 10px;
`

export const MakerSetting = () => {
  const timeValue = readConvertTime()
  const [appearingTime, setAppearingTime] = useState(timeValue)
  const {storageChanged, setStorageChanged} = useAsyncStorageContext()

  useEffect(() => {
    if (storageChanged) {
      setStorageChanged(false)
    }
  }, [storageChanged])

  const handlePlusConvertTime = async () => {
    const value = await writeConvertTimePlusOne()
    const time = await readConvertTime()
    if (value) {
      setAppearingTime(time)
    }
  }

  return (
    <Container>
      <StyledText>{appearingTime}</StyledText>
      <StyledButton
        onPress={handlePlusConvertTime}>
        <StyledText>read</StyledText>
      </StyledButton>
    </Container>
  )
}