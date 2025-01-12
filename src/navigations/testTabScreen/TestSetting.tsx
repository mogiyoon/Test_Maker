import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;
const StyledContainer = styled.View`
  height: 120px;
  background-color: #8e8e8e;
  border-radius: 5px;
  margin: 5px;
  justify-content: center;
  align-items: center;
`
const StyledText = styled.Text`
  font-size: 30px;
`;

export const TestSetting = () => {

  return (
    <Container>
      <StyledText>
        Test Setting
      </StyledText>
    </Container>
  );
};
