import React, { useEffect, useState } from "react"
import styled from "styled-components/native"
import { testRealm } from "../../db/MyTestDB"

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const StyledText = styled.Text`
  font-size: 30px;
`
const StyledButton = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  background-color: #000000;
`

const testTree = [
  {
    categoryName: 'rootCategory',
    childId: [],
    childCategory: [],
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

const categoryWriter = (node, inputCategory) => {
  const category = {
    categoryName: inputCategory,
    childCategory: [],
    childId: [],
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
    categoryWriter(parentNode, categoryList[levelNum]) // 없는 카테고리 추가
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
  const [dataList, setDataList] = useState([])

  useEffect(() => {
    const loadData = () => {
      const myTest = testRealm.objects('MyTest')
      setDataList(Array.from(myTest))
    }

    testRealm.objects('MyTest').addListener(loadData)
    return () => {
      testRealm.objects('MyTest').removeListener(loadData)
    }
  }, [])

  useEffect(() => {
    if (dataList.length > 0) {
      for (let i = 0; i < dataList.length; i++) {
        testTreeInsert(testTree, dataList[i])
      }
    }

  }, [dataList])

  return (
    <Container>
      <StyledButton
        onPress={() => {
          console.log(testTree)
        }}>
        <StyledText></StyledText>
      </StyledButton>
    </Container>
  )
}