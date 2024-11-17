import React from "react"
import { useCameraDevice, useCameraPermission } from "react-native-vision-camera"
import styled from "styled-components/native"

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const StyledText = styled.Text`
  font-size: 30px;
`

export const Camera = () => {
  const device = useCameraDevice('back')
  const { hasPermission } = useCameraPermission()

  return (
    <Container>
      <StyledText>Camera</StyledText>
    </Container>
  )
}