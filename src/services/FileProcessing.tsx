import { encodePhoto } from "./ModifyPhoto"
import { getTextFromImage } from "./GoogleVision"
import { canWriteConvertTime, writeConvertTimeMinusOne } from "../db/TimeAsyncStorage"
import NetInfo from '@react-native-community/netinfo'

export const fileProcessing = async (photoPath, setPhotoPath, setContent, setIsChanged) => {
  const netInfo = await NetInfo.fetch()
  if (netInfo.isConnected === false) {
    return false
  }
  try {
    const canProcess = await canWriteConvertTime()
    if (canProcess) {
      const encodedImage = await encodePhoto(photoPath, setPhotoPath)
      const encodedText = await getTextFromImage(encodedImage)
      if (encodedText !== undefined) {
        const writeBool = await writeConvertTimeMinusOne()
      }
      await setContent(encodedText.
        responses[0].
        textAnnotations[0].
        description)
      await setIsChanged(true)
      return true
    } else {
      return false
    }
  } catch (e) {
    return false
  }


}