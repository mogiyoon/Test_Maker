import { StyleSheet } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;
export const InnerContainer = styled.View`
  flex: 1;
  background-color: black;
`
export const NoCameraContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
export const RowContainer = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 10px;
  justify-content: space-evenly;
`;
export const ImageContainer = styled.Image`
  width: 100%;
  height: 90%;
`
export const StyledText = styled.Text`
  font-size: 30px;
`;
export const StyledTakePhotoButton = styled.TouchableOpacity`
  position: absolute;
  left: 50%;
  bottom: 30px;
  ${({ theme }) => css`
    transform: translateX(-30px);
  `}
  width: 60px;
  height: 60px;
  border-radius: 40px;
  background-color: #ffffff;
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
  font-size: 15px;
`;

export const customStyles = StyleSheet.create({
  customAbsoluteFill: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#000000',
  },
});
