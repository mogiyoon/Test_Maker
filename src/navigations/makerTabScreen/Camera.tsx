import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, Linking, StyleSheet} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {fileProcessing} from '../../services/FileProcessing';
import {resetPhoto} from '../../services/ModifyPhoto';
import {
  Container,
  ImageContainer,
  InnerContainer,
  NoCameraContainer,
  RowContainer,
  StyledButton,
  StyledButtonText,
  StyledTakePhotoButton,
  StyledText,
} from '../../components/makerTabScreen/Camera';
import {useDispatch, useSelector} from 'react-redux';
import { getLanguageSet } from '../../services/LanguageSet';

async function CheckPermission(navigation, languageSet, setHasPermission) {
  const cameraPermission = Camera.getCameraPermissionStatus();

  if (cameraPermission === 'granted') {
    setHasPermission(true)
  } else {
    const newCameraPermission = await Camera.requestCameraPermission();

    if (newCameraPermission === 'granted') {
      setHasPermission(true)
    } else {
      Alert.alert(languageSet.Alert, languageSet.CameraPermission, [
        {
          text: languageSet.Ok,
          onPress: () => {
            Linking.openSettings();
          },
        },
        {
          text: languageSet.Cancel,
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  }
}

export const CameraScreen = () => {
  const languageSetting = useSelector((state) => state.language.language)
  const languageSet = getLanguageSet(languageSetting)
  const cameraRef = useRef<Camera>(null);

  const navigation = useNavigation();
  const device = useCameraDevice('back');
  const [photoPath, setPhotoPath] = useState(null);
  const [hasPermission, setHasPermission] = useState(false)
  const dispatch = useDispatch();
  const onPressTakePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto();
        setPhotoPath(photo.path);
      } catch (error) {}
    }
  };

  const handleProcessing = async () => {
    const boolValue = await fileProcessing(
      photoPath,
      setPhotoPath,
      dispatch
    );
    if (boolValue) {
      navigation.navigate(languageSet.TextBox);
    } else {
      Alert.alert('Warning', 'Network Connection\nor\nToken Shortage');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      CheckPermission(navigation, languageSet, setHasPermission)
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <Container>
      {photoPath ? (
        <InnerContainer>
          <ImageContainer
            source={{uri: 'file://' + photoPath}}
          />
          <RowContainer>
            <StyledButton onPress={handleProcessing}>
              <StyledButtonText>{languageSet.Choose}</StyledButtonText>
            </StyledButton>
            <StyledButton onPress={() => resetPhoto(setPhotoPath)}>
              <StyledButtonText>{languageSet.Cancel}</StyledButtonText>
            </StyledButton>
          </RowContainer>
        </InnerContainer>
      ) : (
        <>
          {hasPermission && device ? (
            <InnerContainer>
              <Camera
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
              />
              <StyledTakePhotoButton onPress={onPressTakePhoto}>
                <StyledText />
              </StyledTakePhotoButton>
            </InnerContainer>
          ) : (
            <NoCameraContainer>
              <StyledText>{languageSet.NoCamera}</StyledText>
            </NoCameraContainer>
          )}
        </>
      )}
    </Container>
  );
};
