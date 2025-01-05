import React, { useState } from 'react'
import { Dimensions, Switch } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { readItemIds, setIsTestChanged } from '../../redux/TestChoiceSlice'
import { addWrongAnswerRealmData } from '../../redux/RealmSlice'
import { setWordInsideMean } from '../../redux/MakerSettingSlice'

const windowWidth = Dimensions.get('window').width

const Container = styled.View`
  align-items: center;
  justify-content: center;
  margin: 5px;
`
const RowContainerWithColor = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #c3c7ff;
  padding: 4px;
`
const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px;
`
const WordContainer = styled.View`
  height: 50px;
  background-color: #ada7f4;
  justify-content: center;
  align-items: center;
  margin: 5px;
  padding: 5px;
` 
const MeaningContainer = styled.View`
width: ${windowWidth * 0.95}px;
background-color: #c4c0f4;
justify-content: center;
align-items: center;
margin: 5px;
padding: 10px;
border-radius: 5px;
` 
const FlexContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 2px;
`
const TextBox = styled.Text`
  font-size: 15px;
`

const TextWriteBox = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  textAlignVertical: 'top',
  multiline: true,
})`
  height: 50px;
  background-color: #FFFFFF;
  border-radius: 8px;
  border: 1px;
  padding: 10px;
  font-size: 20px;
  `
const Button = styled.TouchableOpacity`
  height: 25px;
  width: 60px;
  border-radius: 15px;
  background-color: #ffcaca;
  justify-content: center;
  align-items: center;
  margin: 10px;
`

export const Testing = () => {
  const [isSubjective, setIsSubjective] = useState(false)
  const [quizList, setQuizList] = useState([])
  const [quizId, setQuizId] = useState('')
  const [answer, setAnswer] = useState('')
  const isTestChanged = useSelector((state) => state.testChanged.isTestChanged)
  const myTestList = useSelector((state) => state.testRealm.realmData)
  const testValue = myTestList.find((value) => value.id === quizId)
  const dispatch = useDispatch()

  if (isTestChanged) {
    const tempList = readItemIds()
    setQuizList(tempList)
    setQuizId(tempList[0])
    dispatch(setIsTestChanged(false))
  }

  return (
    <Container>
      <RowContainerWithColor>
        <FlexContainer>
          <TextBox>
            Choice
          </TextBox>
        </FlexContainer>
        <FlexContainer>
          <Switch
            value={isSubjective}
            onValueChange={(value) => setIsSubjective(value)}
          />
          </FlexContainer>
        <FlexContainer>
          <TextBox>
            Short-answer
          </TextBox>
        </FlexContainer>
      </RowContainerWithColor>

      <MeaningContainer>
        {quizList.length !== 0 ? (
          <TextBox>
            {testValue.meaning}
          </TextBox>
        ) : (
          <TextBox>
            No data Chosen
          </TextBox>
        )}
      </MeaningContainer>
      
      {isSubjective ? (
        <Container>
          <TextWriteBox 
            value={answer}
            onChangeText={(text) => setAnswer(text)}
            placeholder='Answer'  
          />
          <RowContainer>
            <Button
              onPress={() => {
                if((testValue.word) === answer) {
                } else {
                  dispatch(addWrongAnswerRealmData(testValue))
                }
              }}>
              <TextBox>OK</TextBox>
            </Button>
            <Button>
              <TextBox>Pass</TextBox>
            </Button>
          </RowContainer>
        </Container>
      ) : (
        <Container>
          <WordContainer>
            {quizList.length !== 0 ? (
              <TextBox>
                {testValue.word}
              </TextBox>
            ) : (
              <Container>
              </Container>
            )}
          </WordContainer>
          <Button>
            <TextBox>
              Pass
            </TextBox>
          </Button>
        </Container>
      )}



    </Container>
  )
}
 