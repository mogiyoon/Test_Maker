import React from "react"
import { Container, FlatListContainer, MeaningContainer, StyledFlatList, StyledText, TouchableContainer, WordContainer } from "../../components/makerTabScreen/MyTest"
import { useDispatch, useSelector } from "react-redux"
import { removeRealmData } from "../../redux/RealmSlice"

const FlatListComponent = ({id, category, word, meaning, dispatch}) => {
  return (
    <TouchableContainer
      onLongPress={() => {
        dispatch(removeRealmData({id, word}))
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
  const myTestRedux = useSelector((state) => state.realm.realmData)
  const dispatch = useDispatch()

  return (
  <Container>
    {myTestRedux.length === 0 ?
      <StyledText>
        No Data
      </StyledText>
      :
      <StyledFlatList 
      data={myTestRedux}
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