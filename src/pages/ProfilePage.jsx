import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Leva } from "leva";
import ProfileCard from "../components/ProfileCard";

function FullScreenWaves() {

  const mesh = React.useRef();
  const mouse = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();
      mesh.current.material.uniforms.uMouse.value.x = mouse.current.x;
      mesh.current.material.uniforms.uMouse.value.y = mouse.current.y;
    }
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -2]}>
      <planeGeometry args={[36, 24, 180, 66]} />
      <shaderMaterial
        vertexShader={`uniform float uTime;
          uniform vec2 uMouse;
          varying float vWave;
          void main() {
            vec3 pos = position;
            float freq = 0.7 + uMouse.x * 0.8;
            float amp  = 0.62 + uMouse.y * 0.28;
            pos.z += sin(pos.x * freq + uTime * 1.35) * 0.6;
            pos.z += sin((pos.x + pos.y) * 1.8 + uTime * 1.09) * amp;
            vWave = pos.z;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }`}
        fragmentShader={`varying float vWave;
          void main() {
            float shade = 0.11 + 0.87 * smoothstep(-0.65, 1.6, vWave);
            gl_FragColor = vec4(vec3(0.13,0.13,0.19)*shade + 0.7*vWave, 1.0);
          }`}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: { x: 0, y: 0 } },
        }}
        wireframe={false}
        transparent={false}
      />
    </mesh>
  );
}

export default function ProfilePage() {
  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden z-0 select-none">
      {/* 3D Animated Background */}
      <Canvas camera={{ position: [0, 0, 25], fov: 54 }}>
        <ambientLight intensity={0.68} />
        <Environment preset="night" />
        <FullScreenWaves />
      </Canvas>
      <Leva collapsed />
      {/* Profile Card Centered */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <ProfileCard />
      </div>
    </div>
  );
}
