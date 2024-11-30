import React, { createContext, useContext, useState } from 'react'

const ContentContext = createContext()

export const ContentsProvider = ({children}) => {
  const [content, setContent] = useState('')
  const [isChanged, setIsChanged] = useState(false)

  return (
    <ContentContext.Provider value={{content, setContent, isChanged, setIsChanged}}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContentContext = () => {
  return useContext(ContentContext)
}