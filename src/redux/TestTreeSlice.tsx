import {testMakerRealm} from '../db/TestMakerDB';

export const testTree = [
  {
    categoryName: 'Main',
    childId: [],
    childCategory: [],
    parentCategory: null,
  },
];

export const setTestTreeInsertList = inputData => {
  const data = inputData;
  data.forEach(element => {
    const categoryList = categoryAlign(element.category);
    const levelNum = 0;
    const node = categoryFinder(testTree[0], categoryList, levelNum, true);
    dataWriter(node, element);
  });
};

export const setTestTreeInsert = inputData => {
  const data = inputData;
  const categoryList = categoryAlign(data.category);
  const levelNum = 0;
  const node = categoryFinder(testTree[0], categoryList, levelNum, true);
  dataWriter(node, data);
};

export const setTestTreeRemove = inputData => {
  const data = inputData;
  const categoryList = categoryAlign(data.category);
  const levelNum = 0;
  const node = categoryFinder(state.testTree[0], categoryList, levelNum, true);
  dataRemover(node, data.id);
};

const dataWriter = (node, data) => {
  node.childId.push(data.id);
}; // 데이터 추가

const dataRemover = (node, id) => {
  console.log((node.childId = node.childId.filter(item => item !== id)));
};

const categoryWriter = (parentNode, inputCategory) => {
  const category = {
    categoryName: inputCategory,
    childCategory: [],
    childId: [],
    parentCategory: parentNode,
  };
  parentNode.childCategory.push(category);
}; // 카테고리 추가

const categoryFinder = (parentNode, categoryList, levelNum, isWrite) => {
  for (const node of parentNode.childCategory) {
    if (node.categoryName === categoryList[levelNum]) {
      // 노드의 카테고리 이름과 리스트의 카테고리 이름이 일치
      if (categoryList.length > levelNum + 1) {
        // 카테고리 리스트에 남은 카테고리가 있음
        const result = categoryFinder(
          node,
          categoryList,
          levelNum + 1,
          isWrite,
        );
        if (result) {
          return result;
        }
      } else {
        // 카테고리 리스트에 남은 카테고리가 없음
        return node;
      }
    }
  }
  if (isWrite) {
    // Finder가 Read뿐만 아니라 Write도 할 경우
    categoryWriter(parentNode, categoryList[levelNum]); // 없는 카테고리 추가
    const result = categoryFinder(parentNode, categoryList, levelNum, isWrite); // Finder 재실행
    return result; // 결과값은 항상 Node가 나옴
  } else {
    return null;
  }
};

const categoryAlign = category => {
  const categoryList = [];
  let categoryName = '';
  for (let i = 0; i < category.length; i++) {
    if (category[i] !== '-') {
      categoryName += category[i];
    } else {
      categoryList.push(categoryName);
      categoryName = '';
    }
  }
  categoryList.push(categoryName);
  return categoryList;
}; // category를 노드 리스트로 변환

export const testTreeInitiate = () => {
  const myTest = testMakerRealm.objects('MyTest');
  const refinedMyTest = myTest.toJSON();
  testTree[0].childId = [];
  testTree[0].childCategory = [];
  setTestTreeInsertList(refinedMyTest);
};
