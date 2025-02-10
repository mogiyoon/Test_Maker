import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-top: 20px;
  padding-bottom: 20px;
`;
export const InnerContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
export const RowContainer = styled.View`
  flex-direction: row;
  width: 300px;
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
  font-size: 15px;
`;
export const ImageContainer = styled.Image`
  width: 100%;
  height: 90%;
  padding: 10px;
`