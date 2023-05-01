import { useRouter } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // const router = useRouter()
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += delta))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => {
        setActive(!active)
        // router.push('/login')
      }}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'cyan'} />
    </mesh>
  )
}

export const BackgroundCanvas = () => {
  return (
    <Canvas>
      <color attach="background" args={['#000']} />
      <ambientLight intensity={0.05} />
      <pointLight position={[10, 10, 10]} intensity={0.4} />
      <Box position={[-3.2, 0, 0]} />
      <Box position={[3.2, 0, 0]} />
    </Canvas>
  )
}
