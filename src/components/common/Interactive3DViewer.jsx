import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Stage, Center } from '@react-three/drei';
import { Eye, RotateCw, Box, Layers, Palette } from 'lucide-react';

function RotatingGeometry({ modelType = 'printer', color = '#4f46e5', wireframe = false, autoRotate = true }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  if (modelType === 'printer' || modelType === '3d-printers') {
    return (
      <group ref={meshRef}>
        {/* Printer Base */}
        <mesh position={[0, -0.6, 0]}>
          <boxGeometry args={[2.2, 0.25, 2.0]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} wireframe={wireframe} />
        </mesh>
        {/* Heated Bed */}
        <mesh position={[0, -0.45, 0]}>
          <boxGeometry args={[1.8, 0.05, 1.8]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.4} wireframe={wireframe} />
        </mesh>
        {/* Vertical Z-Gantry Columns */}
        <mesh position={[-0.95, 0.4, 0]}>
          <boxGeometry args={[0.15, 1.8, 0.15]} />
          <meshStandardMaterial color="#334155" metalness={0.8} wireframe={wireframe} />
        </mesh>
        <mesh position={[0.95, 0.4, 0]}>
          <boxGeometry args={[0.15, 1.8, 0.15]} />
          <meshStandardMaterial color="#334155" metalness={0.8} wireframe={wireframe} />
        </mesh>
        {/* Top Cross Beam */}
        <mesh position={[0, 1.25, 0]}>
          <boxGeometry args={[2.05, 0.15, 0.15]} />
          <meshStandardMaterial color="#334155" metalness={0.8} wireframe={wireframe} />
        </mesh>
        {/* X-Axis Rail */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.9, 0.12, 0.12]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} wireframe={wireframe} />
        </mesh>
        {/* Extruder Toolhead */}
        <mesh position={[0.1, 0.18, 0]}>
          <boxGeometry args={[0.4, 0.45, 0.4]} />
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} wireframe={wireframe} />
        </mesh>
        {/* Brass Nozzle Tip */}
        <mesh position={[0.1, -0.1, 0]}>
          <coneGeometry args={[0.08, 0.15, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} wireframe={wireframe} />
        </mesh>
        {/* Filament Spool on Top */}
        <mesh position={[-0.5, 1.55, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color={color} roughness={0.3} wireframe={wireframe} />
        </mesh>
      </group>
    );
  }

  // Spool / Filament representation
  if (modelType === 'filaments') {
    return (
      <group ref={meshRef}>
        {/* Spool Core */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.9, 0.9, 0.6, 32]} />
          <meshStandardMaterial color={color} roughness={0.4} wireframe={wireframe} />
        </mesh>
        {/* Spool Flange Left */}
        <mesh position={[-0.32, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.3, 1.3, 0.05, 32]} />
          <meshStandardMaterial color="#334155" metalness={0.6} wireframe={wireframe} />
        </mesh>
        {/* Spool Flange Right */}
        <mesh position={[0.32, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.3, 1.3, 0.05, 32]} />
          <meshStandardMaterial color="#334155" metalness={0.6} wireframe={wireframe} />
        </mesh>
      </group>
    );
  }

  // Complex Gear / Functional mechanical part
  return (
    <group ref={meshRef}>
      <mesh>
        <torusKnotGeometry args={[0.9, 0.3, 128, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.6}
          wireframe={wireframe}
        />
      </mesh>
    </group>
  );
}

export default function Interactive3DViewer({ modelType = 'printer', defaultColor = '#4f46e5' }) {
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [modelColor, setModelColor] = useState(defaultColor);

  const colors = ['#4f46e5', '#f97316', '#10b981', '#06b6d4', '#ef4444', '#1e293b'];

  return (
    <div className="relative w-full h-[380px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-xl">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 1.5, 4.5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -5, -5]} intensity={0.4} color="#6366f1" />
        <Suspense fallback={null}>
          <Center>
            <RotatingGeometry
              modelType={modelType}
              color={modelColor}
              wireframe={wireframe}
              autoRotate={autoRotate}
            />
          </Center>
          <Grid
            renderOrder={-1}
            position={[0, -1.2, 0]}
            infiniteGrid
            cellSize={0.5}
            sectionSize={2}
            sectionColor="#4f46e5"
            cellColor="#334155"
            fadeDistance={25}
          />
        </Suspense>
        <OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.1} minDistance={2} maxDistance={8} />
      </Canvas>

      {/* Floating 3D Control Badges */}
      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs text-slate-200 flex items-center space-x-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-bold text-[11px] uppercase tracking-wider text-slate-100">Live 3D WebGL Engine</span>
      </div>

      {/* Control Buttons Bar */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 bg-slate-900/85 backdrop-blur-md p-2 rounded-2xl border border-slate-800">
        
        {/* Colors */}
        <div className="flex items-center space-x-1.5">
          <Palette className="w-3.5 h-3.5 text-slate-400 ml-1 mr-0.5" />
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setModelColor(c)}
              className={`w-5 h-5 rounded-full border-2 transition-transform ${
                modelColor === c ? 'border-white scale-125' : 'border-transparent hover:scale-110'
              }`}
              style={{ backgroundColor: c }}
              title={`Change to color ${c}`}
            />
          ))}
        </div>

        {/* View toggles */}
        <div className="flex items-center space-x-1 text-xs">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2.5 py-1 rounded-lg font-medium flex items-center space-x-1 transition-colors ${
              autoRotate ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <RotateCw className="w-3 h-3" />
            <span className="text-[11px]">Rotate</span>
          </button>

          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-2.5 py-1 rounded-lg font-medium flex items-center space-x-1 transition-colors ${
              wireframe ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span className="text-[11px]">Wireframe</span>
          </button>
        </div>

      </div>
    </div>
  );
}
