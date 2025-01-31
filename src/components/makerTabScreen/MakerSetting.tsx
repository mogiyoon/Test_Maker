import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 5px;
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
  margin: 8px 0px;
  margin-left: 10px;
`

export const StyledText = styled.Text`
  font-size: 15px;
`;
export const StyledTextInput = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  textAlign: 'center',
  maxLength: 2,
  multiline: false,
})`
  width: 70px;
  height: 30px;
  background-color: #ffffff;
  border: 1px;
  border-radius: 8px;
  padding: 0px;
  margin: 8px 0px;
  margin-left: 10px;
  font-size: 15px;
`;
export const StyledButton = styled.TouchableOpacity`
  background-color: #ffffff;
  min-width: 70px;
  height: 25px;
  margin: 10px;
  padding: 2px;
  border-radius: 10px;
  border: 1px;
  justify-content: center;
  align-items: center;
`;
export const StyledButtonLikeContainer = styled.View`
  background-color: #ffffff;
  width: 100px;
  height: 25px;
  margin: 10px;
  padding: 2px;
  border-radius: 10px;
  border: 1px;
  justify-content: center;
  align-items: center;
`;