import React from "react";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";
import { setIsInfoWindowOpen } from "../redux/InfoWindowSlice";

const FullContainer = styled.View`
  top: 5%;
  left: 5%;
  width: 90%;
  height: 600px;
  padding: 10px;
  position: absolute;
  background-color: white;
  border: 1px;
  border-color: #b4b4b4;
  border-radius: 10px;
`

const ExitContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`
const ExitBox = styled.TouchableOpacity`
  width: 30%;
  height: 30px;
  margin-bottom: 10px;
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

interface ExplainWindowProps {
  children: React.ReactNode
}

export const ExplainWindow: React.FC<ExplainWindowProps> = ({children}) => {
  const dispatch = useDispatch();

  const handleInfoWindowClose = () => {
    dispatch(setIsInfoWindowOpen(false));
  };

  return (
    <FullContainer>
      <ExitContainer>
        <ExitBox onPress={handleInfoWindowClose}>
          <ExitBoxText>X</ExitBoxText>
        </ExitBox>
      </ExitContainer>
      {children}
    </FullContainer>
  );
};
