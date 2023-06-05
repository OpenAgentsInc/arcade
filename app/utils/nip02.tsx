export function arrayToNIP02(arr: string[]) {
  const newArr = []
  arr.forEach((item: any) => {
    newArr.push(["p", item.pubkey])
  })

  return newArr
}
