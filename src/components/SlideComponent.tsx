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
  width: 25px;
  height: 25px;
  margin: 5px;
  border-radius: 15px;
  border: 1px solid #c1c1c1;
  background-color: #bcffbc;
`
const ImageContainer = styled.Image`
  width: 270px;
  height: 450px;
`
const ExplainText = styled.Text`
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
        {pageNum > 0 ? 
          <MoveButton onPress={handlePrevPage} />
          : <MoveButton/>}

        <ImageContainer source={inputList[pageNum].imageUri} resizeMode="contain" />

        {pageNum < inputListLength - 1 ? (
          <MoveButton onPress={handleNextPage} />
        ) : <MoveButton/>}
      </RowContainer>
      <ExplainText>{inputList[pageNum].explainText}</ExplainText>
    </Container>
  );
}
