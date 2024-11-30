import React, { useState } from "react"
import styled from "styled-components/native"
import { testRealm } from "../../context/MyTest"
import { Dimensions } from "react-native"
import { useFocusEffect } from "@react-navigation/native"

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const StyledText = styled.Text`
  font-size: 10px;
`

const windowWidth = Dimensions.get('window').width
const StyledFlatList = styled.FlatList`
`
const TouchableContainer = styled.TouchableOpacity`
  margin: 5px;
`
const FlatListContainer = styled.View`
  flex-direction: row;
  background-color: #B4B4DC;
  min-height: 40px;
  width: ${windowWidth - 10}px;
  padding: 4px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`
const WordContainer = styled.View`
  background-color: #FFFFFF;
  min-height: 30px;
  width: 60px;
  padding: 5px;
  margin: 8px;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
`
const MeaningContainer = styled.View`
  background-color: #FFFFFF;
  flex: 1;
  min-height: 30px;
  padding: 8px;
  margin: 4px;
  border-radius: 2px;
  justify-content: center;
`

const FlatListComponent = ({key, category, word, meaning}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  return (
    <TouchableContainer
      onLongPress={() => {
        console.log(key)
        console.log(category)
        console.log(word)
        console.log(meaning)
      }}>
      <FlatListContainer>
        <WordContainer>
          <StyledText>
            {category}
          </StyledText>
        </WordContainer>
        <WordContainer>
          <StyledText>
            {word}
          </StyledText>
        </WordContainer>
        <MeaningContainer>
          <StyledText>
            {meaning}
          </StyledText>
        </MeaningContainer>
      </FlatListContainer>
    </TouchableContainer>
  )
}


export const MyTest = () => {
  let myTest = testRealm.objects('MyTest')

  useFocusEffect(() => {
    myTest = testRealm.objects('MyTest')

    console.log(myTest)
    console.log("new")
  })

  return (
  <Container>
    <StyledFlatList 
      data={myTest}
      renderItem={({item}) => (
        <FlatListComponent
          key = {item["key"]}
          category={item["category"]}
          word={item["word"]}
          meaning={item["meaning"]}
        />
      )}
    />
  </Container>
  )
}

function _deleteData (key, inputWord) {
  testRealm.write(() => {
    const dataToDelete = testRealm.objects('MyTest').filtered(`word == "${inputWord}" AND key == "${key}"`)
    testRealm.delete(dataToDelete)
  });
}