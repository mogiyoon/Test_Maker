import React, {useState} from 'react';
import {Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {fileProcessing} from '../../services/FileProcessing';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  ImageContainer,
  InnerContainer,
  RowContainer,
  StyledButton,
  StyledButtonText,
  StyledText,
} from '../../components/makerTabScreen/FileIndex';
import {useDispatch, useSelector} from 'react-redux';
import {
  setContentData,
  setIsChanged,
  setIsUsedOCR,
} from '../../redux/ContentsSlice';
import { getLanguageSet } from '../../services/LanguageSet';

export const FileIndex = () => {
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  // const [files, setFiles] = useState([])
  const [imageUri, setImageUri] = useState(null);
  // const [documentUri, setDocumentUri] = useState(null)
  const dispatch = useDispatch();
  const setContent = payload => dispatch(setContentData(payload));
  const setChanged = payload => dispatch(setIsChanged(payload));
  const navigation = useNavigation();

  const handleSelectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
      } else if (response.errorCode) {
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleProcessing = async () => {
    const boolValue = await fileProcessing(
      imageUri,
      setImageUri,
      setContent,
      setChanged,
    );
    if (boolValue) {
      dispatch(setIsUsedOCR(true));
      navigation.navigate(languageSet.TextBox);
    } else {
      dispatch(setIsUsedOCR(false));
      Alert.alert('Warning', 'Network Connection\nor\nToken Shortage');
    }
  };

  return (
    <Container>
      <InnerContainer>
        <StyledText>{languageSet.Image}</StyledText>
        <RowContainer>
          <StyledButton onPress={handleSelectImage}>
            <StyledButtonText>{languageSet.File}</StyledButtonText>
          </StyledButton>
          {imageUri ? (
            <StyledButton onPress={handleProcessing}>
              <StyledButtonText>{languageSet.Choose}</StyledButtonText>
            </StyledButton>
          ) : (
            null
          )}
        </RowContainer>
      </InnerContainer>
        {imageUri && (
          <ImageContainer
            source={{uri: imageUri}}
          />
        )}
    </Container>
  );
};
