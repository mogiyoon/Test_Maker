export const enqueue = (queName, inputValue) => {
  queName.push(inputValue)
}

export const dequeue = (queName, num = 0) => {
  const tempValue = queName[num]
  queName.splice(num, 1)
  return tempValue
}