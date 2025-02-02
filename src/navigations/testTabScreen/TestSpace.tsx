import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {testTree} from '../../db/TestTree';
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
  CenterContainer,
} from '../../components/testTabScreen/TestSpace';
import { GridComponent } from '../../components/GridComponent';
import { getLanguageSet } from '../../services/LanguageSet';
import { AdmobReward, AdMobBanner } from '../../services/GoogleAd';

export const TestSpace = () => {
  const myTestList = useSelector(state => state.testRealm.realmData);
  const dispatch = useDispatch();

  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  const [myTestTree, setMyTestTree] = useState(testTree);
  const [nowCategory, setNowCategory] = useState(myTestTree[0]); // 현재 카테고리
  const [inCategories, setInCategories] = useState(myTestTree[0].childCategory); // 자식 카테고리를 보여줌(화면에 나오는 것)
  const [chosenCategory, setChosenCategory] = useState(undefined)

  useEffect(() => {
    setNowCategory(myTestTree[0]);
    setInCategories(myTestTree[0].childCategory);
  }, []);

  return (
    <ScrollContainer>
      <AdMobBanner/>
      <CenterContainer>

        {/* 선택된 카테고리 컨테이너 */}
        <FlexContainer>
          <TextContainer>
              <StyledTitle>{languageSet.ChosenCategory}</StyledTitle>
          </TextContainer>
            {chosenCategory ? (
              <TextContainer>
                <StyledText>
                  {chosenCategory}
                </StyledText>
              </TextContainer>
            ) : (
              <TextContainer>
                <StyledText>{languageSet.NoData}</StyledText>
              </TextContainer>
            )}
        </FlexContainer>

        {/* 카테고리 목록 컨테이너 */}
        <FlexContainer>
          <TextContainer>
            {nowCategory ? (
              <StyledTitle>{nowCategory.categoryName} {languageSet.Category}</StyledTitle>
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
            <StyledTitle>{languageSet.ContainedItem}</StyledTitle>
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
                    {item ? myTestList.find(value => value.id === item).word : null}
                  </StyledText>
                </TextContainer>)
              }
            />
          ) : (
            <TextContainer>
              <StyledText>{languageSet.NoData}</StyledText>
            </TextContainer>
          )}
        </FlexContainer>

        {/* 테스트 선택 컨테이너 */}
        <FlexContainer>
          <RowContainer>
            <StyledButton
              onPress={() => {
                setChosenCategory(nowCategory.categoryName + ' ' + languageSet.Category)
                testChooser(nowCategory);
                dispatch(setIsTestChanged(true));
              }}>
              <StyledText>{languageSet.Choose}</StyledText>
            </StyledButton>
            <StyledButton
              onPress={() => {
                if (nowCategory.parentCategory) {
                  setNowCategory(nowCategory.parentCategory);
                  setInCategories(nowCategory.parentCategory.childCategory);
                }
              }}>
              <StyledText>{languageSet.Back}</StyledText>
            </StyledButton>
          </RowContainer>
        </FlexContainer>
      </CenterContainer>
    </ScrollContainer>
  );
};
