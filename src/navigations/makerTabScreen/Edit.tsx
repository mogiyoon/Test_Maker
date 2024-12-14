import React, { useContext, useEffect, useState } from "react"
import { useContentContext } from "../../context/Contents"
import { Dimensions } from "react-native"
import CheckBox from "@react-native-community/checkbox"
import { testRealm } from '../../db/MyTestDB'
import { ButtonContainer, CheckBoxContainer, Container, FlatListContainer, MeaningContainer, ScrollableContainer, StyledButton, StyledFlatList, StyledText, StyledTextInput, WindowContainer, WordContainer } from "../../components/makerTabScreen/Edit"
import { readMakerSetting } from "../../db/MakerSettingAsyncStorage"

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


let myTest = testRealm.objects('MyTest') // 내부 저장소
let problemDictionary = {}
let problemDicList = []
let name = ''
let mean = ''

export const Edit = () => {
  const WindowWidth = Dimensions.get('window').width
  const {content, setContent, isChanged, setIsChanged, isUsingOCR, setIsUsingOCR} = useContentContext()
  const [firstRender, setFirstRender] = useState(false)
  const [secondRender, setSecondRender] = useState(false)
  const [category, setCategory] = useState('')

  const makerSettingApply = async() => { 
    const tempName = await readMakerSetting('name')
    const tempMean = await readMakerSetting('mean')
    if (
      name !== tempName ||
      mean !== tempMean
    ) {
      name = tempName
      mean = tempMean
      setIsChanged(true)
    }
  } // setting 참고하여 단어와 뜻 나눔

  useEffect(() => {
    if (isChanged && !firstRender) {
      setFirstRender(true)
      tempTestList = []
      toggleCheckBoxFunctionList = []
      problemDictionary = {}
      problemDicList = []
      setIsChanged(false)
    } // 렌더링 시 모든 기능 초기화
  }, [isChanged])

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false)
      const result = returnProblem(content, name, mean) // 문제 만들기 Auto 기능
      problemDicList = result.problemDicList
      problemDictionary = result.problemDictionary
      setSecondRender(true)
    } // 두 번째 렌더 시 문제 추출
    makerSettingApply()
  }, [firstRender])
  
  return (
    <WindowContainer>
      {/*화면 윗부분*/}
      <ScrollableContainer width={WindowWidth}>
        <StyledText>{content}</StyledText>
      </ScrollableContainer>
      {/*화면 아랫부분*/}
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
      {/*화면 아래 버튼*/}
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
          onPress={() => {saveToMyTest(category)}}>
          <StyledText>Save</StyledText>
        </StyledButton>
      </ButtonContainer>
    </WindowContainer>
  )
}

function returnProblem (paragraph: string, name: string, mean: string) {
  const paragraphLength = paragraph.length
  let tempName = ''
  let tempMean = ''

  for (let i = 0; i < paragraphLength; i++) {
    if (paragraph[i] === name[0]) {
      tempName = ''
      for (let j = 1; j < paragraphLength - i; j++) {
        if (paragraph[i + j] === name[1]) {
          i += j
          break
        }
        tempName += paragraph[i + j]
      }
    }

    if (paragraph[i] === mean[0]) {
      tempMean = ''
      for (let j = 1; j < paragraphLength - i; j++) {
        if (paragraph[i + j] === mean[1]) {
          if (!(tempName in problemDictionary)) {
            problemDictionary[tempName] = tempMean
            problemDicList.push(tempName)
          }
          i += j
          break
        }
        tempMean += paragraph[i + j]
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

function saveToMyTest (categoryName) {
  for (let i = 0; i < tempTestList.length; i++) {

    const word = tempTestList[i]
    const meaning = problemDictionary[tempTestList[i]]
    const inputTimeKey = Date.now().toString()
    const dataToCheck = testRealm.objects('MyTest').filtered(`category == "${categoryName}" AND word == "${word}"`)

    if (dataToCheck.length === 0) {
      testRealm.write(() => {
        testRealm.create('MyTest', { id: inputTimeKey, category: categoryName, word: word, meaning: meaning})
      })
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