import { Dimensions } from "react-native"
import styled from "styled-components/native"

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export const Container = styled.View`
  width: ${windowWidth}px;
  height: ${windowHeight * 0.8}px;
  justify-content: center;
  align-items: center;
`
export const FlexContainer = styled.View`
  flex: ${({flexSize}) => flexSize};
  width: 95%;
  height: 95%;
  background-color: #ffb0b0;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 8px 6px;
  padding: 5px;
`
export const RowContainer = styled.View`
  flex-direction: row;
  width: ${windowWidth * 0.8}px;
  justify-content: space-evenly;
  align-items: center;
`
export const TextContainer = styled.View`
  width: ${windowWidth * 0.8}px;
  height: 100px;
  justify-content: center;
  align-items: center;
`
export const StyledFlatList = styled.FlatList`
`
export const StyledTitle = styled.Text`
  background-color: #FFFFFF;
  font-size: 30px;
  padding: 2px 40px;
  border-radius: 20px;
`
export const StyledCategory = styled.Text`
  font-size: 25px;
`
export const StyledText = styled.Text`
  font-size: 15px;
`
export const StyledGrid = styled.TouchableOpacity`
  width: 100px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #cecece;
  border-radius: 4px;
  margin: 5px;
`
export const StyledButton = styled.TouchableOpacity`
width: 100px;
height: 50px;
justify-content: center;
align-items: center;
background-color: #cecece;
border-radius: 10px;
`