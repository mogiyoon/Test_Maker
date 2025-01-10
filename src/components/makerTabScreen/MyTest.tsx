import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;
export const StyledText = styled.Text`
  font-size: 10px;
`;

export const windowWidth = Dimensions.get('window').width;
export const StyledFlatList = styled.FlatList``;
export const TouchableContainer = styled.TouchableOpacity`
  margin: 5px;
`;
export const FlatListContainer = styled.View`
  flex-direction: row;
  background-color: #b4b4dc;
  min-height: 40px;
  width: ${windowWidth - 10}px;
  padding: 4px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;
export const WordContainer = styled.View`
  background-color: #ffffff;
  min-height: 30px;
  width: 60px;
  padding: 5px;
  margin: 8px;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
`;
export const MeaningContainer = styled.View`
  background-color: #ffffff;
  flex: 1;
  min-height: 30px;
  padding: 8px;
  margin: 4px;
  border-radius: 2px;
  justify-content: center;
`;
