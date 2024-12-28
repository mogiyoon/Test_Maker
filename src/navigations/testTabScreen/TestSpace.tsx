import React, { useEffect, useState } from "react"
import styled from "styled-components/native"
import { Dimensions } from "react-native"
import { useSelector } from "react-redux"

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Container = styled.View`
  width: ${windowWidth}px;
  height: ${windowHeight * 0.8}px;
  justify-content: center;
  align-items: center;
`
const FlexContainer = styled.View`
  flex: ${({flexSize}) => flexSize};
  width: 95%;
  height: 95%;
  background-color: #ff0000;
  justify-content: center;
  align-items: center;
  margin: 10px 5px;
  padding: 5px;
`
const RowContainer = styled.View`
  flex-direction: row;
  width: ${windowWidth};
  justify-content: space-evenly;
  align-items: center;
`
const TextContainer = styled.View`
  width: ${windowWidth}px;
  height: 100px;
  justify-content: center;
  align-items: center;
`
const StyledFlatList = styled.FlatList`
`
const StyledTitle = styled.Text`
  font-size: 30px;
`
const StyledText = styled.Text`
  font-size: 15px;
`
const StyledGrid = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: #858585;
`
const StyledButton = styled.TouchableOpacity`
width: 100px;
height: 50px;
justify-content: center;
align-items: center;
background-color: #858585;
`
const testTree = [
  {
    categoryName: 'Main',
    childId: [],
    childCategory: [],
    parentCategory: null,
  }
]

const testTreeInsert = (testTree, data) => {
  const categoryList = categoryAlign(data.category)
  const levelNum = 0
  const node = categoryFinder(testTree[0], categoryList, levelNum, data, true)
  dataWriter(node, data)
} // 테스트 트리 초기화

const dataWriter = (node, data) => {
  node.childId.push(data.id)
} // 데이터 추가

const categoryWriter = (node, parentNode, inputCategory) => {
  const category = {
    categoryName: inputCategory,
    childCategory: [],
    childId: [],
    parentCategory: parentNode,
  }
  node.childCategory.push(category)
} // 카테고리 추가

const categoryFinder = (parentNode, categoryList, levelNum, data, isWrite) => {
  for (const node of parentNode.childCategory) {
    if (node.categoryName === categoryList[levelNum]) { // 노드의 카테고리 이름과 리스트의 카테고리 이름이 일치
      if (categoryList.length > levelNum+1) { // 카테고리 리스트에 남은 카테고리가 있음
        const result = categoryFinder(parentNode.childCategory, categoryList, levelNum+1, data, isWrite)
        if (result) {
          return result
        }
      } else { // 카테고리 리스트에 남은 카테고리가 없음
        return node
      }
    }
  }
  if (isWrite) { // Finder가 Read뿐만 아니라 Write도 할 경우
    if (levelNum > 0) {
      categoryWriter(parentNode, categoryList[levelNum-1], categoryList[levelNum]) // 없는 카테고리 추가
    } else {
      categoryWriter(parentNode, testTree[0], categoryList[levelNum]) // 없는 카테고리 추가 (부모가 메인)
    }
    const result = categoryFinder(parentNode, categoryList, levelNum, data, isWrite) // Finder 재실행
    return result // 결과값은 항상 Node가 나옴
  } else {
    return null
  }
}

const categoryAlign = (category) => {
  const categoryList = []
  let categoryName = ''
  for (let i = 0; i < category.length; i++) {
    if (category[i] !== '-') {
      categoryName += category[i]
    } else {
      categoryList.push(categoryName)
      categoryName = ''
    }
  }
  categoryList.push(categoryName)
  return categoryList
} // category를 노드 리스트로 변환

export const TestSpace = () => {
  const myTestRedux = useSelector((state) => state.realm.realmData)
  const [dataList, setDataList] = useState(myTestRedux)
  const [nowCategory, setNowCategory] = useState() // 현재 카테고리
  const [inCategories, setInCategories] = useState([]) // 자식 카테고리를 보여줌(화면에 나오는 것)

  useEffect(() => {
    console.log('data list changed')
    if (dataList.length > 0) {
      for (let i = 0; i < dataList.length; i++) {
        testTreeInsert(testTree, dataList[i])
      }
      setNowCategory(testTree[0])
      setInCategories(testTree[0].childCategory)
    }
  }, [])

  return (
    <Container>
      <FlexContainer
        flexSize={4}>
        {nowCategory ? (
          <StyledTitle>{nowCategory.categoryName} Category</StyledTitle>
        ) : (
          <StyledTitle></StyledTitle>
        )}
        <StyledFlatList
          data={inCategories}
          renderItem={({item}) => (
            <StyledGrid
              onPress={() => {
                setNowCategory(item)
                setInCategories(item.childCategory)
              }}>
              <StyledTitle>
                {item.categoryName}
              </StyledTitle>
            </StyledGrid>
          )}
        />
      </FlexContainer>
      <FlexContainer
        flexSize={3}
      >
        <StyledTitle>
          Contained Item
        </StyledTitle>
        {nowCategory ? (<StyledFlatList
          data={nowCategory.childId}
          renderItem={({item}) => (
            <TextContainer>
              <StyledText>
                word : {myTestRedux.find((value) => value.id === item).word}
              </StyledText>
            </TextContainer>
          )}/>) : (
            <TextContainer>
              <StyledText>No data</StyledText>
            </TextContainer>
          )}
      </FlexContainer>
      <FlexContainer
        flexSize={1}>
        <RowContainer>
          <StyledButton
            onPress={() => {
              console.log('inCategories')
              console.log(inCategories)
              console.log('nowCategory')
              console.log(nowCategory)
              console.log(nowCategory.childId)}}
          />
          <StyledButton
            onPress={() => {
              if (nowCategory.parentCategory) {
                setNowCategory(nowCategory.parentCategory)
                setInCategories(nowCategory.parentCategory.childCategory)
              }
            }}
          >
            <StyledTitle>Back</StyledTitle>
          </StyledButton>
        </RowContainer>
      </FlexContainer>
    </Container>
  )
}