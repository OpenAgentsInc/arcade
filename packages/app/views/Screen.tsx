import { LinearGradient, palette, Stack } from '@my/ui'

export const Screen = ({ children, ...props }) => {
  return (
    <LinearGradient
      f={1}
      colors={['$backgroundSoft', '$color3']}
      start={[1, 1]}
      end={[0, 0]}
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <Stack f={1} m="$1">
        {children}
      </Stack>
    </LinearGradient>
  )
}
