import React from 'react';
import styled from 'styled-components/native';

export const WindowContainer = styled.View`
  background-color: #ff6868;
  flex: 1;
  justify-content: start;
  align-items: center;
`;
export const ScrollableContainer = styled.ScrollView`
  background-color: #ffffff;
  flex: 1;
  margin: 4px 8px 8px 8px;
  padding: 8px;
  border-radius: 15px;
  width: ${({width}) => width - 20}px;
`;
export const Container = styled.View`
  background-color: #ffffff;
  flex: 1;
  margin: 4px 8px;
  padding: 8px;
  border-radius: 15px;
  justify-content: start;
  align-items: start;
  width: ${({width}) => width - 20}px;
`;
export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: start;
  width: ${({width}) => width}px;
  height: 40px;
`;
export const StyledButton = styled.TouchableOpacity`
  background-color: #ffffff;
  height: 30px;
  width: 80px;
  margin: 8px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;
export const StyledText = styled.Text`
  font-size: 12px;
`;
export const StyledTextInput = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  textAlign: 'center',
})`
  background-color: #ffffff;
  height: 30px;
  width: 80px;
  margin: 8px;
  border-radius: 10px;
  font-size: 12px;
  align-items: center;
  justify-content: center;
`;

export const StyledFlatList = styled.FlatList``
export const CheckBoxContainer = styled.View`
  min-height: 10px;
  min-width: 10px;
  margin: 4px;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
`;
export const WordContainer = styled.View`
  background-color: #ffffff;
  width: 60px;
  min-height: 30px;
  padding: 5px;
  margin: 6px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;
export const MeaningContainer = styled.View`
  background-color: #ffffff;
  flex: 1;
  min-height: 30px;
  padding: 5px;
  margin: 6px;
  border-radius: 4px;
  justify-content: center;
`;
export const InnerTouchBoxContainer = styled.TouchableOpacity`
  margin: 2px;
  border-radius: 8px;
  flex-direction: row;
  background-color: ${({bgColor}) => bgColor};
`
export const TouchBoxContainer = ({value, onPress, children}) => {
  const bgColor = value ? '#e2bfbf' : '#d7d7d7';

  return (
    <InnerTouchBoxContainer onPress={onPress} bgColor={bgColor}>
      {children}
    </InnerTouchBoxContainer>
  );
};