import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import { FlatListChild } from '../../navigations/makerTabScreen/MyTest';
import { GridComponent } from '../GridComponent';
import { useDispatch, useSelector } from 'react-redux';
import { removeCategoryTestRealmData } from '../../redux/RealmSlice';
import { getLanguageSet } from '../../services/LanguageSet';
import { itemIdReset } from '../../redux/TestChoiceSlice';
import { childRealCategoryNameList, parentCategoryNameCollector, TestData, TestTreeCategory } from '../../db/TestTree';

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
  font-size: 12px;
`;
export const NoDataText = styled.Text`
  font-size: 20px;
`
export const MaxHeightContainer = styled.View`
  height: 90%;
`

const JustContainer = styled.View`
`
const SessionSeparator = styled.View`
  min-height: 2px;
  margin: 4px;
  padding: 3px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: #ffcdcd;
  align-items: center;
  justify-content: center;
`

const CategoryContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 5px;
  background-color: ${({color}) => color};
  border-top-right-radius: ${({borderTopRightRadius}) => borderTopRightRadius}px;
  border-top-left-radius: ${({borderTopLeftRadius}) => borderTopLeftRadius}px;
`
const CategoryText = styled.Text`
  font-size: 20px;
`

const RemoveContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: red;
  margin: 0 5px;
  padding: 5px;
`

interface RemoveCategoryContainerProps {
  node: TestTreeCategory
  setIsOpenRemove: React.Dispatch<React.SetStateAction<boolean>>
}

export const RemoveCategoryContainer = ({node, setIsOpenRemove}: RemoveCategoryContainerProps) => {
  // 자기 자신 노드 추가
  const categoryList: string[] = []
  const nowRealCategory = parentCategoryNameCollector(node) 
  categoryList.push(nowRealCategory) 

  // 자식 노드 추가
  childRealCategoryNameList(node, categoryList)

  //언어 설정
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)
  const dispatch = useDispatch()

  return (
    <RemoveContainer
      onPress={() => {
        setIsOpenRemove(false)
        for (const category of categoryList) {
          dispatch(removeCategoryTestRealmData(category)) 
        }
        itemIdReset();
      }}
    >
      <CategoryText>
        {languageSet.RemoveThis} {node.categoryName} {languageSet.CategoryAfterRemove}
      </CategoryText>
    </RemoveContainer>
  )
}

//OpenContainer를 상위 Container로 만들기 위한 컴포넌트
const OpenContainer = styled.TouchableOpacity`
`

interface OpenCategoryContainerProps {
  node: TestTreeCategory
  realCategory: string
  children: React.ReactNode
}

export const OpenCategoryContainer = ({node, children}: OpenCategoryContainerProps) => {
  const title = node.categoryName
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)
  const testListModified = useSelector((state => state.testRealm.realmData))

  const [isOpenRemove, setIsOpenRemove] = useState(false)
  const [isOpenCategory, setIsOpenCategory] = useState(false)

  useEffect(() => {
    setIsOpenRemove(false)
  }, [testListModified])
  
  return (
    <JustContainer>
      <OpenContainer
        onLongPress={() => setIsOpenRemove(!isOpenRemove)}
        onPress={() => {
          setIsOpenCategory(!isOpenCategory)}}>
        <CategoryContainer
          color = { isOpenCategory ? '#ffcdcd' : '#ff9d9d' }
          borderTopRightRadius = { isOpenCategory ? 20 : 0 }
          borderTopLeftRadius = { isOpenCategory ? 20 : 0 }
        >
          <CategoryText>
            {title}
          </CategoryText>
        </CategoryContainer>
      </OpenContainer>
        {isOpenRemove && (title !== languageSet.Main) ? (
          <RemoveCategoryContainer
            node={node}
            setIsOpenRemove={setIsOpenRemove}
          />
        ):(null)}
        {isOpenCategory ? (
        <JustContainer>
          {children}
        </JustContainer>):(null)}
    </JustContainer>
  )
}

interface RecursionTreeFlatListProps {
  node: TestTreeCategory
  beforeCategoryName: string
  testList: TestData[]
}

export const RecursionTreeFlatList = ({
  node,
  beforeCategoryName,
  testList
  }: RecursionTreeFlatListProps) => {
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  let nowCategoryName = ''
  if (node.categoryName === languageSet.Main) {
  } else if (beforeCategoryName === '') {
    nowCategoryName = node.categoryName
  } else {
    nowCategoryName += beforeCategoryName + '-' + node.categoryName
  }

  return (
    <OpenCategoryContainer 
      node={node}
      realCategory={nowCategoryName}
    >
      <GridComponent //Category용 그리드 컴포넌트
        data={node.childCategory}
        renderItem={({item: firstItem}) => {
          return (
            <RecursionTreeFlatList
              node={firstItem}
              beforeCategoryName={nowCategoryName}
              testList={testList}
            />
          );
        }}
      />
      <GridComponent //단어 컴포넌트
        data={testList} // testList 데이터 활용
        maxHeight={400}
        renderItem={({item: secondItem}) => {
          return secondItem.category === nowCategoryName ? (
            <FlatListChild inputItem={secondItem} />
          ) : null;
        }}
      />
      <SessionSeparator>
        <CategoryText>
          {node.categoryName}
        </CategoryText>
      </SessionSeparator>
    </OpenCategoryContainer>
  );
}

export const FlatListTouchableContainer = styled.TouchableOpacity`
  margin: 4px;
`;
export const FlatListContainer = styled.View`
  flex-direction: row;
  background-color: #ffbfbf;
  min-height: 40px;
  width: 100%;
  padding: 2px;
  border-radius: 5px;
  border-bottom-left-radius: ${({borderBottomLeftRadius}) => borderBottomLeftRadius}px;
  border-bottom-right-radius: ${({borderBottomRightRadius}) => borderBottomRightRadius}px;
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
export const ModifyContainer = styled.View`
  padding: 10px;
  background-color: #ffbebe;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`
export const ModifyEvenRowContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 15px;
`
export const ModifyRowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 5px;
`
export const ModifyText = styled.Text`
`
export const ModifyTextInput = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  textAlign: 'center',
})`
  background-color: #ffffff;
  padding: 5px;
  margin-left: 4px;
  border-radius: 5px;
`
export const ModifyButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 60px;
  padding: 4px;
  border-radius: 5px;
  background-color: #ff7878;
`
export const RemoveButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 60px;
  padding: 4px;
  border-radius: 5px;
  background-color: #ff7878;
`