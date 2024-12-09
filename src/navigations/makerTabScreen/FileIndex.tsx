import React, { useEffect, useState } from "react"
import { Image } from "react-native"
import { launchImageLibrary } from 'react-native-image-picker'
import { fileProcessing } from "../../services/FileProcessing"
import { useNavigation } from "@react-navigation/native"
import { useContentContext } from "../../context/Contents"
import { Container, FlatListContainer, MeaningContainer, MeaningContainerText, RowContainer, StyledButton, StyledButtonText, StyledText, windowHeight, windowWidth, WordContainer, WordContainerText } from "../../components/makerTabScreen/FileIndex"

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
  const {content, setContent, isChanged, setIsChanged, isUsingOCR, setIsUsingOCR} = useContentContext()
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
    const boolValue = await fileProcessing(imageUri, setImageUri, setContent, setIsChanged)
    if (boolValue) {
      setIsUsingOCR(true)
      navigation.navigate('TextBox')
    } else {
      setIsUsingOCR(false)
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