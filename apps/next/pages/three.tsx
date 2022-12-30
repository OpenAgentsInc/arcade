// Create demo NextJS page

import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { Button, Stack, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import Blob from 'components/Blob'

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
        <Canvas>
          <directionalLight intensity={0.75} />
          <ambientLight intensity={0.75} />
          <Blob />
          <Preload all />
          <OrbitControls />
        </Canvas>
      </Stack>
      <YStack f={1} jc="center" ai="center" space>
        <Button icon={ChevronLeft}>Go Back</Button>
      </YStack>
    </>
  )
}
