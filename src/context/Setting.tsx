import React, { createContext } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'

const SettingContext = createContext({
  name: '()',
  mean: '[]',
})

export default SettingContext