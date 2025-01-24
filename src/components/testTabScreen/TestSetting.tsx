import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;
export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`
export const StyledText = styled.Text`
  margin: 10px;
  font-size: 15px;
`;
export const StyledTextInput = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  textAlign: 'center',
  textAlignVertical: 'top',
  multiline: false,
})`
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px;
  padding: 2px;
  margin: 10px;
  font-size: 15px;
  width: 70px;
  height: 30px;
`;
export const StyledButton = styled.TouchableOpacity`
  background-color: #ffffff;
  width: 60px;
  margin: 10px;
  padding: 2px;
  border-radius: 10px;
  border: 1px;
  justify-content: center;
  align-items: center;
`;
export const StyledSwitch = styled.Switch`
  margin: 8px 0px;
  margin-left: 10px;
`;