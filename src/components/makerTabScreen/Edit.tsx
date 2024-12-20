import { Dimensions } from "react-native"
import styled from "styled-components/native"


export const WindowContainer = styled.View`
  background-color: #28A0FF;
  flex: 1;
  justify-content: start;
  align-items: center;
`
export const ScrollableContainer = styled.ScrollView`
  background-color: #FFFFFF;
  flex: 1;
  margin: 8px;
  padding: 8px;
  border-radius: 15px;
  width: ${({width}) => width - 20}px;
`
export const Container = styled.View`
  background-color: #FFFFFF;
  flex: 1;
  margin: 8px;
  padding: 8px;
  border-radius: 15px;
  justify-content: start;
  align-items: start;
  width: ${({width}) => width - 20}px;
`
export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: start;
  width: ${({width}) => width}px;
  height: 50px;
`
export const StyledButton = styled.TouchableOpacity`
  background-color: #FFFFFF;
  height: 30px;
  width: 80px;
  margin: 8px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`
export const StyledText = styled.Text`
  font-size: 12px;
`
export const StyledTextInput = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  textAlign: 'center',
})`
  background-color: #FFFFFF;
  height: 30px;
  width: 80px;
  margin: 8px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`

export const StyledFlatList = styled.FlatList`
`
export const FlatListContainer = styled.View`
  flex-direction: row;
  background-color: #B4B4DC;
  min-height: 40px;
  width: ${({width}) => width}px;
  margin: 2px;
  padding: 4px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  `
export const CheckBoxContainer = styled.View`
  min-height: 10px;
  min-width: 10px;
  margin: 4px;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
  `
export const WordContainer = styled.View`
  background-color: #FFFFFF;
  min-height: 30px;
  width: 60px;
  padding: 5px;
  margin: 8px;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
  `
export const MeaningContainer = styled.View`
  background-color: #FFFFFF;
  flex: 1;
  min-height: 30px;
  padding: 8px;
  margin: 4px;
  border-radius: 2px;
  justify-content: center;
  `