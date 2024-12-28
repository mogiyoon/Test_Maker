import { createSlice } from "@reduxjs/toolkit"
import { testRealm } from "../db/MyTestDB"
import { store } from "./ReduxStore"

export const treeSlice = createSlice({
  name: 'testTree',
  initialState: {testTree: [
    {
      categoryName: 'Main',
      childId: [],
      childCategory: [],
      parentCategory: null,
    }
  ]},
  reducers: {
    setTestTreeInsertList: (state, action) => {
      const data = action.payload
      data.forEach((element) => {
        const categoryList = categoryAlign(element.category)
        const levelNum = 0
        const node = categoryFinder(state.testTree, state.testTree[0], categoryList, levelNum, element, true)
        dataWriter(node, element)
      });
    },
    setTestTreeInsert: (state, action) => {
      const data = action.payload
      const categoryList = categoryAlign(data.category)
      const levelNum = 0
      const node = categoryFinder(state.testTree, state.testTree[0], categoryList, levelNum, data, true)
      dataWriter(node, data)
    },
    setTestTreeRemove: (state, action) => {
      const data = action.payload
      const categoryList = categoryAlign(data.category)
      const levelNum = 0
      const node = categoryFinder(state.testTree, state.testTree[0], categoryList, levelNum, data, true)
      dataRemover(node, data)
    }
  }
})

export const { setTestTreeInsertList, setTestTreeInsert, setTestTreeRemove } = treeSlice.actions

const dataWriter = (node, data) => {
  node.childId.push(data.id)
} // 데이터 추가

const dataRemover = (node, data) => {
  node.childId = node.childId.filter(((item) => 
    item.id !== id && item.word !== word)) 
}

const categoryWriter = (node, parentNode, inputCategory) => {
  const category = {
    categoryName: inputCategory,
    childCategory: [],
    childId: [],
    parentCategory: parentNode,
  }
  node.childCategory.push(category)
} // 카테고리 추가

const categoryFinder = (testTree, parentNode, categoryList, levelNum, data, isWrite) => {
  for (const node of parentNode.childCategory) {
    if (node.categoryName === categoryList[levelNum]) { // 노드의 카테고리 이름과 리스트의 카테고리 이름이 일치
      if (categoryList.length > levelNum+1) { // 카테고리 리스트에 남은 카테고리가 있음
        const result = categoryFinder(testTree, parentNode.childCategory, categoryList, levelNum+1, data, isWrite)
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
    const result = categoryFinder(testTree, parentNode, categoryList, levelNum, data, isWrite) // Finder 재실행
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

export const testTreeInitiate = () => {
  const myTest = testRealm.objects('MyTest')
  const refinedMyTest = myTest.toJSON()
  store.dispatch(setTestTreeInsertList(refinedMyTest))
}