import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { CameraRig } from 'views/meta/CameraRig'

export const HudNavigator = () => {
  return (
    <Canvas>
      <Box position={[-1.2, 2, 0]} />
      <Box position={[1.2, 3, 0]} />
      <Box position={[1.2, 1, -5]} />
      <Box position={[1.2, 4, -10]} />
      <Box position={[-1.2, 5, 0]} />
      <Druid position={[-0, 0, -20]} rotation={[0, 0, 0]} scale={2} />
      <CameraRig />
      <rectAreaLight
        width={6}
        height={6}
        color="#ffffff"
        intensity={0.45}
        position={[-0, 0, -19]}
        lookAt={[-0, 10, -20]}
        penumbra={1}
        castShadow
      />
      <gridHelper args={[1000, 100, '#008080', '#008080']} />
      <mesh
        receiveShadow
        scale={[1000, 1000, 1000]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.25, 0]}
      >
        <planeGeometry />
        <meshPhongMaterial color="black" receiveShadow />
      </mesh>
      <ambientLight intensity={0.5} />
      <hemisphereLight intensity={0.25} />
    </Canvas>
  )
}

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX

  // pick a random color
  const color = Math.random() * 0xffffff

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : color} />
    </mesh>
  )
}
