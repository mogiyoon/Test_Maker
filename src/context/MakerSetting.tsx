import React, { createContext } from "react"
import { readMakerSetting } from "../db/MakerSettingAsyncStorage"

const name = readMakerSetting('name')
const mean = readMakerSetting('mean')

const MakerSettingContext = createContext({
  name: name,
  mean: mean,
})

export default MakerSettingContext