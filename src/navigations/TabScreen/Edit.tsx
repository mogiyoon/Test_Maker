import React, { useContext } from "react"
import styled from "styled-components/native"
import SettingContext from "../../context/Setting"
import { useContentContext } from "../../context/Contents"
import { Dimensions } from "react-native"

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

const useSetting = () => useContext(SettingContext)
const useContent = () => useContentContext()


export const Edit = () => {
  const WindowWidth = Dimensions.get('window').width

  const setting = useSetting() // setting 참고하여 단어와 뜻 나눔
  const name = setting.name
  const mean = setting.mean

  const content = useContent()
  let writing = content.content // TextBox에서 데이터 불러옴
  console.log(content)

  const result = returnProblem(writing, name, mean) // 문제 만들기 Auto 기능
  const problemDicList = result.problemDicList
  const problemDictionary = result.problemDictionary
  console.log(problemDictionary)
  
  return (
    <WindowContainer>
      <Container width={WindowWidth}>
        <StyledText>{writing}</StyledText>
      </Container>
      <Container width={WindowWidth}>
        <StyledText>{problemDicList} : {problemDictionary[problemDicList[0]]}</StyledText>
      </Container>
      <ButtonContainer width={WindowWidth}>
        <StyledButton>
          <StyledText>Save</StyledText>
        </StyledButton>
        <StyledButton>
          <StyledText>Delete</StyledText>
        </StyledButton>
      </ButtonContainer>
    </WindowContainer>
  )
}

function returnProblem (paragraph: string, name: string, mean: string) {
  const problemDictionary = {}
  const problemDicList = []
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
          problemDictionary[tempName] = tempMean
          problemDicList.push(tempName)
          i += j
          break
        }
        tempMean += paragraph[i + j]
      }
    }
  }

  return {problemDictionary, problemDicList}
}