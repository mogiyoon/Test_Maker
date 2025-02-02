import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {
  ButtonContainer,
  Container,
  MeaningContainer,
  ScrollableContainer,
  StyledButton,
  StyledText,
  StyledTextInput,
  WindowContainer,
  WordContainer,
  TouchBoxContainer,
} from '../../components/makerTabScreen/Edit';
import {useDispatch, useSelector} from 'react-redux';
import {addTestRealmData} from '../../redux/RealmSlice';
import {setIsChanged} from '../../redux/ContentsSlice';
import {setTestTreeInsert, TestData} from '../../db/TestTree';
import { GridComponent } from '../../components/GridComponent';
import { getLanguageSet } from '../../services/LanguageSet';
import { returnContentPlusBlank, placeHolerColor } from '../../services/ChoreFunction';

let tempTestList = [];
let toggleCheckBoxFunctionList = [];
let allToggleSwitch = false;

interface FlatListComponentProps {
  word: string
  meaning: string
}

const FlatListComponent = ({word, meaning}: FlatListComponentProps) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  if (!toggleCheckBoxFunctionList.includes(setToggleCheckBox)) {
    toggleCheckBoxFunctionList.push(setToggleCheckBox);
  }

  useEffect(() => {
    insertWord(toggleCheckBox, word);
  });

  return (
    <TouchBoxContainer
      value={toggleCheckBox}
      onPress={() => setToggleCheckBox(!toggleCheckBox)}>
      <WordContainer>
        <StyledText>{word}</StyledText>
      </WordContainer>
      <MeaningContainer>
        <StyledText>{meaning}</StyledText>
      </MeaningContainer>
    </TouchBoxContainer>
  );
};

let problemDictionary = {};
let problemDicList = [];
let name = '';
let mean = '';

export const Edit = () => {
  const content = useSelector(state => state.content.contentData);
  const isChanged = useSelector(state => state.contentChanged.isChanged);
  const myTestRedux = useSelector(state => state.testRealm.realmData);

  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  name = useSelector(state => state.wordFind.wordFind);
  mean = useSelector(state => state.meanFind.meanFind);
  const wordInsideMean = useSelector(state => state.wordInsideMean.wordInsideMean)
  const dispatch = useDispatch();

  const [firstRender, setFirstRender] = useState(false);
  const [category, setCategory] = useState('');
  // setting 참고하여 단어와 뜻 나눔

  const [allContent, setAllContent] = useState('');

  useEffect(() => {
    if (isChanged && !firstRender) {
      setFirstRender(true);
      tempTestList = [];
      toggleCheckBoxFunctionList = [];
      problemDictionary = {};
      problemDicList = [];
      dispatch(setIsChanged(false));
    } // 렌더링 시 모든 기능 초기화
  }, [isChanged]);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      let result = {}
      if (wordInsideMean) {
        result = returnProblemIn(content, name, mean);
      } else {
        result = returnProblemOut(content, name, mean); // 문제 만들기 Auto 기능
      }
      problemDicList = result.problemDicList;
      problemDictionary = result.problemDictionary;
    } // 두 번째 렌더 시 문제 추출
  }, [firstRender]);

  useEffect(() => {
    const tempAllContent = returnContentPlusBlank(content)
    setAllContent(tempAllContent)
  }, [content])

  return (
    <WindowContainer>
      {/*추가 버튼*/}
      <ButtonContainer>
        <StyledTextInput
          value={category}
          onChangeText={text => {
            setCategory(text);
          }}
          placeholder={languageSet.Category}
          placeholderTextColor={placeHolerColor}
        />
        <StyledButton onPress={() => selectAll(toggleCheckBoxFunctionList)}>
          <StyledText>{languageSet.ChooseAll}</StyledText>
        </StyledButton>
        <StyledButton
          onPress={() => {
            saveToMyTest(myTestRedux, dispatch, category);
          }}>
          <StyledText>{languageSet.Save}</StyledText>
        </StyledButton>
      </ButtonContainer>

      {/*추가할 컨텐츠*/}
      <Container>
        <GridComponent
          data={problemDicList}
          renderItem={({item}) => (
            <FlatListComponent word={item} meaning={problemDictionary[item]} />
          )}
        />
      </Container>

      {/*컨텐츠 미리보기*/}
      <ScrollableContainer>
        <StyledText>{allContent}</StyledText>
      </ScrollableContainer>
    </WindowContainer>
  );
};

function returnProblemOut (paragraph: string, name: string, mean: string) {
  const paragraphLength = paragraph.length;
  let nameDone = false
  let tempNameOutput = '';
  let tempMeanOutput = '';

  for (let search = 0; search < paragraphLength; search++) {
    if (paragraph[search] === name[0]) {
      tempNameOutput = '';
      for (let namePosition = 1; namePosition < paragraphLength - search; namePosition++) {
        if (paragraph[search + namePosition] === name[1]) {
          search += namePosition;
          nameDone = true // nameDone 관련 코드 작성하기
          break;
        }
        tempNameOutput += paragraph[search + namePosition];
      }
    }

    if (nameDone === true && paragraph[search] === mean[0]) {
      tempMeanOutput = '';
      for (let meanPosition = 1; meanPosition < paragraphLength - search; meanPosition++) {
        if (paragraph[search + meanPosition] === mean[1]) {
          if (!(tempNameOutput in problemDictionary)) {
            problemDictionary[tempNameOutput] = tempMeanOutput;
            problemDicList.push(tempNameOutput);
          }
          search += meanPosition;
          break;
        }
        tempMeanOutput += paragraph[search + meanPosition];
      }
    }
  }

  return {problemDictionary, problemDicList};
}

function returnProblemIn (paragraph: string, name: string, mean: string) {
  const paragraphLength = paragraph.length;
  let nameDone = false;
  let tempNameOutput = '';
  let tempMeanOutput = '';

  for (let search = 0; search < paragraphLength; search++) {
    if (paragraph[search] === mean[0]) {
      tempMeanOutput = '';
      for (let meanPosition = 1; meanPosition < paragraphLength - search; meanPosition++) { 
        if (paragraph[search + meanPosition] === name[0]) { //name이 발견되면
          tempNameOutput = '';
          for (let namePosition = 1; namePosition < paragraphLength - search - meanPosition; namePosition++) { //name 끝날 때까지 루프
            if (paragraph[search + meanPosition + namePosition] === name[1]) {
              meanPosition += namePosition + 1; //name out시 mean에 name 이동한만큼 더함
              nameDone = true
              tempMeanOutput += ' _____ '
              break;
            }
            tempNameOutput += paragraph[search + meanPosition + namePosition];
          }
        }

        if (paragraph[search + meanPosition] === mean[1]) {
          if (nameDone) {
            if (!(tempNameOutput in problemDictionary)) {
              problemDictionary[tempNameOutput] = tempMeanOutput;
              problemDicList.push(tempNameOutput);
            }
            search += meanPosition; // mean이 out된 이후에 search update
            nameDone = false
            break;
          } else {
            search += meanPosition;
            break
          }
        }
        tempMeanOutput += paragraph[search + meanPosition];
      }
    }
  }
  return {problemDictionary, problemDicList};
}

function insertWord(toggleCheckBox, word) {
  if (toggleCheckBox === true) {
    if (!tempTestList.includes(word)) {
      tempTestList.push(word);
    }
  } else {
    if (tempTestList.includes(word)) {
      tempTestList = tempTestList.filter(test => test !== word);
    }
  }
}

function saveToMyTest(myTest: string[], dispatch, categoryName: string) {
  if (tempTestList.length === 0) {
    return
  }
  if (categoryName === '') {
    //TODO 한글로 수정
    Alert.alert('No Category Name \n -Hint- \n Category can be divided by -')
    return
  }
  for (let i = 0; i < tempTestList.length; i++) {
    const word = tempTestList[i];
    const meaning = problemDictionary[tempTestList[i]];
    const inputTimeKey = Date.now().toString();
    const dataToCheck = myTest.filter(
      item => item.category === categoryName && item.word === word,
    );

    if (dataToCheck.length === 0) {
      const inputData: TestData = {
        id: inputTimeKey,
        category: categoryName,
        word: word,
        meaning: meaning,
      };
      dispatch(addTestRealmData(inputData));
      setTestTreeInsert(inputData);
    }
  }
}

function selectAll(inputToggleCheckBoxList) {
  if (allToggleSwitch === false) {
    for (let i = 0; i < inputToggleCheckBoxList.length; i++) {
      inputToggleCheckBoxList[i](true);
      allToggleSwitch = true;
    }
  } else {
    for (let i = 0; i < inputToggleCheckBoxList.length; i++) {
      inputToggleCheckBoxList[i](false);
      allToggleSwitch = false;
    }
  }
}