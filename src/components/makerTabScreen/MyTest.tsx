import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import { GridComponent } from '../GridComponent';
import { useDispatch, useSelector } from 'react-redux';
import { modifyTestReamData, removeCategoryTestRealmData, removeOneTestRealmData } from '../../redux/RealmSlice';
import { getLanguageSet } from '../../services/LanguageSet';
import { itemIdReset } from '../../redux/TestChoiceSlice';
import { childRealCategoryNameList, parentCategoryNameCollector, TestData, TestTreeCategory, testTreeInitiate } from '../../db/TestTree';
import { placeHolerColor } from '../../services/ChoreFunction';

//For export
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
export const NoDataText = styled.Text`
  font-size: 20px;
`
export const MaxHeightContainer = styled.View`
  height: 90%;
`

//FlatList Recursion
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

const CategoryText = styled.Text`
  font-size: 20px;
`

//Container which have openable hook, removable hook
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

const JustContainer = styled.View`
`

//OpenContainer의 위치를 위쪽으로 만들기 위한 컴포넌트
const OpenContainer = styled.TouchableOpacity`
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

//Category which can remove category, lower category, child item
interface RemoveCategoryContainerProps {
  node: TestTreeCategory
  setIsOpenRemove: React.Dispatch<React.SetStateAction<boolean>>
}

export const RemoveCategoryContainer = ({node, setIsOpenRemove}: RemoveCategoryContainerProps) => {
  //언어 설정
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)
  const dispatch = useDispatch()

  // 자기 자신 노드 추가
  const categoryList: string[] = []
  const nowRealCategory = parentCategoryNameCollector(node, languageSet) 
  categoryList.push(nowRealCategory) 

  // 자식 노드 추가
  childRealCategoryNameList(node, categoryList, languageSet)

  return (
    <RemoveContainer
      onPress={() => {
        setIsOpenRemove(false)
        console.log(categoryList)
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

const RemoveContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: red;
  margin: 0 5px;
  padding: 5px;
`

//
interface FlatListChildProps {
  inputItem: TestData
}

export const FlatListChild = ({inputItem}: FlatListChildProps) => {
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  const [isModifyOpen, setIsModifyOpen] = useState(false)
  const [textInputCategory, setTextInputCategory] = useState('')
  const [textInputWord, setTextInputWord] = useState('')
  const [textInputMeaning, setTextInputMeaning] = useState('')
  const dispatch = useDispatch()

  return (
    <FlatListTouchableContainer
      onPress={() => {
        setIsModifyOpen(!isModifyOpen)
      }}
    >
      <FlatListContainer
        borderBottomLeftRadius={isModifyOpen ? 0 : 5}
        borderBottomRightRadius={isModifyOpen ? 0 : 5}
      >
        <WordContainer>
          <StyledText>{inputItem.word}</StyledText>
        </WordContainer>
        <MeaningContainer>
          <StyledText>{inputItem.meaning}</StyledText>
        </MeaningContainer>
      </FlatListContainer>
      {isModifyOpen ? (
        <ModifyContainer>
          <ModifyRowContainer>
            <ModifyText>
              {languageSet.Category} : 
            </ModifyText>
            <ModifyTextInput
              placeholder={inputItem.category}
              placeholderTextColor={placeHolerColor}
              value={textInputCategory}
              onChangeText={(value) => setTextInputCategory(value)}
            />
          </ModifyRowContainer>

          <ModifyRowContainer>
            <ModifyText>
              {languageSet.Word} :
            </ModifyText>
            <ModifyTextInput
              placeholder={inputItem.word}
              placeholderTextColor={placeHolerColor}
              value={textInputWord}
              onChangeText={(value) => setTextInputWord(value)}
            />
          </ModifyRowContainer>

          <ModifyRowContainer>
            <ModifyText>
              {languageSet.Meaning} :
            </ModifyText>
            <ModifyTextInput
              placeholder={inputItem.meaning}
              placeholderTextColor={placeHolerColor}
              value={textInputMeaning}
              onChangeText={(value) => setTextInputMeaning(value)}
            />
          </ModifyRowContainer>

          <ModifyEvenRowContainer>
            <ModifyButton // 수정 버튼
              onPress={() => {
                let newCategory = inputItem.category
                let newWord = inputItem.word
                let newMeaning = inputItem.meaning

                if (textInputCategory !== '') {
                  newCategory = textInputCategory
                }
                if (textInputWord !== '') {
                  newWord = textInputWord
                }
                if (textInputMeaning !== '') {
                  newMeaning = textInputMeaning
                }
                dispatch(modifyTestReamData({
                  id: inputItem.id,
                  category: newCategory,
                  word: newWord,
                  meaning: newMeaning,
                }))
                testTreeInitiate();
                itemIdReset();
              }}
            >
              <ModifyText>{languageSet.Modify}</ModifyText>
            </ModifyButton>

            <RemoveButton // 삭제 버튼
              onPress={() => {
                dispatch(removeOneTestRealmData(inputItem.id));
                testTreeInitiate();
                itemIdReset();
              }}
            >
              <ModifyText>{languageSet.Remove}</ModifyText>
            </RemoveButton>
          </ModifyEvenRowContainer>
        </ModifyContainer>
      ) : (
        null
      )}
    </FlatListTouchableContainer>
  );
};

const FlatListTouchableContainer = styled.TouchableOpacity`
  margin: 4px;
`;

const FlatListContainer = styled.View`
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

const WordContainer = styled.View`
  background-color: #ffffff;
  min-height: 30px;
  width: 60px;
  padding: 5px;
  margin: 4px;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 12px;
`;

const MeaningContainer = styled.View`
  background-color: #ffffff;
  flex: 1;
  min-height: 30px;
  padding: 8px;
  margin: 4px;
  border-radius: 2px;
  justify-content: center;
`;

const ModifyContainer = styled.View`
  padding: 10px;
  background-color: #ffbebe;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`

const ModifyRowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 5px;
`

const ModifyText = styled.Text`
`

const ModifyTextInput = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  textAlign: 'center',
})`
  background-color: #ffffff;
  padding: 5px;
  margin-left: 4px;
  border-radius: 5px;
`

const ModifyEvenRowContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 15px;
`

const ModifyButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 60px;
  padding: 4px;
  border-radius: 5px;
  background-color: #ff7878;
`

const RemoveButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 60px;
  padding: 4px;
  border-radius: 5px;
  background-color: #ff7878;
`