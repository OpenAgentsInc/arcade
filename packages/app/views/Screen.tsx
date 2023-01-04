import { LinearGradient, palette, Stack } from '@my/ui'

export const Screen = ({ children, ...props }) => {
  return (
    <LinearGradient
      f={1}
      colors={[palette.bg, '$background']}
      start={[1, 1]}
      end={[0, 0]}
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <Stack f={1} pt={30} m="$4">
        {children}
      </Stack>
    </LinearGradient>
  )
}
