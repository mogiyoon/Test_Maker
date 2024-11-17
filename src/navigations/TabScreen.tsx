import React from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const StyledText = styled.Text`
  font-size: 30px;
`

export const MyTest = () => {
  return (
    <Container>
      <StyledText>MyTest</StyledText>
    </Container>
  )
}

export const Camera = () => {
  return (
    <Container>
      <StyledText>Camera</StyledText>
    </Container>
  )
}

export const FileIndex = () => {
  return (
    <Container>
      <StyledText>File</StyledText>
    </Container>
  )
}

export const Edit = () => {
  return (
    <Container>
      <StyledText>Edit</StyledText>
    </Container>
  )
}

export const Setting = () => {
  return (
    <Container>
      <StyledText>Setting</StyledText>
    </Container>
  )
}