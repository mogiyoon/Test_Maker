import React, { createContext, useContext, useState } from 'react'

const ContentContext = createContext()

export const ContentsProvider = ({children}) => {
  const [content, setContent] = useState('')
  const [isChanged, setIsChanged] = useState(false)
  const [isUsingOCR, setIsUsingOCR] = useState(false)

  console.log('-----in file-----')
  console.log('content')
  console.log(content)
  console.log('ischanged')
  console.log(isChanged)
  console.log('isusingocr')
  console.log(isUsingOCR)

  return (
    <ContentContext.Provider value={{content, setContent, isChanged, setIsChanged, isUsingOCR, setIsUsingOCR}}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContentContext = () => {
  return useContext(ContentContext)
}