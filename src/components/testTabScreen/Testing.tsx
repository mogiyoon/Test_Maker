import React from "react"
import { Dimensions } from "react-native"
import styled from "styled-components/native"


export const windowWidth = Dimensions.get('window').width

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  margin: 5px;
`
export const RowContainerWithColor = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #c3c7ff;
  padding: 4px;
`
export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px;
`

export const MeaningContainer = styled.View`
width: ${windowWidth * 0.95}px;
background-color: #c4c0f4;
justify-content: center;
align-items: center;
margin: 5px;
padding: 10px;
border-radius: 5px;
` 
export const FlexContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 2px;
`
export const TextBox = styled.Text`
  font-size: 15px;
`

export const ChoiceBox = styled.TouchableOpacity`
  height: 100px;
  width: ${windowWidth * 0.45}px;
  background-color: #FFFFAF;
  margin: 2px 6px;
  justify-content: center;
  align-items: center;
`

export const TextWriteBox = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  textAlignVertical: 'top',
  multiline: true,
})`
  height: 50px;
  background-color: #FFFFFF;
  border-radius: 8px;
  border: 1px;
  padding: 10px;
  font-size: 20px;
  `
export const Button = styled.TouchableOpacity`
  height: 25px;
  width: 60px;
  border-radius: 15px;
  background-color: #ffcaca;
  justify-content: center;
  align-items: center;
  margin: 10px;
`