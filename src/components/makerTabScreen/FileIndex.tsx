import { Dimensions } from "react-native"
import styled from "styled-components/native"

export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
export const RowContainer = styled.View`
  flex-direction: row;
  width: ${windowWidth};
  padding: 10px;
  justify-content: space-evenly;
  align-items: center;
`
export const StyledText = styled.Text`
  font-size: 30px;
`

export const FlatListContainer = styled.View`
  flex-direction: row;
  background-color: #B4B4DC;
  min-height: 40px;
  width: ${windowWidth - 10}px;
  padding: 4px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`
export const WordContainer = styled.View`
  background-color: #FFFFFF;
  min-height: 30px;
  width: 60px;
  padding: 5px;
  margin: 8px;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
`
export const WordContainerText = styled.Text`
  font-size: 10px;
`
export const MeaningContainer = styled.View`
  background-color: #FFFFFF;
  flex: 1;
  min-height: 30px;
  padding: 8px;
  margin: 4px;
  border-radius: 2px;
  justify-content: center;
`
export const MeaningContainerText = styled.Text`
  font-size: 10px;
`

export const StyledButton = styled.TouchableOpacity`
  width: 70px;
  height: 30px;
  border-radius: 5px;
  background-color: #FFFFFF;
  justify-content: center;
  align-items: center;
`
export const StyledButtonText = styled.Text`
  font-size: 10px;
`