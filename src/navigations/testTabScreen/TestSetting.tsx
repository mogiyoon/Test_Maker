import React from 'react';
import styled from 'styled-components/native';
import {GridComponent} from '../../components/GridComponent';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const StyledText = styled.Text`
  font-size: 30px;
`;

export const TestSetting = () => {
  const testDataList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <GridComponent
      columnNumber={3}
      data={testDataList}
      renderItem={({item}) => item}
      isFull={true}
    />
  );
};
