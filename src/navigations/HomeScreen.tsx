import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const Container = styled.SafeAreaView`
  flex-direction: ${({inputWidth, inputHeight}) =>
    inputWidth > inputHeight ? 'row' : 'column'};
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const SelectionButton = styled.TouchableOpacity`
  flex: 1;
  width: 95%;
  height: 95%;
  margin: 5px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${({color}) => color};
`;
const StyledText = styled.Text`
  font-size: 30px;
  color: #000000;
`;

export const HomeScreen = ({navigation}) => {
  const [windowSize, setWindowSize] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    const handleSize = () => {
      setWindowSize({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      });
    };

    const subscription = Dimensions.addEventListener('change', handleSize);

    return () => subscription.remove();
  }, []);

  return (
    <Container inputWidth={windowSize.width} inputHeight={windowSize.height}>
      <SelectionButton
        color={'#7c7cff'}
        onPress={() => navigation.navigate('Test')}>
        <StyledText>Test</StyledText>
      </SelectionButton>
      <SelectionButton
        color={'#ff7c7c'}
        onPress={() => navigation.navigate('Maker')}>
        <StyledText>Maker</StyledText>
      </SelectionButton>
    </Container>
  );
};
