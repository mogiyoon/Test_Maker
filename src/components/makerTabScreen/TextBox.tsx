import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
`;
export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 10px;
`;
export const StyledText = styled.Text`
  font-size: ${({fontSize}) => fontSize}px;
`;
export const StyledTextInput = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  textAlignVertical: 'top',
  multiline: true,
})`
  height: 65%;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px;
  padding: 10px;
  margin: 10px;
  font-size: 15px;
`;
export const StyledButton = styled.TouchableOpacity`
  background-color: #ff8888;
  border-radius: 10px;
  height: 30px;
  width: 80px;
  align-items: center;
  justify-content: center;
`;
