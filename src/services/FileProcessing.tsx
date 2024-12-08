import { encodePhoto } from "./ModifyPhoto"
import { getTextFromImage } from "./GoogleVision"
import { writeConvertTimeMinusOne } from "./AsyncStorage"

export const fileProcessing = async (photoPath, setPhotoPath, setContent, setIsChanged, navigation) => {

  const canProcess = await writeConvertTimeMinusOne()
  if (canProcess) {
    const encodedImage = await encodePhoto(photoPath, setPhotoPath)
    const encodedText = await getTextFromImage(encodedImage)
    await setContent(encodedText.
      responses[0].
      textAnnotations[0].
      description)
    await setIsChanged(true)

    return true
  } else {
    navigation.navigate('Setting')

    return false
  }

}