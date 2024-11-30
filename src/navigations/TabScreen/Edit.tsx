import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components/native"
import SettingContext from "../../context/Setting"
import { useContentContext } from "../../context/Contents"
import { Dimensions } from "react-native"
import CheckBox from "@react-native-community/checkbox"
import { testRealm } from "../../context/MyTest"

const StyledFlatList = styled.FlatList`
`
const FlatListContainer = styled.View`
  flex-direction: row;
  background-color: #B4B4DC;
  min-height: 40px;
  width: ${({width}) => width}px;
  margin: 2px;
  padding: 4px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  `
const CheckBoxContainer = styled.View`
  min-height: 10px;
  min-width: 10px;
  margin: 4px;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
  `
const WordContainer = styled.View`
  background-color: #FFFFFF;
  min-height: 30px;
  width: 60px;
  padding: 5px;
  margin: 8px;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
  `
const MeaningContainer = styled.View`
  background-color: #FFFFFF;
  flex: 1;
  min-height: 30px;
  padding: 8px;
  margin: 4px;
  border-radius: 2px;
  justify-content: center;
  `

let tempTestList = []
let toggleCheckBoxFunctionList = []
let allToggleSwitch = false

const FlatListComponent = ({word, meaning}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  if (!toggleCheckBoxFunctionList.includes(setToggleCheckBox)) {
    toggleCheckBoxFunctionList.push(setToggleCheckBox)
  }

  useEffect(() => {
    insertWord(toggleCheckBox, word)
  }, [toggleCheckBox])
  
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

const WindowContainer = styled.View`
  background-color: #28A0FF;
  flex: 1;
  justify-content: start;
  align-items: center;
`
const Container = styled.View`
  background-color: #FFFFFF;
  flex: 1;
  margin: 8px;
  padding: 8px;
  border-radius: 15px;
  justify-content: start;
  align-items: start;
  width: ${({width}) => width - 20}px;
`
const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: start;
  width: ${({width}) => width}px;
  height: 50px;
`
const StyledButton = styled.TouchableOpacity`
  background-color: #FFFFFF;
  height: 30px;
  width: 80px;
  margin: 8px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`
const StyledText = styled.Text`
  font-size: 12px;
`
const StyledTextInput = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  textAlign: 'center',
})`
  background-color: #FFFFFF;
  height: 30px;
  width: 80px;
  margin: 8px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`

let myTest = testRealm.objects('MyTest') // 내부 저장소
const useSetting = () => useContext(SettingContext) // 

let problemDictionary = {}
let problemDicList = []

export const Edit = () => {
  const {content, setContent, isChanged, setIsChanged} = useContentContext()
  const WindowWidth = Dimensions.get('window').width

  const [category, setCategory] = useState('')

  const setting = useSetting() // setting 참고하여 단어와 뜻 나눔
  const name = setting.name
  const mean = setting.mean

  if (isChanged === true) {
    toggleCheckBoxFunctionList = []
    problemDictionary = {}
    problemDicList = []
    const result = returnProblem(content, name, mean) // 문제 만들기 Auto 기능
    problemDicList = result.problemDicList
    problemDictionary = result.problemDictionary
    setIsChanged(false)
  }
  
  return (
    <WindowContainer>
      {/*화면 윗부분*/}
      <Container width={WindowWidth}>
        <StyledText>{content}</StyledText>
      </Container>
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
  if (toggleCheckBox === false) {
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
        console.log(myTest)
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