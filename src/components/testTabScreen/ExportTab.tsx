import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;
export const LeftContainer = styled.ScrollView`
  flex: 10;
  margin: 20px;
  padding: 10px;
  background-color: #e9e9e9;
`;
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

export const Text = styled.Text`
  font-size: 15px;
`;
