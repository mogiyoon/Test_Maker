import React, { createContext, useContext, useState } from 'react'

const ContentContext = createContext()

export const ContentsProvider = ({children}) => {
  const [content, setContent] = useState('')
  const [isChanged, setIsChanged] = useState(false) // Contents, Ad, Setting
  const [isUsingOCR, setIsUsingOCR] = useState(false)

  return (
    <ContentContext.Provider value={{content, setContent, isChanged, setIsChanged, isUsingOCR, setIsUsingOCR}}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContentContext = () => {
  return useContext(ContentContext)
}