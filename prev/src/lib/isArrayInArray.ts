export const isArrayInArray = (item: string[], arr: any[]) => {
  var item_as_string = JSON.stringify(item)
  var contains = arr.some(function (ele) {
    return JSON.stringify(ele) === item_as_string
  })
  return contains
}
