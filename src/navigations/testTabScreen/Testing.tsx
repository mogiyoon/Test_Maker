import React, { useEffect, useState } from 'react'
import { Switch } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { readItemIds, setIsTestChanged } from '../../redux/TestChoiceSlice'
import { addWrongAnswerRealmData } from '../../redux/RealmSlice'
import { Button, ChoiceBox, Container, FlexContainer, MeaningContainer, RowContainer, RowContainerWithColor, TextBox, TextWriteBox } from '../../components/testTabScreen/Testing'
import _ from 'lodash'
import { dequeue, enqueue } from '../../services/Queue'

export const Testing = () => {
  const [isSubjective, setIsSubjective] = useState(false)
  const [nowNode, setNowNode] = useState({})
  const [answer, setAnswer] = useState('') // 주관식 답
  const [renderChoiceList, setRenderChoiceList] = useState([])

  const myTestList = useSelector((state) => state.testRealm.realmData)
  const _makeIdToNode = (InputId) => {
    const node = myTestList.find((value) => value.id === InputId)
    return node
  }

  const isTestChanged = useSelector((state) => state.testChanged.isTestChanged)
  const dispatch = useDispatch()

  //선택된 리스트 추출
  let tempQuizList = []
  let tempQuizQueue = []
  let tempQuizId = ''
  let testValue = {}

  const tempSetting = () => {
    tempQuizList = readItemIds()
    tempQuizQueue = _.cloneDeep(tempQuizList)
    tempQuizId = ''
  }

  //랜덤 큐 생성
  const randomQuizQueue = []
  const randomQuizQueueSetting = () => {
    while (tempQuizQueue.length > 0) {
      const quizQueueLength = tempQuizQueue.length
      const tempRandomNum = Math.floor(Math.random() * quizQueueLength)
      const tempDequeValue = dequeue(tempQuizQueue, tempRandomNum)
      enqueue(randomQuizQueue, tempDequeValue)
    }
    tempQuizId = dequeue(randomQuizQueue)
    testValue = _makeIdToNode(tempQuizId)
    setNowNode(testValue)
  }

  //랜덤 선택지 생성
  let answerNumber = 0
  let choiceList = []
  let choiceNodeList = []

  const _makeAnswerRandom = () => {
    answerNumber = Math.floor(Math.random() * 4)
  }
  const _makeChoiceRandom = () => {
    choiceList = []
    const quizLength = tempQuizList.length
    while (true) {
      const choice = Math.floor(Math.random() * quizLength);
      if (
        tempQuizId !== tempQuizList[choice] &&
        choiceList.find((item) => item === tempQuizList[choice]) === undefined
      ) {
        choiceList.push(tempQuizList[choice])
      }
      if (choiceList.length >= 3 || choiceList.length >= quizLength) {
        choiceList.splice(answerNumber, 0, tempQuizId)
        break
      }
    }
  }
  const _makeListToNodeList = () => {
    choiceNodeList = []
    for (let i = 0; i < choiceList.length; i++) {
      const tempNode = _makeIdToNode(choiceList[i])
      choiceNodeList.push(tempNode)
    }
  }
  const choiceMaker = () => {
    _makeAnswerRandom()
    _makeChoiceRandom()
    _makeListToNodeList()
    setRenderChoiceList(choiceNodeList)
  }

  useEffect(() => {
    tempSetting()
    randomQuizQueueSetting()
    choiceMaker()
  }, [])

  if (isTestChanged) {
    tempSetting()
    randomQuizQueueSetting()
    choiceMaker()
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
        {nowNode !== undefined ? (
          <TextBox>
            {nowNode.meaning}
          </TextBox>
        ) : (
          <TextBox>
            No data Chosen
          </TextBox>
        )}
      </MeaningContainer>
      
      {isSubjective ? (
        // 주관식
        <Container>
          {nowNode !== undefined ? (
            <Container>
              <TextWriteBox 
                value={answer}
                onChangeText={(text) => setAnswer(text)}
                placeholder='Answer'  
              />
              <RowContainer>
                <Button
                  onPress={() => {
                    if((nowNode.word) === answer) {
                      console.log('answer true')
                    } else {
                      // dispatch(addWrongAnswerRealmData(testValue))
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
            <Container />
          )}

        </Container>
      ) : (

        // 객관식
        <Container>
          {renderChoiceList.length > 0 ? (
            <Container>
              <RowContainer>
                <ChoiceBox
                  onPress={() => {
                    if ((nowNode.word) === renderChoiceList[0].word) {
                      console.log(true)
                    } else {
                      console.log(false)
                    }
                  }}
                >
                  <TextBox>
                    {renderChoiceList[0].word}
                  </TextBox>
                </ChoiceBox>
                <ChoiceBox
                  onPress={() => {
                    if ((nowNode.word) === renderChoiceList[1].word) {
                      console.log(true)
                    } else {
                      console.log(false)
                    }
                  }}
                
                >
                  <TextBox>
                    {renderChoiceList[1].word}
                  </TextBox>
                </ChoiceBox>
              </RowContainer>
              <RowContainer>
                <ChoiceBox
                  onPress={() => {
                    if ((nowNode.word) === renderChoiceList[2].word) {
                      console.log(true)
                    } else {
                      console.log(false)
                    }
                  }}
                >
                  <TextBox>
                    {renderChoiceList[2].word}
                  </TextBox>
                </ChoiceBox>
                <ChoiceBox
                  onPress={() => {
                    if ((nowNode.word) === renderChoiceList[3].word) {
                      console.log(true)
                    } else {
                      console.log(false)
                    }
                  }}
                >
                  <TextBox>
                    {renderChoiceList[3].word}
                  </TextBox>
                </ChoiceBox>
              </RowContainer>
              <Button
                onPress={() => {
                }}>
                <TextBox>
                  Pass
                </TextBox>
              </Button>
            </Container>
          ) : (
            <Container />
          )}
        </Container>
      )}



    </Container>
  )
}
 