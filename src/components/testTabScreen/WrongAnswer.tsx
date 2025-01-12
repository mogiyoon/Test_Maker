import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 2px;
`;
export const DataContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`
export const StyledText = styled.Text`
  font-size: 10px;
`;

export const windowWidth = Dimensions.get('window').width;
export const StyledFlatList = styled.FlatList``;
export const TouchableContainer = styled.TouchableOpacity`
  margin: 5px;
`;

export const GridContainer = styled.View`
  flex: 1;
  height: 100px;
  padding: 10px;
  background-color: #ffcdcd;
  border-radius: 5px;
`

export const GridInnerContainer = styled.View`
  flex: 1;
  height: 90px;
  padding: 5px;
  background-color: #FFFFFF;
  border-radius: 5px;
  justify-content: center;
`