interface TestSpaceExplainList {
  test1: string
  test2: string
}
const englishTestSpaceExplainList : TestSpaceExplainList = {
  test1: 'test1',
  test2: 'test2'
}
const koreanTestSpaceExplainList : TestSpaceExplainList = {
  test1: '테스트1',
  test2: '테스트2'
}


export interface ExplainListChooser {
  English : TestSpaceExplainList
  Korean : TestSpaceExplainList
}

export const testSpaceExplainList : ExplainListChooser = {
  English : englishTestSpaceExplainList,
  Korean : koreanTestSpaceExplainList,
} as const