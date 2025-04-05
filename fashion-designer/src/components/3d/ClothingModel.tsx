import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface ClothingModelProps {
  item: {
    type: string;
    color: string;
    fabric: string;
  };
}

export const ClothingModel = ({ item }: ClothingModelProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  // Basic placeholder geometry based on clothing type
  const getGeometry = () => {
    switch (item.type) {
      case 'shirt':
        return (
          <group>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[1, 1, 2, 32]} />
              <meshStandardMaterial color={item.color} />
            </mesh>
            {/* Sleeves */}
            <mesh position={[-1.2, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
              <meshStandardMaterial color={item.color} />
            </mesh>
            <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
              <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
              <meshStandardMaterial color={item.color} />
            </mesh>
          </group>
        );
      case 'pants':
        return (
          <group>
            {/* Legs */}
            <mesh position={[-0.5, -1, 0]}>
              <cylinderGeometry args={[0.4, 0.4, 2, 32]} />
              <meshStandardMaterial color={item.color} />
            </mesh>
            <mesh position={[0.5, -1, 0]}>
              <cylinderGeometry args={[0.4, 0.4, 2, 32]} />
              <meshStandardMaterial color={item.color} />
            </mesh>
          </group>
        );
      case 'dress':
        return (
          <mesh>
            <coneGeometry args={[1.5, 3, 32]} />
            <meshStandardMaterial color={item.color} />
          </mesh>
        );
      case 'jacket':
        return (
          <group>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[1.2, 1, 2, 32]} />
              <meshStandardMaterial color={item.color} />
            </mesh>
            {/* Sleeves */}
            <mesh position={[-1.4, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <cylinderGeometry args={[0.4, 0.4, 1.2, 32]} />
              <meshStandardMaterial color={item.color} />
            </mesh>
            <mesh position={[1.4, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
              <cylinderGeometry args={[0.4, 0.4, 1.2, 32]} />
              <meshStandardMaterial color={item.color} />
            </mesh>
          </group>
        );
      default:
        return (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={item.color} />
          </mesh>
        );
    }
  };

  return <group ref={meshRef}>{getGeometry()}</group>;
}; 