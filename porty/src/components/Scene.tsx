import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import Modal from './Modal'

interface OrbitalNodeProps {
  position: [number, number, number]
  label: string
  onClick: () => void
}

const OrbitalNode = ({ position, label, onClick }: OrbitalNodeProps) => {
  const meshRef = useRef<THREE.Mesh>(null)

  const handlePointerOver = () => {
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 0.3,
      })
    }
  }

  const handlePointerOut = () => {
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
      })
    }
  }

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffff"
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      <Text
        position={[0, -1, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  )
}

const Scene = () => {
  const groupRef = useRef<THREE.Group>(null)
  const [activeModal, setActiveModal] = useState<string | null>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
  })

  const nodes = [
    {
      position: [3, 0, 0],
      label: 'Projects',
      content: (
        <div>
          <h3>My Projects</h3>
          <p>Here are some of my recent works...</p>
        </div>
      ),
    },
    {
      position: [-3, 0, 0],
      label: 'About',
      content: (
        <div>
          <h3>About Me</h3>
          <p>I'm a passionate developer...</p>
        </div>
      ),
    },
    {
      position: [0, 3, 0],
      label: 'Resume',
      content: (
        <div>
          <h3>Resume</h3>
          <p>My professional experience...</p>
        </div>
      ),
    },
    {
      position: [0, -3, 0],
      label: 'Contact',
      content: (
        <div>
          <h3>Contact Me</h3>
          <p>Get in touch...</p>
        </div>
      ),
    },
  ]

  return (
    <>
      <group ref={groupRef}>
        {/* Central Node */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.2}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
        <Text
          position={[0, 0, 1.5]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Your Name
        </Text>

        {/* Orbital Nodes */}
        {nodes.map((node, index) => (
          <OrbitalNode
            key={index}
            position={node.position as [number, number, number]}
            label={node.label}
            onClick={() => setActiveModal(node.label)}
          />
        ))}
      </group>

      {/* Modals */}
      {nodes.map((node) => (
        <Modal
          key={node.label}
          isOpen={activeModal === node.label}
          onClose={() => setActiveModal(null)}
          title={node.label}
        >
          {node.content}
        </Modal>
      ))}
    </>
  )
}

export default Scene 