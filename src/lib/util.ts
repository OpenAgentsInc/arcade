export const numberWithCommas = (x: number | string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min
}

export function capitalize(theString: string) {
  return theString.charAt(0).toUpperCase() + theString.slice(1)
}

export const Capitalize = (word: any) => {
  return typeof word === 'string'
    ? word.charAt(0).toUpperCase() + word.slice(1)
    : word
}

export const convertFromKM = (
  kilometers: number,
  unit: string,
  decimals: number = 2
): string => {
  const value = unit.toLocaleLowerCase()
  let distance = kilometers

  // new variations, add here
  switch (value) {
    case 'mi':
      distance = kilometers / 1.621371
      break
    default:
      distance = kilometers
      break
  }
  return distance.toFixed(decimals)
}
