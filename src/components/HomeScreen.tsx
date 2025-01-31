import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex-direction: ${({inputWidth, inputHeight}) =>
    inputWidth > inputHeight ? 'row' : 'column'};
  flex: 1;
`;
export const JustContainer = styled.SafeAreaView`
  flex: 1;
`
export const SelectionButton = styled.TouchableOpacity`
  flex: 1;
  width: 95%;
  height: 95%;
  margin: 5px auto;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${({color}) => color};
`;
export const LangRowContainer = styled.View`
  flex-direction: row;
  justify-content:space-evenly;
  align-items: flex-start;
  margin: 0px 5px;
`
export const LangButton = styled.TouchableOpacity`
  width: 100px;
  height: 25px;
  margin: 5px;
  padding: 2px;
  border: 1px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background-color: ${({color}) => color};
`
export const LangText = styled.Text`
  font-size: 15px;
  color: #000000;
`
export const StyledText = styled.Text`
  font-size: 30px;
  color: #000000;
`;
export const OpenSourceLicenseButton = styled.TouchableOpacity`
  height: 30px;
  width: 200px;
  margin: auto;
  justify-content: center;
  align-items: center;
`
export const OpenSourceLicenseText = styled.Text`
  font-size: 15px;
`