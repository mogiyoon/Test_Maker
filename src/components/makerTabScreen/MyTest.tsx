import styled from 'styled-components/native';
import React, { useState } from 'react';
import { FlatListChild } from '../../navigations/makerTabScreen/MyTest';
import { useDispatch } from 'react-redux';
import { GridComponent } from '../GridComponent';

export const Container = styled.View`
  width: 100%;
  padding: 2px;
`;
export const DataContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`
export const StyledText = styled.Text`
  font-size: 10px;
`;
const OpenContainer = styled.TouchableOpacity`
`
const JustContainer = styled.View`
`

const CategoryContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 5px;
  background-color: ${({color}) => color};
`
const CategoryText = styled.Text`
  font-size: 20px;
`

export const OpenCategoryContainer = ({title, children}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <JustContainer>
      <OpenContainer
        onPress={() => setIsOpen(!isOpen)}>
        <CategoryContainer
          color = { isOpen ? '#ffcdcd' : '#ff9d9d' }>
          <CategoryText>
            {title}
          </CategoryText>
        </CategoryContainer>
      </OpenContainer>
        {isOpen ? (<JustContainer>
          {children}
        </JustContainer>):(null)}
    </JustContainer>
  )
}

export const RecursionTreeFlatList = ({
  node, beforeCategoryName, testList
  }) => {
  const dispatch = useDispatch()
  let nowCategoryName = ''
  if (node.categoryName === 'Main') {
  } else if (beforeCategoryName === '') {
    nowCategoryName = node.categoryName
  } else {
    nowCategoryName += beforeCategoryName + '-' + node.categoryName
  }

  return (
    <OpenCategoryContainer
      title={node.categoryName}
    >
      <GridComponent
        data={node.childCategory}
        renderItem={({item : firstItem}) => {

          return (<RecursionTreeFlatList
            node={firstItem}
            beforeCategoryName={nowCategoryName}
            testList={testList}
          />)
        }}
      />
      <GridComponent
          data={testList}
          maxHeight={400}
          renderItem={({item : secondItem}) =>{
            return secondItem.category === nowCategoryName ?  (
            <FlatListChild
              inputItem={secondItem}
              dispatch={dispatch}
            />) : (null
          )}}
        />   
    </OpenCategoryContainer>
  )
}
export const StyledFlatList = styled.FlatList`
`;
export const FlatListTouchableContainer = styled.TouchableOpacity`
  margin: 2px;
`;
export const FlatListContainer = styled.View`
  flex-direction: row;
  background-color: #ffbfbf;
  min-height: 40px;
  width: 100%;
  padding: 2px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;
export const WordContainer = styled.View`
  background-color: #ffffff;
  min-height: 30px;
  width: 60px;
  padding: 5px;
  margin: 4px;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
`;
export const MeaningContainer = styled.View`
  background-color: #ffffff;
  flex: 1;
  min-height: 30px;
  padding: 8px;
  margin: 4px;
  border-radius: 2px;
  justify-content: center;
`;
