import React from 'react'
import Sat from './sat.svg'

interface Props {
  width?: number
  height?: number
}

export const SvgIcon = (props: Props) => {
  const { width = 30, height = 26 } = props
  return <Sat width={width} height={height} />
}
