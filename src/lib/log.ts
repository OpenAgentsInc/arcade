declare global {
  interface Console {
    tron: any
  }
}

export const log = (...props: any) => {
  if (!!console.tron && !!console.tron.log && __DEV__) {
    console.tron.log(props)
  }
}

export const display = (props: any) => {
  __DEV__ && console.tron.display(props)
}
