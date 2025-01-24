import React, { useEffect, useState } from 'react';
import {
  Container,
  DataContainer,
  FlatListContainer,
  MeaningContainer,
  RecursionTreeFlatList,
  StyledText,
  FlatListTouchableContainer,
  WordContainer,
  ModifyContainer,
  ModifyText,
  ModifyTextInput,
  ModifyEvenRowContainer,
  ModifyButton,
  ModifyRowContainer,
  RemoveButton,
} from '../../components/makerTabScreen/MyTest';
import {useDispatch, useSelector} from 'react-redux';
import {modifyTestReamData, removeOneTestRealmData} from '../../redux/RealmSlice';
import {testTreeInitiate, testTree} from '../../redux/TestTreeSlice';
import {itemIdReset} from '../../redux/TestChoiceSlice';
import { getLanguageSet } from '../../services/LanguageSet';

export const FlatListChild = ({inputItem}) => {
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
      onLongPress={() => {
      }}>
      <FlatListContainer>
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

export const MyTest = () => {
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  const myTestList = useSelector(state => state.testRealm.realmData);

  const [myTestTree, setMyTestTree] = useState(testTree);
  const [nowCategory, setNowCategory] = useState(myTestTree[0]); // 현재 카테고리

  useEffect(() => {
    setNowCategory(myTestTree[0]);
  }, []);

  return (
    <Container>
      {myTestList.length === 0 ? (
        <DataContainer>
          <StyledText>{languageSet.NoData}</StyledText>
        </DataContainer>
      ) : (
        <RecursionTreeFlatList
          node={nowCategory}
          beforeCategoryName={''}
          testList={myTestList}
        />
      )}
    </Container>
  );
};
