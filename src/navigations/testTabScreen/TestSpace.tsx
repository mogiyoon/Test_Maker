import React, { useEffect, useState } from "react"
import styled from "styled-components/native"
import { Dimensions } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { setIsTreeChanged, testTree } from "../../redux/TestTreeSlice"
import { setIsTestChanged, testChooser } from "../../redux/TestChoiceSlice"

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Container = styled.View`
  width: ${windowWidth}px;
  height: ${windowHeight * 0.8}px;
  justify-content: center;
  align-items: center;
`
const FlexContainer = styled.View`
  flex: ${({flexSize}) => flexSize};
  width: 95%;
  height: 95%;
  background-color: #ffb0b0;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 8px 6px;
  padding: 5px;
`
const RowContainer = styled.View`
  flex-direction: row;
  width: ${windowWidth * 0.8}px;
  justify-content: space-evenly;
  align-items: center;
`
const TextContainer = styled.View`
  width: ${windowWidth * 0.8}px;
  height: 100px;
  justify-content: center;
  align-items: center;
`
const StyledFlatList = styled.FlatList`
`
const StyledTitle = styled.Text`
  background-color: #FFFFFF;
  font-size: 30px;
  padding: 2px 40px;
  border-radius: 20px;
`
const StyledCategory = styled.Text`
  font-size: 25px;
`
const StyledText = styled.Text`
  font-size: 15px;
`
const StyledGrid = styled.TouchableOpacity`
  width: 100px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #cecece;
  border-radius: 4px;
  margin: 5px;
`
const StyledButton = styled.TouchableOpacity`
width: 100px;
height: 50px;
justify-content: center;
align-items: center;
background-color: #cecece;
border-radius: 10px;
`

export const TestSpace = () => {
  const myTestList = useSelector((state) => state.testRealm.realmData)
  const treeChange = useSelector((state) => state.treeChanged.isTreeChanged)
  const dispatch = useDispatch()

  const [myTestTree, setMyTestTree] = useState(testTree)
  const [nowCategory, setNowCategory] = useState(myTestTree[0]) // 현재 카테고리
  const [inCategories, setInCategories] = useState(myTestTree[0].childCategory) // 자식 카테고리를 보여줌(화면에 나오는 것)

  if (treeChange) {
    setMyTestTree(testTree)
    setNowCategory(myTestTree[0])
    setInCategories(myTestTree[0].childCategory)
    dispatch(setIsTreeChanged(false))
  }

  useEffect(() => {
    setNowCategory(myTestTree[0])
    setInCategories(myTestTree[0].childCategory)
  }, [])

  return (
    <Container>
      {/* 첫 번째 컨테이너 */}
      <FlexContainer
        flexSize={4}>
        {nowCategory ? (
          <StyledTitle>{nowCategory.categoryName} Category</StyledTitle>
        ) : (
          <StyledTitle></StyledTitle>
        )}
        <StyledFlatList
          data={inCategories}
          renderItem={({item}) => (
            <StyledGrid
              onPress={() => {
                setNowCategory(item)
                setInCategories(item.childCategory)
              }}>
              <StyledCategory>
                {item.categoryName}
              </StyledCategory>
            </StyledGrid>
          )}
        />
      </FlexContainer>

      {/* 두 번째 컨테이너 */}
      <FlexContainer
        flexSize={3}
      > 
        <StyledTitle>
          Contained Item
        </StyledTitle>
        {nowCategory ? (<StyledFlatList
          data={nowCategory.childId}
          renderItem={({item}) => (
            <TextContainer>
              <StyledText>
                word : {myTestList.find((value) => value.id === item).word}
              </StyledText>
            </TextContainer>
          )}/>) : (
            <TextContainer>
              <StyledText>No data</StyledText>
            </TextContainer>
          )}
      </FlexContainer>

      {/* 세 번째 컨테이너 */}
      <FlexContainer
        flexSize={1}>
        <RowContainer>
          <StyledButton
            onPress={() => {
              testChooser(nowCategory)
              dispatch(setIsTestChanged(true))
            }}
          />
          <StyledButton
            onPress={() => {
              if (nowCategory.parentCategory) {
                setNowCategory(nowCategory.parentCategory)
                setInCategories(nowCategory.parentCategory.childCategory)
              }
            }}
          >
            <StyledText>Back</StyledText>
          </StyledButton>
        </RowContainer>
      </FlexContainer>
    </Container>
  )
}