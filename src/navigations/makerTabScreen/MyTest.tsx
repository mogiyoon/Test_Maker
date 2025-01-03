import React, { useEffect } from "react"
import { Container, FlatListContainer, MeaningContainer, StyledFlatList, StyledText, TouchableContainer, WordContainer } from "../../components/makerTabScreen/MyTest"
import { useDispatch, useSelector } from "react-redux"
import { removeRealmData } from "../../redux/RealmSlice"
import { testTreeInitiate, setIsTreeChanged } from "../../redux/TestTreeSlice"

const FlatListComponent = ({id, category, word, meaning, dispatch}) => {
  return (
    <TouchableContainer
      onLongPress={() => {
        dispatch(removeRealmData({id, word}))
        testTreeInitiate()
        dispatch(setIsTreeChanged(true))
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
  const myTestList  = useSelector((state) => state.realm.realmData)
  const dispatch = useDispatch()

  return (
  <Container>
    {myTestList.length === 0 ?
      <StyledText>
        No Data
      </StyledText>
      :
      <StyledFlatList 
      data={myTestList}
      renderItem={({item}) => (
        <FlatListComponent
          id={item.id}
          category={item.category}
          word={item.word}
          meaning={item.meaning}
          dispatch={dispatch}
        />
      )}
    />}
  </Container>
  )
}