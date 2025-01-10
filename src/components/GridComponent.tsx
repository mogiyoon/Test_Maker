import React from 'react';
import { ScrollViewProps, ViewProps } from 'react-native';
import styled from 'styled-components/native';

interface CustomScrollViewProps extends ScrollViewProps {
  maxHeight?: number
  bgColor: string
}
const Container = styled.ScrollView<CustomScrollViewProps>`
  max-height: ${props => props.maxHeight || 400}px;
  background-color: ${props => props.bgColor || 'transparent'};
`;

interface CustomViewProps extends ViewProps {
  height?: number
  bgColor: string
}
const GridContainer = styled.View<CustomViewProps>`
  flex: 1;
  flex-direction: row;
  height: ${props => props.height}px;
  justify-content: center;
  align-items: center;
  margin: 5px;
  background-color: ${(props) => props.bgColor || 'transparent'};
`;
const GridSpaceContainer = styled.View<CustomViewProps>`
  flex: 1;
  flex-direction: row;
  height: ${props => props.height}px;
  justify-content: center;
  align-items: center;
  margin: 5px;
  background-color: ${props => props.bgColor || 'transparent'};
`;
const RowContainer = styled.View`
  flex-direction: row;
`;

interface GridComponentProps<T> {
  columnNumber?: number; // 컬럼 개수
  data: T[]; // 데이터 배열
  renderItem: (props: {item: T}) => React.ReactNode; // 렌더링 함수
  isFull?: boolean; // 남는 공간에 빈 박스를 채울지 여부
  containerBgColor?: string; // 부모 컨테이너 배경색
  gridBgColor?: string; // 그리드 배경색
  gridSpaceBgColor?: string; // 그리드 빈 공간 배경색
  gridHeight?: number; // 그리드 높이
  maxHeight?: number;
}

export const GridComponent = <T extends unknown> ({
  columnNumber = 1,
  data,
  renderItem,
  isFull = false,
  containerBgColor = 'transparent',
  gridBgColor = 'transparent',
  gridSpaceBgColor = 'transparent',
  gridHeight,
}: GridComponentProps<T>) => {
  const validColumnNumber = Math.max(1, columnNumber);
  const dataLength = data.length;
  const getItem = (inputData: T[], index: number) => inputData[index];

  const renderItems = [];
  for (let i = 0; i < dataLength; i++) {
    const item = getItem(data, i);
    renderItems.push(
      <GridContainer
        bgColor={gridBgColor}
        key={i}
        height={gridHeight}
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
        bgColor={gridSpaceBgColor}
        height={gridHeight}
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

  return <Container bgColor={containerBgColor}>{rowRenderItems}</Container>;
};
