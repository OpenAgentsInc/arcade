import * as React from 'react'
import { Ionicons } from '@expo/vector-icons'

type Props = {
  name: string
  color: string
}

export default function TabBarIcon({ name, color }: Props) {
  return <Ionicons name={name} size={26} color={color} />
}
