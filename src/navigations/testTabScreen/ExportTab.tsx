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
  ExportContainer,
  ExportInnerContainer,
  RowContainer,
  Text,
} from '../../components/testTabScreen/ExportTab';
import { getLanguageSet } from '../../services/LanguageSet';
import { returnContentPlusBlank } from '../../services/ChoreFunction';

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

  const exportNum = useSelector(state => state.exportNum.exportNum)
  const showExportNum = useSelector(state => state.showExportNum.showExportNum)

  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  const copyToClipboard = text => {
    Clipboard.setString(text);
    Alert.alert(languageSet.CopiedToClipBoard);
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
    let quizNumber = tempQuizQueue.length
    if (exportNum !== 0) {
      if (quizNumber > exportNum) {
        quizNumber = exportNum
      }
    }
    while (quizNumber > 0) {
      const quizQueueLength = tempQuizQueue.length;
      const tempRandomNum = Math.floor(Math.random() * quizQueueLength);
      const tempDequeValue = dequeue(tempQuizQueue, tempRandomNum);
      enqueue(randomQuizQueue, tempDequeValue);
      quizNumber -= 1;
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
      setExportTestContents(languageSet.NoData);
      return;
    }

    let num = 1
    let testNumber = '';
    while (randomQuizQueue.length > 0) {
      tempQuizId = dequeue(randomQuizQueue);
      if (tempQuizId === '00000000') {
        break;
      }
      if (showExportNum === true) {
        testNumber = String(num) + '. '
      }
      
      testValue = _makeIdToNode(tempQuizId);
      choiceMaker();
      const mean = testValue.meaning;
      const word = testValue.word;
      let firstChoice = '';
      let secondChoice = '';
      let thirdChoice = '';
      let fourthChoice = '';

      testProblem =  testProblem + testNumber + mean;
      testAnswer = testAnswer + testNumber + mean;
      num += 1

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
      testAnswer = testAnswer + '\n' + '\n' + '\t' + word;

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
          <Text>{languageSet.Extract}</Text>
        </Button>
        <Button
          onPress={() => {
            copyToClipboard(
              languageSet.Problem + '\n' + testProblem + languageSet.Answer + '\n' + testAnswer,
            );
          }}>
          <Text>{languageSet.Copy}</Text>
        </Button>
      </RowContainer>

      <ExportContainer>
        <CenterTextContainer>
          <Text>-{languageSet.Problem}-</Text>
        </CenterTextContainer>
        <ExportInnerContainer>
          <Text>
            {returnContentPlusBlank(exportTestContents)}
          </Text>
        </ExportInnerContainer>
        <CenterTextContainer>
          <Text>-{languageSet.Answer}-</Text>
        </CenterTextContainer>
        <ExportInnerContainer>
          <Text>
            {returnContentPlusBlank(exportAnswerContents)}
          </Text>
        </ExportInnerContainer>
      </ExportContainer>
    </Container>
  );
};
