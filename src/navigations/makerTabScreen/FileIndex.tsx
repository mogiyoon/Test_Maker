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
import { getLanguageSet } from '../../services/LanguageSet';
import { ExplainWindow } from '../../components/ExplainWindow';
import { FileIndexTutorialSet } from '../../constants/makerTab/FileIndex';

export const FileIndex = () => {
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)

  const isInfoWindowOpen = useSelector((state) => state.infoWindow.isInfoWindowOpen)

  const [imageUri, setImageUri] = useState(null);
  const dispatch = useDispatch();
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
      dispatch
    );
    if (boolValue) {
      navigation.navigate(languageSet.TextBox);
    } else {
      Alert.alert(languageSet.Warning, languageSet.OCRError);
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
            resizeMode='contain'
          />
        )}

      {isInfoWindowOpen ? 
      <ExplainWindow>
        <FileIndexTutorialSet/>
      </ExplainWindow>: null}
    </Container>
  );
};
