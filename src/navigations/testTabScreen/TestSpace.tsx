import React, { useEffect, useState } from "react"
import styled from "styled-components/native"
import { testRealm } from "../../db/MyTestDB"

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const StyledText = styled.Text`
  font-size: 30px;
`

const testTree = []

const testTreeInsert = (data) => {
  const refineData = {
    id: data.id,
    category: data.category,
    word: data.word,
  }

  testTree.push(refineData)
}

const categoryAlign = (data) => {
  const tempCategory = data['categroy']

}

export const TestSpace = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const myTest = testRealm.objects('MyTest')
      setData(Array.from(myTest))
    }

    loadData()

    testRealm.objects('MyTest').addListener(loadData)

    return () => {
      testRealm.objects('MyTest').removeListener(loadData)
    }
  }, [])

  return (
    <Container>
      <StyledText>TestSpace</StyledText>
    </Container>
  )
}