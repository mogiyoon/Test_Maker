import { useContext } from "react"
import styled from "styled-components/native"
import SettingContext from "../../context/setting"

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const StyledText = styled.Text`
  font-size: 12px;
`

const useSetting = () => useContext(SettingContext)

let writing = 'the real thing is (dummy data) which is [that paragraph] the real thing is (dummy datae) which is [that paragraph]'

export const Edit = () => {
  const setting = useSetting()
  const name = setting.name
  const mean = setting.mean

  const result = returnProblem(writing, name, mean)
  const problemDicList = result.problemDicList
  const problemDictionary = result.problemDictionary
  console.log(problemDicList)
  console.log(problemDictionary)
  
  return (
    <Container>
      <StyledText>{result.problemDicList[0]}</StyledText>
    </Container>
  )
}

function returnProblem (paragraph, name, mean) {
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