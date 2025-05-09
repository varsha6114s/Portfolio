import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import styled from '@emotion/styled'
import Scene from './components/Scene'
import { Suspense } from 'react'

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
`

const LoadingFallback = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.5rem;
`

function App() {
  return (
    <AppContainer>
      <Suspense fallback={<LoadingFallback>Loading 3D Scene...</LoadingFallback>}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          style={{ background: '#000' }}
        >
          <color attach="background" args={['#000']} />
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Scene />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </Suspense>
    </AppContainer>
  )
}

export default App
