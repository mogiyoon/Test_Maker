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
  width: ${windowWidth};
  justify-content: space-evenly;
  align-items: center;
`;
export const StyledText = styled.Text`
  font-size: 15px;
`;
export const StyledTakePhotoButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 40px;
  width: 60px;
  height: 60px;
  border-radius: 40px;
  background-color: #ffffff;
`;
export const StyledButton = styled.TouchableOpacity`
  width: 60px;
  height: 20px;
  border-radius: 5px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;
