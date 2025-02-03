import {testMakerRealm} from './TestMakerDB';
import {getLanguageSet, wordList} from '../services/LanguageSet';

export interface TestTreeCategory {
  categoryName: string;
  childId: string[];
  childCategory: TestTreeCategory[];
  parentCategory: TestTreeCategory | null;
}

export interface TestData {
  id: string;
  category: string;
  word: string;
  meaning: string;
}

export const testTree: TestTreeCategory[] = [
  {
    categoryName: 'Main',
    childId: [],
    childCategory: [],
    parentCategory: null,
  },
];

export const setMainLanguage = (inputData: string) => {
  testTree[0].categoryName = getLanguageSet(inputData).Main;
};

export const setTestTreeInsertList = (inputDataList: TestData[]) => {
  const data = inputDataList;
  data.forEach(element => {
    const categoryList = categoryAlign(element.category);
    const levelNum = 0;
    const node = categoryFinder(testTree[0], categoryList, levelNum, true);
    dataWriter(node, element);
  });
};

export const setTestTreeInsert = (inputData: TestData) => {
  const data = inputData;
  const categoryList = categoryAlign(data.category);
  const levelNum = 0;
  const node = categoryFinder(testTree[0], categoryList, levelNum, true);
  dataWriter(node, data);
};

const dataWriter = (node: TestTreeCategory, data: TestData) => {
  node.childId.push(data.id);
}; // 데이터 추가

const categoryWriter = (
  parentNode: TestTreeCategory,
  inputCategory: string,
) => {
  const category = {
    categoryName: inputCategory,
    childCategory: [],
    childId: [],
    parentCategory: parentNode,
  };
  parentNode.childCategory.push(category);
}; // 카테고리 추가

export const parentCategoryNameCollector = (
  nowCategory: TestTreeCategory,
  languageSet: wordList,
) => {
  let totalParentCategoryName = nowCategory.categoryName;
  let parentCategory = nowCategory.parentCategory;

  while (parentCategory !== null && parentCategory.categoryName !== languageSet.Main) {
    totalParentCategoryName =
      parentCategory.categoryName + '-' + totalParentCategoryName;
    parentCategory = parentCategory.parentCategory;
  }

  return totalParentCategoryName;
};

const childCategoryCollector = (
  nowCategory: TestTreeCategory,
  childCategoryList: string[],
  languageSet: wordList,
  realCategoryName: string = '',
) => {
  for (let i = 0; i < nowCategory.childCategory.length; i++) {
    let realChildCategoryName = '';
    if (realCategoryName === languageSet.Main || realCategoryName === '') {
      realChildCategoryName = nowCategory.childCategory[i].categoryName;
    } else {
      realChildCategoryName =
        realCategoryName + '-' + nowCategory.childCategory[i].categoryName;
    }
    childCategoryList.push(realChildCategoryName);
    if (nowCategory.childCategory[i].childCategory.length !== 0) {
      childCategoryCollector(
        nowCategory.childCategory[i],
        childCategoryList,
        languageSet,
        realChildCategoryName,
      );
    }
  }
};

export const childRealCategoryNameList = (
  nowCategory: TestTreeCategory,
  returnedList: string[],
  languageSet: wordList,
) => {
  const tempChildList: string[] = [];
  childCategoryCollector(nowCategory, tempChildList, languageSet);
  const tempParentName = parentCategoryNameCollector(nowCategory, languageSet);

  for (let i = 0; i < tempChildList.length; i++) {
    let tempName = '';
    if (tempParentName !== languageSet.Main) {
      tempName = tempParentName + '-' + tempChildList[i];
    } else {
      tempName = tempChildList[i];
    }
    returnedList.push(tempName);
  }
};

const categoryFinder = (
  parentNode: TestTreeCategory,
  categoryList: string[],
  levelNum: number,
  isWrite: boolean,
) => {
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

const categoryAlign = (category: string) => {
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
