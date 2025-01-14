import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setIsTreeTestSpaceChanged, testTree} from '../../redux/TestTreeSlice';
import {setIsTestChanged, testChooser} from '../../redux/TestChoiceSlice';
import {
  ScrollContainer,
  FlexContainer,
  RowContainer,
  StyledButton,
  StyledCategory,
  StyledGrid,
  StyledText,
  StyledTitle,
  TextContainer,
} from '../../components/testTabScreen/TestSpace';
import { GridComponent } from '../../components/GridComponent';

export const TestSpace = () => {
  const myTestList = useSelector(state => state.testRealm.realmData);
  const treeChange = useSelector(state => state.treeChanged.isTreeChanged);
  const dispatch = useDispatch();

  const [myTestTree, setMyTestTree] = useState(testTree);
  const [nowCategory, setNowCategory] = useState(myTestTree[0]); // 현재 카테고리
  const [inCategories, setInCategories] = useState(myTestTree[0].childCategory); // 자식 카테고리를 보여줌(화면에 나오는 것)
  const [chosenCategory, setChosenCategory] = useState(undefined)

  if (treeChange[2]) {
    setMyTestTree(testTree);
    setNowCategory(myTestTree[0]);
    setInCategories(myTestTree[0].childCategory);
    dispatch(setIsTreeTestSpaceChanged(false));
  }

  useEffect(() => {
    setNowCategory(myTestTree[0]);
    setInCategories(myTestTree[0].childCategory);
  }, []);

  return (
    <ScrollContainer>
        {/* 선택된 카테고리 컨테이너 */}
            <FlexContainer>
        <TextContainer>
            <StyledTitle>Chosen Category</StyledTitle>
        </TextContainer>
          {chosenCategory ? (
            <TextContainer>
              <StyledText>
                {chosenCategory}
              </StyledText>
            </TextContainer>
          ) : (
            <TextContainer>
              <StyledText>No data</StyledText>
            </TextContainer>
          )}
      </FlexContainer>

      {/* 카테고리 목록 컨테이너 */}
      <FlexContainer>
        <TextContainer>
          {nowCategory ? (
            <StyledTitle>{nowCategory.categoryName} Category</StyledTitle>
          ) : (
            <StyledTitle />
          )}
        </TextContainer>
        <GridComponent
          maxHeight={330}
          columnNumber={2}
          isFull={true}
          data={inCategories}
          renderItem={({item}) => (
            <StyledGrid
              onPress={() => {
                setNowCategory(item);
                setInCategories(item.childCategory);
              }}>
              <StyledCategory>{item.categoryName}</StyledCategory>
            </StyledGrid>
          )}
        />
      </FlexContainer>

      {/* 포함된 아이템 컨테이너 */}
      <FlexContainer>
        <TextContainer>
          <StyledTitle>Contained Item</StyledTitle>
        </TextContainer>
        {nowCategory ? (
          <GridComponent
            maxHeight={300}
            columnNumber={3}
            isFull={true}
            data={nowCategory.childId}
            renderItem={({item}) => (
              <TextContainer>
                <StyledText>
                  {myTestList.find(value => value.id === item).word}
                </StyledText>
              </TextContainer>
            )}
          />
        ) : (
          <TextContainer>
            <StyledText>No data</StyledText>
          </TextContainer>
        )}
      </FlexContainer>

      {/* 테스트 선택 컨테이너 */}
      <FlexContainer flexSize={1}>
        <RowContainer>
          <StyledButton
            onPress={() => {
              setChosenCategory(nowCategory.categoryName)
              testChooser(nowCategory);
              dispatch(setIsTestChanged(true));
            }}>
            <StyledText>Choose</StyledText>
          </StyledButton>
          <StyledButton
            onPress={() => {
              if (nowCategory.parentCategory) {
                setNowCategory(nowCategory.parentCategory);
                setInCategories(nowCategory.parentCategory.childCategory);
              }
            }}>
            <StyledText>Back</StyledText>
          </StyledButton>
        </RowContainer>
      </FlexContainer>
    </ScrollContainer>
  );
};
