export const generateRandomPlacekitten = () => {
  const width = Math.floor(Math.random() * (220 - 200 + 1)) + 200
  const height = Math.floor(Math.random() * (320 - 300 + 1)) + 300
  return `https://placekitten.com/${width}/${height}`
}
