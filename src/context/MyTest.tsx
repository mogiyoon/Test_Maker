import React, { createContext, useContext, useState } from 'react'
import Realm from 'realm'

const MyTestContext = createContext()
const MyTestSchema = {
  name: 'MyTest',
  properties: {
    key: 'string',
    category: 'string',
    word: 'string',
    meaning: 'string',
  }
}

export const testRealm = new Realm({schema: [MyTestSchema]})

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