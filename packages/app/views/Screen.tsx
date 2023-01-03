import { LinearGradient, palette } from '@my/ui'

export const Screen = ({ children, ...props }) => {
  return (
    <LinearGradient
      f={1}
      br="$4"
      colors={[palette.bg, '$background']}
      start={[1, 1]}
      end={[0, 0]}
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      {children}
    </LinearGradient>
  )
}
