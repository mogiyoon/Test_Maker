import React, { useEffect, useState } from "react"
import { testRealm } from '../../db/MyTestDB'
import { Container, FlatListContainer, MeaningContainer, StyledFlatList, StyledText, TouchableContainer, WordContainer } from "../../components/makerTabScreen/MyTest"

const FlatListComponent = ({id, category, word, meaning}) => {
  return (
    <TouchableContainer
      onLongPress={() => {
        _deleteData(id, word)
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
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const myTest = testRealm.objects('MyTest')
      setData(Array.from(myTest))
    }

    loadData()

    testRealm.objects('MyTest').addListener(loadData)

    return () => {
      testRealm.objects('MyTest').removeListener(loadData)
    }
  }, [])

  return (
  <Container>
    {data.length === 0 ?
      <StyledText>
        No Data
      </StyledText>
      :
      <StyledFlatList 
      data={data}
      renderItem={({item}) => (
        <FlatListComponent
          id={item["id"]}
          category={item["category"]}
          word={item["word"]}
          meaning={item["meaning"]}
        />
      )}
    />}
  </Container>
  )
}

function _deleteData (id, inputWord) {
  testRealm.write(() => {
    const dataToDelete = testRealm.objects('MyTest').filtered(`word == "${inputWord}" AND id == "${id}"`)
    testRealm.delete(dataToDelete)
  });
}