import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setIsTreeChanged, testTree} from '../../redux/TestTreeSlice';
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

  if (treeChange) {
    setMyTestTree(testTree);
    setNowCategory(myTestTree[0]);
    setInCategories(myTestTree[0].childCategory);
    dispatch(setIsTreeChanged(false));
  }

  useEffect(() => {
    setNowCategory(myTestTree[0]);
    setInCategories(myTestTree[0].childCategory);
  }, []);

  return (
    <ScrollContainer>
      {/* 첫 번째 컨테이너 */}
      <FlexContainer>
        <TextContainer>
          {nowCategory ? (
            <StyledTitle>{nowCategory.categoryName} Category</StyledTitle>
          ) : (
            <StyledTitle />
          )}
        </TextContainer>
        <GridComponent
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

      {/* 두 번째 컨테이너 */}
      <FlexContainer>
        <TextContainer>
          <StyledTitle>Contained Item</StyledTitle>
        </TextContainer>
        {nowCategory ? (
          <GridComponent
            columnNumber={2}
            isFull={true}
            data={nowCategory.childId}
            renderItem={({item}) => (
              <TextContainer>
                <StyledText>
                  word : {myTestList.find(value => value.id === item).word}
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

      {/* 세 번째 컨테이너 */}
      <FlexContainer flexSize={1}>
        <RowContainer>
          <StyledButton
            onPress={() => {
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
