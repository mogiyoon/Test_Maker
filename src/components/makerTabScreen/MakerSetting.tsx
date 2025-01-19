import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: start;
  align-items: center;
`;
export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const ExampleContainer = styled.View`
  width: 90%;
  padding: 5px;
  margin: 10px;
  border: 1px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background-color: #d6ffd8;
`
export const ExampleText = styled.Text`
  font-size: 15px;
`

export const StyledSwitch = styled.Switch`
  margin-left: 10px
`

export const StyledText = styled.Text`
  font-size: 15px;
`;
export const StyledTextInput = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  textAlign: 'center',
  textAlignVertical: 'top',
  maxLength: 2,
  multiline: false,
})`
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px;
  padding: 2px;
  margin: 8px 0px;
  margin-left: 10px;
  font-size: 15px;
  width: 70px;
  height: 30px;
`;
export const StyledButton = styled.TouchableOpacity`
  background-color: #ffffff;
  height: 20px;
  width: 60px;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;
