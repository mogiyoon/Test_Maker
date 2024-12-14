import styled from "styled-components/native"

export const Container = styled.View`
  flex: 1;
  justify-content: start;
  align-items: center;
`
export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`

export const StyledText = styled.Text`
  font-size: 15px;
`
export const StyledTextInput =styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  textAlign: 'center',
  textAlignVertical: 'top',
  maxLength: 2,
  multiline: false,
})`
  background-color: #FFFFFF;
  border-radius: 8px;
  border: 1px;
  padding: 2px;
  margin: 10px 0px;
  font-size: 15px;
  width: 70px;
  height: 30px;
`
export const StyledButton = styled.TouchableOpacity`
  background-color: #FFFFFF;
  height: 20px;
  width: 60px;
  margin: 10px;
  justify-content: center;
  align-items: center;
`