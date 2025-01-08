import React from 'react';
import styled from 'styled-components/native';

const Container = styled.ScrollView`
  background-color: ${props => props.bgColor || 'transparent'};
`;
const GridContainer = styled.View`
  flex: 1;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin: 5px;
  background-color: ${props => props.bgColor || 'transparent'};
`;
const GridSpaceContainer = styled.View`
  flex: 1;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin: 5px;
  background-color: ${props => props.bgColor || 'transparent'};
`;
const RowContainer = styled.View`
  flex-direction: row;
`;
const Text = styled.Text`
  font-size: 15px;
`;

export const GridComponent = ({
  columnNumber = 1,
  data,
  renderItem,
  isFull = false,
  containerBgColor = 'transparent',
  gridBgColor = 'transparent',
  gridSpaceBgColor = 'transparent',
}) => {
  const validColumnNumber = Math.max(1, columnNumber);
  const dataLength = data.length;
  const getItem = (data, index) => data[index];

  const renderItems = [];
  for (let i = 0; i < dataLength; i++) {
    const item = getItem(data, i);
    renderItems.push(
      <GridContainer bgColor={gridBgColor}>
        <Text>{renderItem({item, index: i})}</Text>
      </GridContainer>,
    );
  }
  if (isFull) {
    for (
      let i = 0;
      i < validColumnNumber - (dataLength % validColumnNumber);
      i++
    ) {
      renderItems.push(<GridSpaceContainer bgColor={gridSpaceBgColor} />);
    }
  }
  console.log(renderItems);

  const rowRenderItems = [];
  let tempList = [];
  for (let i = 0; i < renderItems.length; i++) {
    if (i % validColumnNumber !== validColumnNumber - 1) {
      tempList.push(renderItems[i]);
      if (i === renderItems.length - 1) {
        rowRenderItems.push(<RowContainer>{tempList}</RowContainer>);
      }
    } else {
      tempList.push(renderItems[i]);
      rowRenderItems.push(<RowContainer>{tempList}</RowContainer>);
      tempList = [];
    }
  }

  return <Container bgColor={containerBgColor}>{rowRenderItems}</Container>;
};
