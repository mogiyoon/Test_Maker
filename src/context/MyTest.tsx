import React, { createContext, useContext, useState } from 'react'
import { MyTestContext } from '../db/MyTestDB'

const MyTestContext = createContext();

export const MyTestContextProvider = ({children}) => {
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