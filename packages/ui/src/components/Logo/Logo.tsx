import { Image } from 'tamagui'

export const Logo = () => {
  return (
    <Image
      src={require('./logo.png')}
      width={200}
      height={200}
      mt={-60}
      resizeMode="contain"
    />
  )
}
