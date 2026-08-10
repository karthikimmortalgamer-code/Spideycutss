import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, OrbitControls, Sphere, Torus } from "@react-three/drei";
import type { Mesh, Group } from "three";

function WebCore() {
  const wire = useRef<Mesh>(null);
  const inner = useRef<Mesh>(null);
  const rings = useRef<Group>(null);

  useFrame((state, delta) => {
    if (wire.current) {
      wire.current.rotation.y += delta * 0.25;
      wire.current.rotation.x += delta * 0.08;
    }
    if (inner.current) {
      const t = state.clock.elapsedTime;
      inner.current.scale.setScalar(1 + Math.sin(t * 1.6) * 0.06);
      inner.current.rotation.y -= delta * 0.15;
    }
    if (rings.current) {
      rings.current.rotation.z += delta * 0.35;
      rings.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.5;
    }
  });

  return (
    <group>
      <Icosahedron ref={wire} args={[1.75, 3]}>
        <meshBasicMaterial color="#F5F5F5" wireframe transparent opacity={0.55} />
      </Icosahedron>

      <Sphere ref={inner} args={[1.05, 48, 48]}>
        <meshStandardMaterial
          color="#D11A2A"
          emissive="#D11A2A"
          emissiveIntensity={1.4}
          roughness={0.25}
          metalness={0.7}
          wireframe
        />
      </Sphere>

      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial
          color="#F5F5F5"
          emissive="#F5F5F5"
          emissiveIntensity={2.2}
          roughness={0.1}
        />
      </Sphere>

      <group ref={rings}>
        {[2.3, 2.6].map((r, i) => (
          <Torus key={r} args={[r, 0.008, 8, 128]} rotation={[i * 1.1, i * 0.6, 0]}>
            <meshBasicMaterial color={i === 0 ? "#F5F5F5" : "#D11A2A"} transparent opacity={0.8} />
          </Torus>
        ))}
      </group>
    </group>
  );
}

export function ThreeCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 6]} intensity={80} color="#F5F5F5" />
      <pointLight position={[-6, -4, 2]} intensity={60} color="#D11A2A" />
      <WebCore />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        rotateSpeed={0.6}
      />
    </Canvas>
  );
}

export default ThreeCanvas;
