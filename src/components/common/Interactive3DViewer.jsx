import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, Float, ContactShadows } from '@react-three/drei';
import { RotateCw, Eye, Sparkles, Box, RefreshCw } from 'lucide-react';

// Procedural 3D Models reflecting our 3D Printed Products
function KeychainModel({ colors, customText }) {
  const groupRef = useRef();
  const topColor = colors?.top_text || colors?.script_finish || '#F59E0B';
  const baseColor = colors?.base_plate || colors?.frame_housing || '#0F172A';

  return (
    <group ref={groupRef} dispose={null}>
      {/* Base Plate with rounded feel */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.2, 0.22]} />
        <meshStandardMaterial color={baseColor} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Raised Lettering Bars / Custom text embossing representation */}
      <group position={[0, 0, 0.16]}>
        <mesh position={[-0.9, 0, 0]} castShadow>
          <boxGeometry args={[0.35, 0.7, 0.15]} />
          <meshStandardMaterial color={topColor} roughness={0.2} metalness={0.25} />
        </mesh>
        <mesh position={[-0.3, 0, 0]} castShadow>
          <boxGeometry args={[0.35, 0.7, 0.15]} />
          <meshStandardMaterial color={topColor} roughness={0.2} metalness={0.25} />
        </mesh>
        <mesh position={[0.3, 0, 0]} castShadow>
          <boxGeometry args={[0.35, 0.7, 0.15]} />
          <meshStandardMaterial color={topColor} roughness={0.2} metalness={0.25} />
        </mesh>
        <mesh position={[0.9, 0, 0]} castShadow>
          <boxGeometry args={[0.35, 0.7, 0.15]} />
          <meshStandardMaterial color={topColor} roughness={0.2} metalness={0.25} />
        </mesh>
      </group>

      {/* Reinforced Keychain Eyelet loop */}
      <mesh position={[-1.75, 0, 0]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.28, 0.08, 16, 32]} />
        <meshStandardMaterial color={baseColor} roughness={0.3} />
      </mesh>

      {/* Chrome Split Ring */}
      <mesh position={[-2.2, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.05, 16, 40]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
}

function CakeTopperModel({ colors }) {
  const finishColor = colors?.script_finish || colors?.top_text || '#E2B872';

  return (
    <group dispose={null} position={[0, -0.3, 0]}>
      {/* Script banner arc */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <torusGeometry args={[1.3, 0.09, 16, 60, Math.PI]} rotation={[0, 0, Math.PI]} />
        <meshStandardMaterial color={finishColor} roughness={0.15} metalness={0.7} />
      </mesh>

      {/* Flourish hearts and decorative typography glyphs */}
      <mesh position={[-0.6, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color={finishColor} roughness={0.15} metalness={0.7} />
      </mesh>
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 0.35, 6]} />
        <meshStandardMaterial color={finishColor} roughness={0.15} metalness={0.7} />
      </mesh>
      <mesh position={[0.6, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color={finishColor} roughness={0.15} metalness={0.7} />
      </mesh>

      {/* Horizontal connecting text spine */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[2.2, 0.22, 0.12]} />
        <meshStandardMaterial color={finishColor} roughness={0.15} metalness={0.7} />
      </mesh>

      {/* Dual Food-Safe Insertion Stakes */}
      <mesh position={[-0.7, -0.6, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.015, 1.8, 16]} />
        <meshStandardMaterial color={finishColor} roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh position={[0.7, -0.6, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.015, 1.8, 16]} />
        <meshStandardMaterial color={finishColor} roughness={0.2} metalness={0.5} />
      </mesh>
    </group>
  );
}

function NameBoardModel({ colors }) {
  const fontColor = colors?.font_face || colors?.top_text || '#06B6D4';
  const frameColor = colors?.frame_housing || colors?.base_plate || '#0F172A';

  return (
    <group dispose={null}>
      {/* Angled Desk Stand Base Chassis */}
      <mesh position={[0, -0.4, 0]} rotation={[-0.2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.9, 0.7]} />
        <meshStandardMaterial color={frameColor} roughness={0.6} />
      </mesh>

      {/* Backlit Face Plate */}
      <mesh position={[0, 0.3, -0.05]} rotation={[-0.1, 0, 0]} castShadow>
        <boxGeometry args={[3.4, 1.3, 0.25]} />
        <meshStandardMaterial color={frameColor} roughness={0.4} />
      </mesh>

      {/* Elevated 3D Illuminated Lettering blocks */}
      <group position={[0, 0.3, 0.15]} rotation={[-0.1, 0, 0]}>
        <mesh position={[-1.1, 0, 0]} castShadow>
          <boxGeometry args={[0.45, 0.75, 0.2]} />
          <meshStandardMaterial color={fontColor} emissive={fontColor} emissiveIntensity={0.35} roughness={0.2} />
        </mesh>
        <mesh position={[-0.35, 0, 0]} castShadow>
          <boxGeometry args={[0.45, 0.75, 0.2]} />
          <meshStandardMaterial color={fontColor} emissive={fontColor} emissiveIntensity={0.35} roughness={0.2} />
        </mesh>
        <mesh position={[0.35, 0, 0]} castShadow>
          <boxGeometry args={[0.45, 0.75, 0.2]} />
          <meshStandardMaterial color={fontColor} emissive={fontColor} emissiveIntensity={0.35} roughness={0.2} />
        </mesh>
        <mesh position={[1.1, 0, 0]} castShadow>
          <boxGeometry args={[0.45, 0.75, 0.2]} />
          <meshStandardMaterial color={fontColor} emissive={fontColor} emissiveIntensity={0.35} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

function LampModel({ colors }) {
  const baseColor = colors?.base_pedestal || '#78350F';

  return (
    <group dispose={null} position={[0, -0.3, 0]}>
      {/* Turned Wooden / Marble Pedestal Base */}
      <mesh position={[0, -0.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.9, 1.1, 0.45, 32]} />
        <meshStandardMaterial color={baseColor} roughness={0.6} />
      </mesh>

      {/* Internal Warm Ambient LED Core */}
      <pointLight position={[0, 0.4, 0]} intensity={1.8} distance={5} color="#FED7AA" />

      {/* Cylindrical 3D Lithophane Diffuser Shell */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.85, 0.85, 1.9, 48, 1, true]} />
        <meshStandardMaterial
          color="#FFFBEB"
          emissive="#FEF3C7"
          emissiveIntensity={0.4}
          roughness={0.7}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Lithophane surface relief rings */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.86, 0.86, 0.1, 48]} />
        <meshStandardMaterial color="#FDE68A" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.86, 0.86, 0.1, 48]} />
        <meshStandardMaterial color="#FDE68A" roughness={0.8} />
      </mesh>
    </group>
  );
}

function StatueModel({ colors }) {
  const statueColor = colors?.sculpture_tone || colors?.outer_rings || '#F43F5E';
  const coreColor = colors?.core_sphere || '#EAB308';
  const group = useRef();

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.4;
      group.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <group ref={group} dispose={null}>
      {/* Intertwined Torus Ribbons */}
      <mesh castShadow>
        <torusKnotGeometry args={[0.9, 0.28, 128, 32, 2, 3]} />
        <meshStandardMaterial color={statueColor} roughness={0.15} metalness={0.4} />
      </mesh>

      {/* Floating Center Gem Core */}
      <mesh position={[0, 0, 0]}>
        <dodecahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color={coreColor} roughness={0.1} metalness={0.8} />
      </mesh>
    </group>
  );
}

function PlanterModel({ colors }) {
  const potColor = colors?.planter_body || '#10B981';

  return (
    <group dispose={null} position={[0, -0.4, 0]}>
      {/* Faceted Low-Poly Body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.95, 0.65, 1.4, 7]} />
        <meshStandardMaterial color={potColor} roughness={0.5} flatShading />
      </mesh>

      {/* Soil layer */}
      <mesh position={[0, 0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.85, 7]} />
        <meshStandardMaterial color="#3E2723" roughness={0.9} />
      </mesh>

      {/* Succulent green rosette petals */}
      <group position={[0, 0.8, 0]}>
        <mesh position={[0, 0.2, 0]}>
          <coneGeometry args={[0.35, 0.5, 5]} />
          <meshStandardMaterial color="#86EFAC" roughness={0.4} />
        </mesh>
        <mesh position={[0.2, 0.1, 0.2]} rotation={[0.4, 0.5, 0]}>
          <coneGeometry args={[0.25, 0.4, 5]} />
          <meshStandardMaterial color="#4ADE80" roughness={0.4} />
        </mesh>
        <mesh position={[-0.2, 0.1, -0.2]} rotation={[-0.4, -0.5, 0]}>
          <coneGeometry args={[0.25, 0.4, 5]} />
          <meshStandardMaterial color="#4ADE80" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

export default function Interactive3DViewer({ product, selectedColors, customText }) {
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef();

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const renderModel = () => {
    const type = product?.modelType || 'keychain';
    switch (type) {
      case 'topper':
        return <CakeTopperModel colors={selectedColors} />;
      case 'signboard':
        return <NameBoardModel colors={selectedColors} />;
      case 'lamp':
        return <LampModel colors={selectedColors} />;
      case 'statue':
        return <StatueModel colors={selectedColors} />;
      case 'planter':
        return <PlanterModel colors={selectedColors} />;
      case 'keychain':
      default:
        return <KeychainModel colors={selectedColors} customText={customText} />;
    }
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[460px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      
      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [0, 1.2, 4.2], fov: 42 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 7, 5]} intensity={1.6} castShadow shadow-mapSize={1024} />
        <pointLight position={[-4, -2, -3]} intensity={0.8} color="#38BDF8" />
        <pointLight position={[3, -2, 2]} intensity={0.6} color="#F43F5E" />

        <Center top>
          <Float speed={autoRotate ? 1.5 : 0} rotationIntensity={0.2} floatIntensity={0.3}>
            {renderModel()}
          </Float>
        </Center>

        <ContactShadows position={[0, -1.2, 0]} opacity={0.6} scale={7} blur={2} far={3} />
        <OrbitControls
          ref={controlsRef}
          autoRotate={autoRotate}
          autoRotateSpeed={2.2}
          enablePan={false}
          minDistance={2.5}
          maxDistance={7}
          maxPolarAngle={Math.PI / 2 + 0.2}
        />
      </Canvas>

      {/* Floating 3D Badge */}
      <div className="absolute top-4 left-4 flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 text-xs font-semibold text-slate-200">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Live WebGL 3D Preview</span>
      </div>

      {/* Interactive Controls Overlay */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md backdrop-blur-md ${
            autoRotate
              ? 'bg-indigo-600 text-white border border-indigo-400'
              : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:text-white'
          }`}
          title="Toggle 360 Auto-Rotation"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{autoRotate ? 'Rotating' : 'Paused'}</span>
        </button>

        <button
          onClick={handleResetCamera}
          className="p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-all shadow-md backdrop-blur-md"
          title="Reset Camera View"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Hint Bar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-800 text-[11px] text-slate-400 pointer-events-none">
        <Eye className="w-3.5 h-3.5 text-indigo-400" />
        <span>Drag to rotate 360° • Pinch / scroll to inspect layers</span>
      </div>

    </div>
  );
}
