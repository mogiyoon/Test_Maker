import styled from 'styled-components/native';
import React, { useState } from 'react';
import { FlatListChild } from '../../navigations/makerTabScreen/MyTest';
import { useDispatch } from 'react-redux';

export const Container = styled.View`
  width: 100%;
  height: 100%;
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
export const OpenContainer = styled.TouchableOpacity``
export const JustContainer = styled.View``
export const CategoryContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 5px;
  background-color: ${({color}) => color};
`
export const CategoryText = styled.Text`
  font-size: 20px;
`

export const OpenCategoryContainer = ({title, children}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <OpenContainer
      onPress={() => setIsOpen(!isOpen)}>
      <CategoryContainer
        color = { isOpen ? '#ffcdcd' : '#ff9d9d' }>
        <CategoryText>
          {title}
        </CategoryText>
      </CategoryContainer>
      {isOpen ? (<JustContainer>
        {children}
      </JustContainer>):(null)}
    </OpenContainer>
  )
}

export const RecursionTreeFlatList = ({
  node, beforeCategoryName, testList
}) => {
  console.log('------rendered------')
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
      <StyledFlatList
        data={node.childCategory}
        renderItem={({item : firstItem}) => (
          <RecursionTreeFlatList
            node={firstItem}
            beforeCategoryName={nowCategoryName}
            testList={testList}
          />
        )}
      />
      <StyledFlatList
          data={testList}
          renderItem={({item : secondItem}) =>{ 
            console.log('----------')
            console.log(secondItem.category)
            console.log(nowCategoryName)
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
export const StyledFlatList = styled.FlatList``;
export const TouchableContainer = styled.TouchableOpacity`
  margin: 5px;
`;
export const FlatListContainer = styled.View`
  flex-direction: row;
  background-color: #ffcdcd;
  min-height: 40px;
  width: 100%;
  padding: 4px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;
export const WordContainer = styled.View`
  background-color: #ffffff;
  min-height: 30px;
  width: 60px;
  padding: 5px;
  margin: 8px;
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
