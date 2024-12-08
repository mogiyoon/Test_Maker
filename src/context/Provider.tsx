import React from 'react'
import { AsyncStorageProvider } from './AsyncStorage'
import { ContentsProvider } from './Contents'

export const Provider = ({children}) => {
  return (
    <AsyncStorageProvider>
      <ContentsProvider>
        {children}
      </ContentsProvider>
    </AsyncStorageProvider>
  )
}
