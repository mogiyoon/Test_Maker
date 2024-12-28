import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useRef, useState } from "react"
import { Alert, Image, Linking, Platform, StyleSheet } from "react-native"
import { PERMISSIONS, request } from "react-native-permissions"
import { Camera, useCameraDevice} from "react-native-vision-camera"
import { fileProcessing } from "../../services/FileProcessing"
import { resetPhoto } from "../../services/ModifyPhoto"
import { Container, RowContainer, StyledButton, StyledTakePhotoButton, StyledText, windowHeight, windowWidth } from "../../components/makerTabScreen/Camera"
import { useDispatch } from "react-redux"
import { setContentData, setIsChanged, setIsUsedOCR } from "../../redux/ContentsSlice"

async function CheckPermission (navigation) {
  const cameraPermission = await Camera.getCameraPermissionStatus()
  const requestPhotoPermission = await request(
      Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
      : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
  )
  const state = navigation.getState()

  if (cameraPermission === 'granted') {
  } else {
    const newCameraPermission = await Camera.requestCameraPermission()

    if (newCameraPermission === 'granted') {
    } else {
      Alert.alert('경고', '카메라 권한을 허용해야합니다.',[{
          text: 'OK',
          onPress: () => {
            Linking.openSettings()
          }
        }, {
          text: 'Cancel',
          onPress: () => {
            navigation.goBack()
          }
        },
      ])
    }
  }
}


export const CameraScreen = () => {
  const cameraRef = useRef<Camera>(null)
  const navigation = useNavigation()
  const device = useCameraDevice('back')
  const [photoPath, setPhotoPath] = useState(null)
  const dispatch = useDispatch()
  const setContent = (payload) => dispatch(setContentData(payload))
  const setChanged = (payload) => dispatch(setIsChanged(payload))

  const onPressTakePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto()
        setPhotoPath(photo.path)
      } catch (error) {

      }
    }
  }

  const handleProcessing = async () => {
    const boolValue = await fileProcessing(photoPath, setPhotoPath, setContent, setChanged)
    if (boolValue) {
      dispatch(setIsUsedOCR(true))
      navigation.navigate('TextBox')
    } else {
      dispatch(setIsUsedOCR(false))
      Alert.alert(
        "Warning",
        "Network Connection\nor\nToken Shortage"
      )
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      CheckPermission(navigation)
    })

    return () => unsubscribe()
  }, [navigation])

  return (
    <Container>
      {photoPath ? (
        <Container>
          <Image 
            style={{width: windowWidth, height: windowHeight * 0.75}}
            source={{uri: 'file://' + photoPath}} />
          <RowContainer>
            <StyledButton
              onPress={handleProcessing}
            >
              <StyledText>Select</StyledText>
            </StyledButton>
            <StyledButton
              onPress={() => resetPhoto(setPhotoPath)}
            >
              <StyledText>Cancel</StyledText>
            </StyledButton>
          </RowContainer>
        </Container>
      ) : (
        <>
        {device ? (
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
          ) : (
            <StyledText>
              No Camera
            </StyledText>
          )}
        <StyledTakePhotoButton
          onPress={onPressTakePhoto}
        >
          <StyledText></StyledText>
        </StyledTakePhotoButton>
        </>
      )}
    </Container>
  )
}