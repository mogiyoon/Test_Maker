import React, { useState } from 'react'
import styled from 'styled-components/native'
import { ExplainSet } from "../constants/Tutorials"

const Container = styled.View`
`
const RowContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`
const MoveButton = styled.TouchableOpacity`
  width: 23px;
  height: 300px;
  margin: 5px;
  border-radius: 5px;
  background-color: #bcffbc;
`
const ImageContainer = styled.Image`
  width: 270px;
  height: 400px;
`
const ExplainText = styled.Text`
  margin: 10px 0px;
  font-size: 20px;
`

interface SlideComponentProps {
  inputList: ExplainSet[]
}
export const SlideComponent : React.FC<SlideComponentProps> = ({
  inputList
}) => {
  const [pageNum, setPageNum] = useState(0)
  const inputListLength = inputList.length

  const handleNextPage = () => {
    setPageNum(prev => prev + 1)
  }
  const handlePrevPage = () => {
    setPageNum(prev => prev - 1)
  }

  return (
    <Container>
      <RowContainer>
        {pageNum > 0 ? (
          <MoveButton onPress={handlePrevPage} hitSlop={5} />
        ) : (
          <MoveButton hitSlop={5} />
        )}

        <ImageContainer
          source={inputList[pageNum].imageUri}
          resizeMode="contain"
        />

        {pageNum < inputListLength - 1 ? (
          <MoveButton onPress={handleNextPage} hitSlop={5} />
        ) : (
          <MoveButton hitSlop={5} />
        )}
      </RowContainer>
      <ExplainText>{inputList[pageNum].explainText}</ExplainText>
    </Container>
  );
}
