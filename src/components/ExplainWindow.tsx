import React from "react";
import styled from "styled-components/native";
import { GridComponent } from "./GridComponent";
import { useDispatch } from "react-redux";
import { setIsInfoWindowOpen } from "../redux/InfoWindowSlice";

const FullContainer = styled.View`
  top: 5%;
  left: 5%;
  width: 90%;
  height: 95%;
  position: absolute;
  background-color: white;
  border: 1px;
  border-color: #b4b4b4;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`

const ExplainContainer = styled.View`
`
const ImageContainer = styled.Image`
`
const ExplainText = styled.Text`
`

const ExitBox = styled.TouchableOpacity`
  width: 50%;
  height: 30px;
  margin: 8px;
  border-radius: 5px;
  background-color: red;
  justify-content: center;
  align-items: center;
`
const ExitBoxText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 20px;
`

interface ExplainSet {
  imageUrl: string,
  explainText: string,
}

export const ExplainWindow = (
  explainList: ExplainSet[]
) => {
  const dispatch = useDispatch()

  const handleInfoWindowClose = () => {
    dispatch(setIsInfoWindowOpen(false))
  }

  return (
    <FullContainer>
      <ExitBox
        onPress={handleInfoWindowClose}
      >
        <ExitBoxText>X</ExitBoxText>
      </ExitBox>
      <GridComponent
        data={explainList}
        renderItem={({item}) => (
          <ExplainContainer>
            <ImageContainer source={item.imageUrl} />
            <ExplainText>{item.explainText}</ExplainText>
          </ExplainContainer>
        )}
      />
    </FullContainer>
  );
}
