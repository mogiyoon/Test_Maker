import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useRef, useState } from "react"
import { Alert, Dimensions, Image, Linking, Platform, StyleSheet } from "react-native"
import { readFile } from "react-native-fs"
import { PERMISSIONS, request } from "react-native-permissions"
import { Camera, useCameraDevice} from "react-native-vision-camera"
import styled from "styled-components/native"

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const RowContainer = styled.View`
  flex-direction: row;
  width: ${windowWidth};
  justify-content: space-evenly;
  align-items: center;
`
const StyledText = styled.Text`
  font-size: 15px;
`
const StyledTakePhotoButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 40px;
  width: 60px;
  height: 60px;
  border-radius: 40px;
  background-color: #FFFFFF;
`
const StyledButton = styled.TouchableOpacity`
  width: 60px;
  height: 20px;
  border-radius: 5px;
  background-color: #FFFFFF;
  justify-content: center;
  align-items: center;
`


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

  const onPressTakePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto()
        setPhotoPath(photo.path)
      } catch (error) {

      }
    }
  }

  const resetPhoto = () => {
    setPhotoPath(null)
  }

  const encodePhoto = async () => {
    try {
      const base64Image = await readFile(photoPath, 'base64')
      return base64Image
    } catch {
      return null
    } finally {
      setPhotoPath(null)
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
              onPress={() => {
                const encodedImage = encodePhoto()
              }}
            >
              <StyledText>Select</StyledText>
            </StyledButton>
            <StyledButton
              onPress={resetPhoto}
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