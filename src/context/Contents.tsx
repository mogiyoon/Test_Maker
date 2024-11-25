import React, { createContext, useContext, useState } from 'react'

const ContentContext = createContext()

export const ContentsProvider = ({children}) => {
  const [content, setContent] = useState('')

  return (
    <ContentContext.Provider value={{content, setContent}}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContentContext = () => {
  return useContext(ContentContext)
}