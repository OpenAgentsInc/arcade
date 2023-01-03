import { LinearGradient, styled } from 'tamagui'

export const Screen = styled(LinearGradient, {
  name: 'Screen',
  flex: 1,
  pt: 50,
  br: '4',
  colors: ['$blue', '$background'],
  //   start: [1, 1],
  //   end: [0, 0],
  justifyContent: 'center',
  alignItems: 'center',
})
