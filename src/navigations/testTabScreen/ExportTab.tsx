import React, {useState} from 'react';
import {readItemIds} from '../../redux/TestChoiceSlice';
import _ from 'lodash';
import {dequeue, enqueue} from '../../services/Queue';
import {useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import {Alert} from 'react-native';
import {
  Button,
  CenterTextContainer,
  Container,
  LeftContainer,
  RowContainer,
  Text,
} from '../../components/testTabScreen/ExportTab';

let tempQuizList = [];
let tempQuizQueue = [];
let tempQuizId = '';

let randomQuizQueue = [];
let testValue = '';
let answerNumber = 0;
let choiceList = [];
let choiceNodeList = [];

let testProblem = '';
let testAnswer = '';

export const ExportTab = () => {
  const [exportTestContents, setExportTestContents] = useState('');
  const [exportAnswerContents, setExportAnswerContents] = useState('');

  const copyToClipboard = text => {
    Clipboard.setString(text);
    Alert.alert('copied to clipboard');
  };

  const myTestList = useSelector(state => state.testRealm.realmData);
  const _makeIdToNode = InputId => {
    const node = myTestList.find(value => value.id === InputId);
    return node;
  };

  //선택된 리스트 추출
  const tempSetting = () => {
    tempQuizList = readItemIds();
    tempQuizQueue = _.cloneDeep(tempQuizList);
    tempQuizId = '';
  };

  //랜덤 큐 생성
  const randomQuizQueueSetting = () => {
    randomQuizQueue = [];
    while (tempQuizQueue.length > 0) {
      const quizQueueLength = tempQuizQueue.length;
      const tempRandomNum = Math.floor(Math.random() * quizQueueLength);
      const tempDequeValue = dequeue(tempQuizQueue, tempRandomNum);
      enqueue(randomQuizQueue, tempDequeValue);
    }
    enqueue(randomQuizQueue, '00000000'); //큐의 마지막
  };

  //랜덤 선택지 생성
  const _makeAnswerRandom = () => {
    answerNumber = Math.floor(Math.random() * 4);
  };
  const _makeChoiceRandom = () => {
    choiceList = [];
    const quizLength = tempQuizList.length;
    while (quizLength > 0) {
      const choice = Math.floor(Math.random() * quizLength);
      if (
        tempQuizId !== tempQuizList[choice] &&
        choiceList.find(item => item === tempQuizList[choice]) === undefined
      ) {
        choiceList.push(tempQuizList[choice]);
      }
      if (choiceList.length >= 3 || choiceList.length >= quizLength - 1) {
        choiceList.splice(answerNumber, 0, tempQuizId);
        break;
      }
    }
  };
  const _makeListToNodeList = () => {
    choiceNodeList = [];
    for (let i = 0; i < choiceList.length; i++) {
      const tempNode = _makeIdToNode(choiceList[i]);
      choiceNodeList.push(tempNode);
    }
  };
  const choiceMaker = () => {
    _makeAnswerRandom();
    _makeChoiceRandom();
    _makeListToNodeList();
  };

  const makeProblem = () => {
    testProblem = '';
    testAnswer = '';
    if (randomQuizQueue.length === 1) {
      setExportTestContents('No Data');
      return;
    }
    while (randomQuizQueue.length > 0) {
      tempQuizId = dequeue(randomQuizQueue);
      if (tempQuizId === '00000000') {
        break;
      }
      testValue = _makeIdToNode(tempQuizId);
      choiceMaker();
      const mean = testValue.meaning;
      const word = testValue.word;
      let firstChoice = '';
      let secondChoice = '';
      let thirdChoice = '';
      let fourthChoice = '';
      testProblem = testProblem + mean;
      testAnswer = testAnswer + mean;

      if (choiceNodeList.length > 0) {
        firstChoice = '\t' + choiceNodeList[0].word;
        testProblem = testProblem + '\n' + '\n' + firstChoice;
      }
      if (choiceNodeList.length > 1) {
        secondChoice = '\t' + choiceNodeList[1].word;
        testProblem = testProblem + '\n' + secondChoice;
      }
      if (choiceNodeList.length > 2) {
        thirdChoice = '\t' + choiceNodeList[2].word;
        testProblem = testProblem + '\n' + thirdChoice;
      }
      if (choiceNodeList.length > 3) {
        fourthChoice = '\t' + choiceNodeList[3].word;
        testProblem = testProblem + '\n' + fourthChoice;
      }
      testAnswer = testAnswer + '\n' + '\n' + word;

      testProblem = testProblem + '\n' + '\n' + '\n';
      testAnswer = testAnswer + '\n' + '\n' + '\n';
    }
    setExportTestContents(testProblem);
    setExportAnswerContents(testAnswer);
  };

  const makeExportableTest = () => {
    setExportTestContents('');
    tempSetting();
    randomQuizQueueSetting();
    makeProblem();
  };

  return (
    <Container>
      <RowContainer>
        <Button
          onPress={() => {
            makeExportableTest();
          }}>
          <Text>Export</Text>
        </Button>
        <Button
          onPress={() => {
            copyToClipboard(
              'Problem\n' + testProblem + 'Answer\n' + testAnswer,
            );
          }}>
          <Text>Copy</Text>
        </Button>
      </RowContainer>

      <LeftContainer>
        <CenterTextContainer>
          <Text>-Problem-</Text>
        </CenterTextContainer>
        <Text>
          {'\n'}
          {exportTestContents}
          {'\n'}
        </Text>
        <CenterTextContainer>
          <Text>-Answer-</Text>
        </CenterTextContainer>
        <Text>
          {'\n'}
          {exportAnswerContents}
        </Text>
      </LeftContainer>
    </Container>
  );
};
