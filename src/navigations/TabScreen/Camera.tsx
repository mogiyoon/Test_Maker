import { useNavigation } from "@react-navigation/native"
import React, { useEffect } from "react"
import { Alert, Linking, StyleSheet } from "react-native"
import { Camera, useCameraDevice, useCameraDevices, useCameraPermission } from "react-native-vision-camera"
import styled from "styled-components/native"

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const StyledText = styled.Text`
  font-size: 30px;
`

async function CheckPermission (navigation) {
  const cameraPermission = await Camera.getCameraPermissionStatus()
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
            console.log(state)
            navigation.goBack()
          }
        },
      ])
    }
  }
}

export const CameraScreen = () => {
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      CheckPermission(navigation)
    })

    return () => unsubscribe()
  }, [navigation])

  return (
    <Container>
    </Container>
  )
}

function CameraView() {
  const device = useCameraDevice('back')
  const {hasPermission} = useCameraPermission()

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
  )
}