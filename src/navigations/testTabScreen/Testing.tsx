import React, {useEffect, useState} from 'react';
import {Switch} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {readItemIds, setIsTestChanged} from '../../redux/TestChoiceSlice';
import {addWrongAnswerRealmData} from '../../redux/RealmSlice';
import {
  Button,
  ChoiceBox,
  ScrollView,
  FlexContainer,
  MeaningContainer,
  RowContainer,
  RowContainerWithColor,
  TextBox,
  TextWriteBox,
  Container,
  ChoiceText,
  AnswerResultContainer,
} from '../../components/testTabScreen/Testing';
import _ from 'lodash';
import {dequeue, enqueue} from '../../services/Queue';
import { getLanguageSet } from '../../services/LanguageSet';
import { placeHolerColor } from '../../services/ChoreFunction';
import { AdMobBanner } from '../../services/GoogleAd';
import { ExplainWindow } from '../../components/ExplainWindow';

let tempQuizList = [];
let tempQuizQueue = [];
let tempQuizId = '';
let testValue = {};

let answerNumber = 0;
let choiceList = [];
let choiceNodeList = [];
let randomQuizQueue = [];

export const Testing = () => {
  const [isSubjective, setIsSubjective] = useState(false);
  const [isRight, setIsRight] = useState('');
  const [nowNode, setNowNode] = useState({});
  const [myAnswer, setMyAnswer] = useState(''); // 주관식 답
  const [renderChoiceList, setRenderChoiceList] = useState([]);

  const [wasExplain, setWasExplain] = useState('')
  const [wasAnswer, setWasAnswer] = useState('');
  const [wasReply, setWasReply] = useState('')

  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  const isInfoWindowOpen = useSelector((state) => state.infoWindow.isInfoWindowOpen)

  const myTestList = useSelector(state => state.testRealm.realmData);
  const _makeIdToNode = InputId => {
    const node = myTestList.find(value => value.id === InputId);
    return node;
  };

  const isTestChanged = useSelector(state => state.testChanged.isTestChanged);
  const showCommentary = useSelector(state => state.showCommentary.showCommentary)
  const dispatch = useDispatch();

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
    tempQuizId = dequeue(randomQuizQueue);
    testValue = _makeIdToNode(tempQuizId);
    setNowNode(testValue);
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
    setRenderChoiceList(choiceNodeList);
  };

  
  //Answer FUnction
  const chooseRight = () => {
    setIsRight(languageSet.True);
    setWasAnswer('')
  }
  
  //Wrong Function
  const chooseWrong = () => {
    setIsRight(languageSet.Wrong);
    setWasAnswer(nowNode.word)
    dispatch(addWrongAnswerRealmData(testValue));
  }
  
  //After Answer
  const afterAnswering = (inputData) => {
    tempQuizId = dequeue(randomQuizQueue);
    setWasExplain(nowNode.meaning)
    setWasAnswer(nowNode.word)
    setWasReply(inputData)
    if (tempQuizId === '00000000') {
      tempSetting();
      randomQuizQueueSetting();
      tempQuizId = dequeue(randomQuizQueue);
    }
    testValue = _makeIdToNode(tempQuizId);
    setNowNode(testValue);
    choiceMaker();
  };

  useEffect(() => {
    tempSetting();
    randomQuizQueueSetting();
    choiceMaker();
  }, []);

  if (isTestChanged) {
    tempSetting();
    randomQuizQueueSetting();
    choiceMaker();
    dispatch(setIsTestChanged(false));
  }

  return (
    <ScrollView>
      <AdMobBanner/>
      <RowContainerWithColor>
        <FlexContainer>
          <TextBox>{languageSet.Choice}</TextBox>
        </FlexContainer>
        <FlexContainer>
          <Switch
            value={isSubjective}
            onValueChange={value => setIsSubjective(value)}
          />
        </FlexContainer>
        <FlexContainer>
          <TextBox>{languageSet.ShortAnswer}</TextBox>
        </FlexContainer>
      </RowContainerWithColor>

      <MeaningContainer>
        {nowNode !== undefined ? (
          <TextBox>{nowNode.meaning}</TextBox>
        ) : (
          <TextBox>{languageSet.NoDataChosen}</TextBox>
        )}
      </MeaningContainer>

      {isSubjective ? (
        // 주관식
        <Container>
          {nowNode !== undefined ? (
            <Container>
              <TextWriteBox
                value={myAnswer}
                onChangeText={text => setMyAnswer(text)}
                placeholderTextColor={placeHolerColor}
                placeholder="Answer"
              />
              <RowContainer>
                <Button
                  onPress={() => {
                    if (nowNode.word === myAnswer) {
                      chooseRight()
                    } else {
                      chooseWrong()
                    }
                    setMyAnswer('');
                    afterAnswering(myAnswer);
                  }}>
                  <TextBox>{languageSet.Ok}</TextBox>
                </Button>
                <Button
                  onPress={() => {
                    setMyAnswer('');
                    setIsRight(languageSet.Pass);
                    afterAnswering(myAnswer);
                  }}>
                  <TextBox>{languageSet.Pass}</TextBox>
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
                {renderChoiceList.length >= 1 ? (
                  <ChoiceBox
                    onPress={() => {
                      if (nowNode.word === renderChoiceList[0].word) {
                        chooseRight()
                      } else {
                        chooseWrong()
                      }
                      afterAnswering(renderChoiceList[0].word);
                    }}>
                    <ChoiceText>{renderChoiceList[0].word}</ChoiceText>
                  </ChoiceBox>
                ) : (
                  <Container />
                )}

                {renderChoiceList.length >= 2 ? (
                  <ChoiceBox
                    onPress={() => {
                      if (nowNode.word === renderChoiceList[1].word) {
                        chooseRight()
                      } else {
                        chooseWrong()
                      }
                      afterAnswering(renderChoiceList[1].word);
                    }}>
                    <ChoiceText>{renderChoiceList[1].word}</ChoiceText>
                  </ChoiceBox>
                ) : (
                  <Container />
                )}
              </RowContainer>

              <RowContainer>
                {renderChoiceList.length >= 3 ? (
                  <ChoiceBox
                    onPress={() => {
                      if (nowNode.word === renderChoiceList[2].word) {
                        chooseRight()
                      } else {
                        chooseWrong()
                      }
                      afterAnswering(renderChoiceList[2].word);
                    }}>
                    <ChoiceText>{renderChoiceList[2].word}</ChoiceText>
                  </ChoiceBox>
                ) : (
                  <Container />
                )}
                {renderChoiceList.length >= 4 ? (
                  <ChoiceBox
                    onPress={() => {
                      if (nowNode.word === renderChoiceList[3].word) {
                        chooseRight()
                      } else {
                        chooseWrong()
                      }
                      afterAnswering(renderChoiceList[3].word);
                    }}>
                    <ChoiceText>{renderChoiceList[3].word}</ChoiceText>
                  </ChoiceBox>
                ) : (
                  <Container />
                )}
              </RowContainer>
              <Button
                onPress={() => {
                  setIsRight(languageSet.Pass);
                  afterAnswering('');
                }}>
                <TextBox>{languageSet.Pass}</TextBox>
              </Button>
            </Container>
          ) : (
            <Container />
          )}
        </Container>
      )}

      {/* 해설 */}
      {showCommentary ? (
        <Container>
          {wasExplain !== '' ? (
            <AnswerResultContainer
              isRight={isRight}
              wasExplain={wasExplain}
              wasAnswer={wasAnswer}
              wasReply={wasReply}
            />
          ) : (
            null
          )}
        </Container>
      ) : (
        null
      )}
      {isInfoWindowOpen ? <ExplainWindow/> : null}
    </ScrollView>
  );
};
