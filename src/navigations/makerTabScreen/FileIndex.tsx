import React, { useEffect, useState } from "react"
import styled from "styled-components/native"
import RNFS from 'react-native-fs'
import { FlatList, View } from "react-native"

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const StyledText = styled.Text`
  font-size: 30px;
`

export const FileIndex = () => {
  const [files, setFiles] = useState([])

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const path = RNFS.DocumentDirectoryPath
        const fileList = await RNFS.readDir(path);
        setFiles(fileList)
      } catch {
      }
    }

    fetchFiles()
  }, [])

  return (
    <Container>
      <StyledText>File</StyledText>
      <FlatList
        data={files}
        keyExtractor={(item) => item.path}
        renderItem={({item}) => (
          <View>      
            <StyledText>{item.name}</StyledText>
            <StyledText>{item.path}</StyledText>
          </View>
        )}
      />
    </Container>
  )
}