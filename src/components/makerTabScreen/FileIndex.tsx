import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const RowContainer = styled.View`
  flex-direction: row;
  width: ${windowWidth * 0.9}px;
  padding: 10px;
  justify-content: space-evenly;
  align-items: center;
`;
export const StyledText = styled.Text`
  font-size: 30px;
`;
export const StyledButton = styled.TouchableOpacity`
  width: 70px;
  height: 30px;
  border-radius: 5px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;
export const StyledButtonText = styled.Text`
  font-size: 10px;
`;
