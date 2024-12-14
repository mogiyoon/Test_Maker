import React, { useEffect, useState } from "react"
import { readConvertTime, writeConvertTimePlusOne } from "../../db/TimeAsyncStorage"
import { useContentContext } from "../../context/Contents"
import { Keyboard, TouchableWithoutFeedback } from "react-native"
import { readMakerSetting, writeMakerSetting } from "../../db/MakerSettingAsyncStorage"
import { Container, RowContainer, StyledButton, StyledText, StyledTextInput } from "../../components/makerTabScreen/MakerSetting"

export const MakerSetting = () => {
  const timeValue = readConvertTime()
  const [appearingTime, setAppearingTime] = useState(timeValue)
  const [settingName, setSettingName] = useState('')
  const [settingMean, setSettingMean] = useState('')
  const {content, setContent, isChanged, setIsChanged, isUsingOCR, setIsUsingOCR} = useContentContext()

  const callSettings = async () => {
    await callSetting(settingName, setSettingName, 'name')
    await callSetting(settingMean, setSettingMean, 'mean')
  }

  const callSetting = async (nowValue, setFunction, settingParm: string) => {
    console.log('callSetting')
    console.log(settingParm)
    const tempValue = await readMakerSetting(settingParm)
    console.log(tempValue)
    if (nowValue !== tempValue) {
      console.log(nowValue)
      setFunction(tempValue)
      console.log(setFunction)
    }
  }

  useEffect(() => {
    const processingOCR = async () => {
      const time = await readConvertTime()
      setAppearingTime(time)
      setIsUsingOCR(false)
    }

    if (isChanged === false && isUsingOCR === true) {
      processingOCR()
    }
    callSettings()
  }, [isChanged])

  const handlePlusConvertTime = async () => {
    const value = await writeConvertTimePlusOne()
    const time = await readConvertTime()
    if (value) {
      setAppearingTime(time)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()}}>
      <Container>
        <RowContainer>
          <StyledText>{appearingTime}</StyledText>
          <StyledButton
            onPress={handlePlusConvertTime}>
            <StyledText>read</StyledText>
          </StyledButton>
        </RowContainer>
        <RowContainer>
          <StyledTextInput
            value={settingName}
            onChangeText={(text) => setSettingName(text)}
          />
          <StyledButton
            onPress={() => {
              writeMakerSetting('name', settingName)
              setIsChanged(true)
            }}>
            <StyledText>OK</StyledText>
          </StyledButton>
        </RowContainer>
        <RowContainer>
          <StyledTextInput
            value={settingMean}
            onChangeText={(text) => setSettingMean(text)}
          />
          <StyledButton
            onPress={() => {
              writeMakerSetting('mean', settingMean)
              setIsChanged(true)
            }}>
            <StyledText>OK</StyledText>
          </StyledButton>
        </RowContainer>
      </Container>
    </TouchableWithoutFeedback>
  )
}