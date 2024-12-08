import React, { createContext, useContext, useState } from 'react'

const AsyncStorageContext = createContext();

export const AsyncStorageProvider = ({children}) => {
  const [storageChanged, setStorageChanged] = useState(true)
  console.log("initial")
  console.log(storageChanged)

  return (
    <AsyncStorageContext.Provider value={{storageChanged, setStorageChanged}}>
      {children}
    </AsyncStorageContext.Provider>
  )
}

export const useAsyncStorageContext = () => {
  return useContext(AsyncStorageContext)
}