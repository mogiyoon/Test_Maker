import React, {useState} from 'react';
import {readItemIds} from '../../redux/TestChoiceSlice';
import _ from 'lodash';
import {dequeue, enqueue} from '../../services/Queue';
import {useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import {Alert} from 'react-native';
import {
  Button,
  ButtonStyleContainer,
  CenterTextContainer,
  Container,
  ExportContainer,
  ExportInnerContainer,
  GridContainer,
  RowContainer,
  Text,
} from '../../components/testTabScreen/ExportTab';
import { getLanguageSet } from '../../services/LanguageSet';
import { GridComponent } from '../../components/GridComponent';
import { AdmobReward } from '../../services/GoogleAd';
import { ExplainWindow } from '../../components/ExplainWindow';
import { ExportTabTutorialSet } from '../../constants/testTab/ExportTab';

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
  const [exportTestList, setExportTestList] = useState<any[]>([])
  const [exportAnswerList, setExportAnswerList] = useState<any[]>([])

  const exportNum = useSelector(state => state.exportNum.exportNum)
  const showExportNum = useSelector(state => state.showExportNum.showExportNum)

  const isInfoWindowOpen = useSelector((state) => state.infoWindow.isInfoWindowOpen)
  

  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  const copyToClipboard = (text) => {
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
      const choice = Math.floor(Math.random() * quizLength); // 랜덤 숫자뽑기, 운 나쁘면 O(n) 증가
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
    //init
    testProblem = '';
    testAnswer = '';

    const tempNoData = {
      problemMain : languageSet.NoData,
      first : '',
      second : '',
      third : '',
      fourth : '',
    }
    if (randomQuizQueue.length === 1) {
      setExportTestList([tempNoData]);
      return;
    }

    let num = 1
    let testNumber = '';
    const toExportTestList = []
    const toExportAnswerList = []

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

      let tempProblem = testNumber + mean;    
      const tempProblemDic = {
        problemMain : '',
        first : '',
        second : '',
        third : '',
        fourth : '',
      }
      tempProblemDic.problemMain = tempProblem

      if (choiceNodeList.length > 0) {
        firstChoice = '\t' + choiceNodeList[0].word;
        tempProblem = tempProblem + '\n' + '\n' + firstChoice;
        tempProblemDic.first = firstChoice
      }
      if (choiceNodeList.length > 1) {
        secondChoice = '\t' + choiceNodeList[1].word;
        tempProblem = tempProblem + '\n' + secondChoice;
        tempProblemDic.second = secondChoice
      }
      if (choiceNodeList.length > 2) {
        thirdChoice = '\t' + choiceNodeList[2].word;
        tempProblem = tempProblem + '\n' + thirdChoice;
        tempProblemDic.third = thirdChoice
      }
      if (choiceNodeList.length > 3) {
        fourthChoice = '\t' + choiceNodeList[3].word;
        tempProblem = tempProblem + '\n' + fourthChoice;
        tempProblemDic.fourth = fourthChoice
      }
      testProblem = testProblem + tempProblem + '\n' + '\n' + '\n';
      toExportTestList.push(tempProblemDic)

      let tempAnswer = testNumber + mean;
      const tempAnswerDic = {
        answerMain : '',
        answerValue : '',
      }
      tempAnswerDic.answerMain = tempAnswer

      const tempAnswerAnswer = '\t' + word;
      tempAnswerDic.answerValue = tempAnswerAnswer
      tempAnswer = tempAnswer + '\n' + '\n' + tempAnswerAnswer
      testAnswer = testAnswer + tempAnswer + '\n' + '\n' + '\n';
      toExportAnswerList.push(tempAnswerDic)

      //setting problem number
      num += 1
    }
    setExportTestList(toExportTestList)
    setExportAnswerList(toExportAnswerList)
  };

  const makeExportableTest = () => {
    tempSetting();
    randomQuizQueueSetting();
    makeProblem();
  };

  return (
    <Container>
      <RowContainer>
        <AdmobReward
          callBackFunction = {makeExportableTest}
          >
          <ButtonStyleContainer>
            <Text>{languageSet.Extract}</Text>
          </ButtonStyleContainer>
        </AdmobReward>
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
          <GridComponent
            data={exportTestList}
            renderItem={({item}) => (
              <GridContainer>
                <Text>{item.problemMain}</Text>
                <Text />
                <Text>{'\t' + item.first}</Text>
                <Text>{'\t' + item.second}</Text>
                <Text>{'\t' + item.third}</Text>
                <Text>{'\t' + item.fourth}</Text>
                <Text />
                <Text />
              </GridContainer>
            )}
          />
        </ExportInnerContainer>

        <CenterTextContainer>
          <Text>-{languageSet.Answer}-</Text>
        </CenterTextContainer>
        <ExportInnerContainer>
          <GridComponent
            data={exportAnswerList}
            renderItem={({item}) => (
              <GridContainer>
                <Text>{item.answerMain}</Text>
                <Text />
                <Text>{'\t' + item.answerValue}</Text>
                <Text />
                <Text />
              </GridContainer>
            )}
          />
        </ExportInnerContainer>
      </ExportContainer>
      {isInfoWindowOpen ? 
      <ExplainWindow>
        <ExportTabTutorialSet/>
      </ExplainWindow> : null}
    </Container>
  );
};
