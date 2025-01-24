import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const windowWidth = Dimensions.get('window').width;

export const ScrollView = styled.ScrollView`
  margin: 5px;
`;
export const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ResultContainer = styled.View`
  height: 60px;
  width: 120px;
  margin: 5px;
  border-radius: 20px;
  background-color: ${({color}) => color};
  justify-content: center;
  align-items: center;
`
export const ResultText = styled.Text`
  font-size: 30px;
`

export const AnswerContainer = styled.View`
  width: 180px;
  height: 40px;
  margin: 10px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: #78ffc4;
`
export const AnswerText = styled.Text`
  font-size: 20px;
`

export const RowContainerWithColor = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #c3c7ff;
  padding: 4px;
`;
export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

export const MeaningContainer = styled.View`
  flex: 1;
  background-color: #c4c0f4;
  justify-content: center;
  align-items: center;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
`;
export const FlexContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 2px;
`;
export const TextBox = styled.Text`
  font-size: 15px;
`;

export const ChoiceBox = styled.TouchableOpacity`
  height: 100px;
  flex: 1;
  background-color: #ffffaf;
  margin: 2px 6px;
  justify-content: center;
  align-items: center;
`;
export const ChoiceText = styled.Text`
  font-size: 20px;
`

export const TextWriteBox = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  textAlignVertical: 'top',
  multiline: true,
})`
  height: 50px;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px;
  padding: 10px;
  font-size: 20px;
`;
export const Button = styled.TouchableOpacity`
  height: 30px;
  width: 70px;
  border-radius: 15px;
  background-color: #cacdff;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
