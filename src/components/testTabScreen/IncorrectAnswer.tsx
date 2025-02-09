import React from 'react';
import { useState } from 'react';
import {Dimensions} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { removeIncorrectAnswerRealmData } from '../../redux/RealmSlice';
import { getLanguageSet } from '../../services/LanguageSet';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 2px;
`;
export const DataContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`
export const StyledText = styled.Text`
  font-size: 10px;
`;

export const windowWidth = Dimensions.get('window').width;

export const NoDataText = styled.Text`
  font-size: 20px;
`
export const TouchableContainer = styled.TouchableOpacity`
  margin: 5px;
`;
export const DeleteContainer = styled.TouchableOpacity`
  height: 30px;
  border-radius: 5px;
  margin: 4px;
  justify-content: center;
  align-items: center;
  background-color: #ff0000;
`
export const DeleteText = styled.Text`
  font-size: 15px;
`
export const OpenWordContainer = ({children, inputId}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  return (
    <TouchableContainer
      onPress={() => {setIsOpen(!isOpen)}}
    >
      {children}
      {isOpen ? 
        <DeleteContainer
          onPress={() => {
            dispatch(removeIncorrectAnswerRealmData(inputId))
          }}
        >
          <DeleteText>
            {languageSet.Delete}
          </DeleteText>
        </DeleteContainer> : null}
    </TouchableContainer>
  )
}

export const GridContainer = styled.View`
  flex: 1;
  height: 100px;
  padding: 10px;
  background-color: #d4cdff;
  border-radius: 5px;
`

export const GridInnerContainer = styled.View`
  flex: 1;
  height: 90px;
  padding: 5px;
  background-color: #FFFFFF;
  border-radius: 5px;
  justify-content: center;
`