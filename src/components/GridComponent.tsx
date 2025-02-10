import React from 'react';
import { ScrollViewProps } from 'react-native';
import styled from 'styled-components/native';

interface CustomScrollViewProps extends ScrollViewProps {
  maxHeight?: number
}
const Container = styled.ScrollView<CustomScrollViewProps>`
  max-height: ${props => props.maxHeight}px;
`;

const GridContainer = styled.View`
  flex: 1;
`;
const GridSpaceContainer = styled.View`
  flex: 1;
`;
const RowContainer = styled.View`
  flex-direction: row;
`;

interface GridComponentProps<T> {
  columnNumber?: number; // 컬럼 개수
  data: T[]; // 데이터 배열
  renderItem: (props: {item: T}) => React.ReactNode; // 렌더링 함수
  isFull?: boolean; // 남는 공간에 빈 박스를 채울지 여부
  maxHeight?: number;
}

export const GridComponent = <T extends unknown> ({
  columnNumber = 1,
  data,
  renderItem,
  isFull = false,
  maxHeight,
}: GridComponentProps<T>) => {
  const validColumnNumber = Math.max(1, columnNumber);
  const dataLength = data.length;
  const getItem = (inputData: T[], index: number) => inputData[index];

  const renderItems = [];
  for (let i = 0; i < dataLength; i++) {
    const item = getItem(data, i);
    renderItems.push(
      <GridContainer
        key={i}
      >
        {renderItem({item})}
      </GridContainer>,
    );
  }
  if (isFull) {
    for (
      let i = 0;
      i < validColumnNumber - (dataLength % validColumnNumber);
      i++
    ) {
      renderItems.push(<GridSpaceContainer
        key={dataLength + i}
      />);
    }
  }

  const rowRenderItems = [];
  let tempList = [];
  for (let i = 0; i < renderItems.length; i++) {
    if (i % validColumnNumber !== validColumnNumber - 1) {
      tempList.push(renderItems[i]);
      if (i === renderItems.length - 1) {
        rowRenderItems.push(<RowContainer key={i}>{tempList}</RowContainer>);
      }
    } else {
      tempList.push(renderItems[i]);
      rowRenderItems.push(<RowContainer key={i}>{tempList}</RowContainer>);
      tempList = [];
    }
  }

  return (
  <Container
    maxHeight={maxHeight}
  >
    {rowRenderItems}
  </Container>
  );
};
