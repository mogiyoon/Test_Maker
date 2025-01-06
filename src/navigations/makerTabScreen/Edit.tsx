import React, { useEffect, useState } from "react"
import { Dimensions } from "react-native"
import CheckBox from "@react-native-community/checkbox"
import { ButtonContainer, CheckBoxContainer, Container, FlatListContainer, MeaningContainer, ScrollableContainer, StyledButton, StyledFlatList, StyledText, StyledTextInput, WindowContainer, WordContainer } from "../../components/makerTabScreen/Edit"
import { useDispatch, useSelector } from "react-redux"
import { addTestRealmData } from "../../redux/RealmSlice"
import { setIsChanged } from "../../redux/ContentsSlice"
import { setIsTreeChanged, setTestTreeInsert } from "../../redux/TestTreeSlice"

let tempTestList = []
let toggleCheckBoxFunctionList = []
let allToggleSwitch = false
//TODO 체크박스 체크 후 저장까지
const FlatListComponent = ({word, meaning}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  if (!toggleCheckBoxFunctionList.includes(setToggleCheckBox)) {
    toggleCheckBoxFunctionList.push(setToggleCheckBox)
  }

  useEffect(() => {
    insertWord(toggleCheckBox, word)
  })
  
  return (
    <FlatListContainer>
      <CheckBoxContainer>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => {
            setToggleCheckBox(newValue)
          }}
          />
      </CheckBoxContainer>
      <WordContainer>
        <StyledText>
          {word}
        </StyledText>
      </WordContainer>
      <MeaningContainer>
        <StyledText>
          {meaning}
        </StyledText>
      </MeaningContainer>
    </FlatListContainer>
  )
}

let problemDictionary = {}
let problemDicList = []
let name = ''
let mean = ''

export const Edit = () => {
  const WindowWidth = Dimensions.get('window').width
  const content = useSelector((state) => state.content.contentData)
  const isChanged = useSelector((state) => state.contentChanged.isChanged)
  const myTestRedux = useSelector((state) => state.testRealm.realmData)

  name = useSelector((state) => state.wordFind.wordFind)
  mean = useSelector((state) => state.meanFind.meanFind)
  const dispatch = useDispatch()

  const [firstRender, setFirstRender] = useState(false)
  const [category, setCategory] = useState('')
 // setting 참고하여 단어와 뜻 나눔

  useEffect(() => {
    if (isChanged && !firstRender) {
      setFirstRender(true)
      tempTestList = []
      toggleCheckBoxFunctionList = []
      problemDictionary = {}
      problemDicList = []
      dispatch(setIsChanged(false))
    } // 렌더링 시 모든 기능 초기화
  }, [isChanged])

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false)
      const result = returnProblem(content, name, mean) // 문제 만들기 Auto 기능
      problemDicList = result.problemDicList
      problemDictionary = result.problemDictionary
    } // 두 번째 렌더 시 문제 추출
  }, [firstRender])
  
  return (
    <WindowContainer>

      {/*추가 버튼*/}
      <ButtonContainer width={WindowWidth}>
        <StyledTextInput
          value = {category}
          onChangeText={text => {
            setCategory(text)
          }}
          placeholder="Category"
        />
        <StyledButton
          onPress={() => selectAll(toggleCheckBoxFunctionList)}>
          <StyledText>Select All</StyledText>
        </StyledButton>
        <StyledButton
          onPress={() => {saveToMyTest(myTestRedux, dispatch, category)}}>
          <StyledText>Save</StyledText>
        </StyledButton>
      </ButtonContainer>

            {/*추가할 컨텐츠*/}
      <Container width={WindowWidth}>
        <StyledFlatList 
          data={problemDicList}
          renderItem={({item}) => (
            <FlatListComponent
              word={item}
              meaning={problemDictionary[item]}
            />
          )}
        />
      </Container>

            {/*컨텐츠 미리보기*/}
      <ScrollableContainer width={WindowWidth}>
        <StyledText>{content}</StyledText>
      </ScrollableContainer>
    </WindowContainer>
  )
}

function returnProblem (paragraph: string, name: string, mean: string) {
  const paragraphLength = paragraph.length
  console.log('return problem')
  console.log(name)
  console.log(mean)
  let tempNameOutput = ''
  let tempMeanOutput = ''

  for (let i = 0; i < paragraphLength; i++) {
    if (paragraph[i] === name[0]) {
      tempNameOutput = ''
      for (let j = 1; j < paragraphLength - i; j++) {
        if (paragraph[i + j] === name[1]) {
          i += j
          break
        }
        tempNameOutput += paragraph[i + j]
      }
    }

    if (paragraph[i] === mean[0]) {
      tempMeanOutput = ''
      for (let j = 1; j < paragraphLength - i; j++) {
        if (paragraph[i + j] === mean[1]) {
          if (!(tempNameOutput in problemDictionary)) {
            problemDictionary[tempNameOutput] = tempMeanOutput
            problemDicList.push(tempNameOutput)
          }
          i += j
          break
        }
        tempMeanOutput += paragraph[i + j]
      }
    }
  }

  return {problemDictionary, problemDicList}
}

function insertWord (toggleCheckBox, word) {
  if (toggleCheckBox === true) {
    if (!(tempTestList.includes(word))) {
      tempTestList.push(word)
    }
  } else {
    if ((tempTestList.includes(word))) {
      tempTestList = tempTestList.filter((test) => test !== word)
    }
  }
}

function saveToMyTest (myTest: string[], dispatch, categoryName) {
  for (let i = 0; i < tempTestList.length; i++) {
    const word = tempTestList[i]
    const meaning = problemDictionary[tempTestList[i]]
    const inputTimeKey = Date.now().toString()
    const dataToCheck = myTest.filter((item) => 
      item.category === categoryName && item.word === word)

    if (dataToCheck.length === 0) {
      const inputData = { 
        id: inputTimeKey, 
        category: categoryName, 
        word: word, 
        meaning: meaning}
      dispatch(addTestRealmData(inputData))
      setTestTreeInsert(inputData)
      dispatch(setIsTreeChanged(true))
    }
  }
}

function selectAll (inputToggleCheckBoxList) {
  if (allToggleSwitch === false) {
    for (let i = 0; i < inputToggleCheckBoxList.length; i++) {
      inputToggleCheckBoxList[i](true)
      allToggleSwitch = true
    }
  } else {
    for (let i = 0; i < inputToggleCheckBoxList.length; i++) {
      inputToggleCheckBoxList[i](false)
      allToggleSwitch = false
    }
  }
}