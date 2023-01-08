import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { Button, Stack, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import dynamic from 'next/dynamic'

const Stars = dynamic(() => import('components/Stars'), { ssr: false })

export default function Three() {
  return (
    <>
      <Stack
        style={{
          flex: 1,
          position: 'absolute',
          backgroundColor: 'black',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Canvas camera={{ position: [0, 0, 1] }}>
          <directionalLight intensity={0.75} />
          <ambientLight intensity={0.75} />
          <Stars />
          <Preload all />
          <OrbitControls />
        </Canvas>
      </Stack>
      <YStack f={1} jc="center" ai="center" space>
        <Button
          backgroundColor="$electricIndigo"
          hoverStyle={{ backgroundColor: '$electricViolet', borderWidth: 0 }}
          focusStyle={{ backgroundColor: '$indigo', borderWidth: 0 }}
          icon={ChevronLeft}
        >
          Do nothing
        </Button>
      </YStack>
    </>
  )
}
