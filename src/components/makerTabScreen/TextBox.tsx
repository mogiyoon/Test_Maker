import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;

export const Container = styled.View`
  flex: 1;
  justify-content: start;
  align-items: center;
`;
export const RowContainer = styled.View`
  width: ${WindowWidth}px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: stretch;
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
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px;
  padding: 10px;
  margin: 10px 0px;
  font-size: 20px;
  width: ${({width}) => width * 0.9}px;
  height: ${({height}) => height * 0.7}px;
`;
export const StyledButton = styled.TouchableOpacity`
  background-color: #ff8888;
  border-radius: 10px;
  height: 30px;
  width: 80px;
  align-items: center;
  justify-content: center;
`;
