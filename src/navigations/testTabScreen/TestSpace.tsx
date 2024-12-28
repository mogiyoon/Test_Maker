import React, { useEffect, useState } from "react"
import styled from "styled-components/native"
import { Dimensions } from "react-native"
import { useDispatch, useSelector } from "react-redux"

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
  background-color: #ff0000;
  justify-content: center;
  align-items: center;
  margin: 10px 5px;
  padding: 5px;
`
const RowContainer = styled.View`
  flex-direction: row;
  width: ${windowWidth};
  justify-content: space-evenly;
  align-items: center;
`
const TextContainer = styled.View`
  width: ${windowWidth}px;
  height: 100px;
  justify-content: center;
  align-items: center;
`
const StyledFlatList = styled.FlatList`
`
const StyledTitle = styled.Text`
  font-size: 30px;
`
const StyledText = styled.Text`
  font-size: 15px;
`
const StyledGrid = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: #858585;
`
const StyledButton = styled.TouchableOpacity`
width: 100px;
height: 50px;
justify-content: center;
align-items: center;
background-color: #858585;
`

export const TestSpace = () => {
  const myTestRedux = useSelector((state) => state.testTree.testTree)
  const myTestList = useSelector((state) => state.realm.realmData)
  const dispatch = useDispatch()

  const [nowCategory, setNowCategory] = useState(myTestRedux[0]) // 현재 카테고리
  const [inCategories, setInCategories] = useState(myTestRedux[0].childCategory) // 자식 카테고리를 보여줌(화면에 나오는 것)

  useEffect(() => {
     console.log(nowCategory)
     console.log(inCategories)
  })

  return (
    <Container>
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
                console.log(item)
              }}>
              <StyledTitle>
                {item.categoryName}
              </StyledTitle>
            </StyledGrid>
          )}
        />
      </FlexContainer>
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
      <FlexContainer
        flexSize={1}>
        <RowContainer>
          <StyledButton
            onPress={() => {
              console.log('inCategories')
              console.log(inCategories)
              console.log('nowCategory')
              console.log(nowCategory)
              console.log(nowCategory.childId)}}
          />
          <StyledButton
            onPress={() => {
              if (nowCategory.parentCategory) {
                setNowCategory(nowCategory.parentCategory)
                setInCategories(nowCategory.parentCategory.childCategory)
              }
            }}
          >
            <StyledTitle>Back</StyledTitle>
          </StyledButton>
        </RowContainer>
      </FlexContainer>
    </Container>
  )
}