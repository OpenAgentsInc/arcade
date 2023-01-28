import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export const CameraRig = () => {
  const ref = useRef<any>()
  const howClose = -32
  useFrame(() => {
    if (ref.current.position.z > howClose) {
      ref.current.position.z -= 0.01
    }
  })
  return (
    <>
      {/* @ts-ignore */}
      <PerspectiveCamera
        ref={ref}
        makeDefault
        position={[0, 2, 10]}
        lookAt={[-0, 0, -20]}
      />
    </>
  )
}
