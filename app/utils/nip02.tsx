export function arrayToNIP02(arr: string[]) {
  const newArr = []
  arr.forEach((item) => {
    newArr.push(["p", item])
  })

  return newArr
}
