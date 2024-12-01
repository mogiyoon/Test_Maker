import React, { createContext, useContext, useState } from 'react'
import { MyTestContext } from './MyTestContext'

const MyTestContext = createContext();

export const ContentsProvider = ({children}) => {
  const [myTest, setMyTest] = useState()

  return (
    <MyTestContext.Provider value={{myTest, setMyTest}}>
      {children}
    </MyTestContext.Provider>
  )
}

export const useMyTestContext = () => {
  return useContext(MyTestContext)
}