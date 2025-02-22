import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;
export const GridContainer = styled.View`
`
export const ExportContainer = styled.View`
  flex: 10;
  margin: 20px;
  padding: 10px;
  border-radius: 5px;
  background-color: #e9e9e9;
`;
export const ExportInnerContainer = styled.ScrollView`
  flex: 1;
  margin: 2px;
  padding: 10px;
  border-radius: 5px;
  background-color: #e1e1e1;
`
export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin: 15px 0px 0px 0px;
`;
export const CenterTextContainer = styled.View`
  align-items: center;
`;
export const Button = styled.TouchableOpacity`
  width: 70px;
  height: 40px;
  border-radius: 20px;
  background-color: #fffaaa;
  align-items: center;
  justify-content: center;
  padding: 3px;
`;
export const ButtonStyleContainer = styled.View`
  width: 70px;
  height: 40px;
  border-radius: 20px;
  background-color: #fffaaa;
  align-items: center;
  justify-content: center;
  padding: 3px;
`;

export const Text = styled.Text`
  font-size: 15px;
`;
