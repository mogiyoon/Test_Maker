import { readFile } from "react-native-fs"

export const resetPhoto = (inputSetPhotoPath) => {
  inputSetPhotoPath(null)
}

export const encodePhoto = async (inputPhotoPath: string, inputSetPhotoPath) => {
  try {
    const base64Image = await readFile(inputPhotoPath, 'base64')
    return base64Image
  } catch {
    return null
  } finally {
    inputSetPhotoPath(null)
  }
}