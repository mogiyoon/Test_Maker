import React, { useEffect, useState } from "react"
import { readConvertTime, writeConvertTimePlusOne } from "../../db/TimeAsyncStorage"
import { Keyboard, TouchableWithoutFeedback } from "react-native"
import { readMakerSetting, writeMakerSetting } from "../../db/MakerSettingAsyncStorage"
import { Container, RowContainer, StyledButton, StyledText, StyledTextInput } from "../../components/makerTabScreen/MakerSetting"
import { useDispatch, useSelector } from "react-redux"
import { setIsChanged, setIsUsedOCR } from "../../redux/ContentsSlice"

export const MakerSetting = () => {
  const timeValue = readConvertTime()
  const [appearingTime, setAppearingTime] = useState(timeValue)
  const [settingName, setSettingName] = useState('')
  const [settingMean, setSettingMean] = useState('')

  const isChanged = useSelector((state) => state.contentChanged.isChanged)
  const isUsingOCR = useSelector((state) => state.usingOCR.setIsUsedOCR)
  const dispatch = useDispatch()

  const callSettings = async () => {
    await callSetting(settingName, setSettingName, 'name')
    await callSetting(settingMean, setSettingMean, 'mean')
  }

  const callSetting = async (nowValue, setFunction, settingParm: string) => {
    const tempValue = await readMakerSetting(settingParm)
    if (nowValue !== tempValue) {
      setFunction(tempValue)
    }
  }

  useEffect(() => {
    const processingOCR = async () => {
      const time = await readConvertTime()
      setAppearingTime(time)
      dispatch(setIsUsedOCR(false))
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
              dispatch(setIsChanged(true))
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
              dispatch(setIsChanged(true))
            }}>
            <StyledText>OK</StyledText>
          </StyledButton>
        </RowContainer>
      </Container>
    </TouchableWithoutFeedback>
  )
}