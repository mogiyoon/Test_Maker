import React, { useState } from "react"
import { Image } from "react-native"
import { launchImageLibrary } from 'react-native-image-picker'
import { fileProcessing } from "../../services/FileProcessing"
import { useNavigation } from "@react-navigation/native"
import { Container, FlatListContainer, MeaningContainer, MeaningContainerText, RowContainer, StyledButton, StyledButtonText, StyledText, windowHeight, windowWidth, WordContainer, WordContainerText } from "../../components/makerTabScreen/FileIndex"
import { useDispatch } from "react-redux"
import { setContentData, setIsChanged, setIsUsedOCR } from "../../redux/ContentsSlice"

const FlatListComponent = ({name, path}) => {
  return (
      <FlatListContainer>
        <WordContainer>
          <WordContainerText>
            {name}
          </WordContainerText>
        </WordContainer>
        <MeaningContainer>
          <MeaningContainerText>
            {path}
          </MeaningContainerText>
        </MeaningContainer>
      </FlatListContainer>
  )
}

export const FileIndex = () => {
  // const [files, setFiles] = useState([])
  const [imageUri, setImageUri] = useState(null)
  // const [documentUri, setDocumentUri] = useState(null)
  const dispatch = useDispatch()
  const setContent = (payload) => dispatch(setContentData(payload))
  const setChanged = (payload) => dispatch(setIsChanged(payload))
  const navigation = useNavigation()

  const handleSelectImage = () => {
    launchImageLibrary(
      {mediaType: 'photo'},
      (response) => {
        if (response.didCancel) {
        } else if (response.errorCode) {
        } else {
          setImageUri(response.assets[0].uri)
        }
      }
    )
  }

  const handleProcessing = async () => {
    const boolValue = await fileProcessing(imageUri, setImageUri, setContent, setChanged)
    if (boolValue) {
      dispatch(setIsUsedOCR(true))
      navigation.navigate('TextBox')
    } else {
      dispatch(setIsUsedOCR(false))
      navigation.navigate('Setting')
    }
  }

  return (
    <Container>
      <Container>
        <StyledText>Image</StyledText>
        <RowContainer>
          <StyledButton
            onPress={handleSelectImage}>
            <StyledButtonText>Choose</StyledButtonText>
          </StyledButton>
          {imageUri && 
          <StyledButton
            onPress={handleProcessing}>
            <StyledButtonText>Select</StyledButtonText>
          </StyledButton>}
        </RowContainer>
        {imageUri && <Image source={{uri: imageUri}} style={{width: windowWidth*0.8, height: windowHeight*0.7}}/>}
      </Container>
    </Container>
  )
}