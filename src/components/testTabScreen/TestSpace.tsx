import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;
export const FlexContainer = styled.View`
  flex: ${({flexSize}) => flexSize};
  width: 95%;
  height: 95%;
  background-color: #bab0ff;
  border-radius: 10px;
  margin: 8px 6px;
  padding: 5px;
`;
export const RowContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
`;
export const TextContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: 5px;
`;
export const StyledFlatList = styled.FlatList``;
export const StyledTitle = styled.Text`
  background-color: #ffffff;
  font-size: 30px;
  padding: 2px 40px;
  border-radius: 20px;
`;
export const StyledCategory = styled.Text`
  font-size: 25px;
`;
export const StyledText = styled.Text`
  font-size: 15px;
`;
export const StyledGrid = styled.TouchableOpacity`
  flex: 1;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: #ffffe8;
  border-radius: 4px;
  margin: 5px;
`;
export const StyledButton = styled.TouchableOpacity`
  width: 100px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: #ffffe8;
  border-radius: 10px;
`;
