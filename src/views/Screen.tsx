import { LinearGradient, palette, Stack } from 'tamagui'

export const Screen = ({ children, ...props }) => {
  return (
    <LinearGradient
      f={1}
      colors={['black', '$color3']}
      start={[1, 1]}
      end={[0, 0]}
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <Stack f={1}>{children}</Stack>
    </LinearGradient>
  )
}
