import { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useProgress, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { OBJLoader } from 'three-stdlib';
import { RotateCw, Eye, Box, RefreshCw } from 'lucide-react';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-3 bg-white/95 rounded-lg shadow-lg border border-gray-200 text-xs text-gray-700 pointer-events-none">
        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mb-1"></div>
        <span>Loading 3D Mesh {progress ? `${progress.toFixed(0)}%` : ''}</span>
      </div>
    </Html>
  );
}

// OBJ file loader with auto-normalization & material color injection
function OBJModel({ url, color, wireframe, autoRotate }) {
  const [obj, setObj] = useState(null);
  const [error, setError] = useState(false);
  const groupRef = useRef();

  useEffect(() => {
    let isMounted = true;
    const loader = new OBJLoader();
    
    loader.load(
      url,
      (loadedObj) => {
        if (!isMounted) return;
        setError(false);
        // Compute bounding box to center and scale uniformly
        const box = new THREE.Box3().setFromObject(loadedObj);
        const center = new THREE.Vector3();
        box.getCenter(center);
        loadedObj.position.sub(center);

        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = maxDim > 0 ? 3.0 / maxDim : 1;
        loadedObj.scale.set(scale, scale, scale);

        setObj(loadedObj);
      },
      undefined,
      (err) => {
        console.warn('Could not load OBJ, falling back to procedural preview', err);
        if (isMounted) setError(true);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [url]);

  // Update material on color/wireframe change
  useEffect(() => {
    if (!obj) return;
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color || '#2563eb'),
      roughness: 0.35,
      metalness: 0.25,
      wireframe: !!wireframe,
      side: THREE.DoubleSide
    });

    obj.traverse((child) => {
      if (child.isMesh) {
        child.material = mat;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [obj, color, wireframe]);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8;
    }
  });

  if (error || !obj) {
    if (error) {
      return (
        <mesh>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial color={color} wireframe={wireframe} />
        </mesh>
      );
    }
    return null;
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={obj} />
    </group>
  );
}

// Procedural 3D models for products that showcase functional, artistic, or mechanical 3D prints
function ProceduralModel({ type, color, wireframe, autoRotate }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8;
    }
  });

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color || '#0284c7'),
      roughness: 0.3,
      metalness: 0.3,
      wireframe: !!wireframe,
      side: THREE.DoubleSide
    });
  }, [color, wireframe]);

  const secondaryMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#334155'),
      roughness: 0.4,
      metalness: 0.6,
      wireframe: !!wireframe
    });
  }, [wireframe]);

  if (type === 'gearbox') {
    return (
      <group ref={groupRef}>
        {/* Outer Ring Gear */}
        <mesh material={material}>
          <torusGeometry args={[1.4, 0.2, 16, 32]} />
        </mesh>
        {/* Center Sun Gear */}
        <mesh material={material} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.4, 18]} />
        </mesh>
        {/* Central Shaft */}
        <mesh material={secondaryMaterial} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.9, 16]} />
        </mesh>
        {/* 3 Planetary Gears */}
        {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => (
          <mesh
            key={idx}
            material={material}
            position={[Math.cos(angle) * 0.85, Math.sin(angle) * 0.85, 0]}
          >
            <cylinderGeometry args={[0.35, 0.35, 0.38, 14]} />
          </mesh>
        ))}
        {/* Carrier Plate */}
        <mesh material={secondaryMaterial} position={[0, 0, -0.22]}>
          <cylinderGeometry args={[1.1, 1.1, 0.08, 24]} />
        </mesh>
      </group>
    );
  }

  if (type === 'vase') {
    return (
      <group ref={groupRef} position={[0, -0.6, 0]}>
        {/* Parametric Spiral Vase Body */}
        <mesh material={material} position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.85, 0.55, 1.8, 28, 16, true]} />
        </mesh>
        <mesh material={material} position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.56, 0.56, 0.1, 28]} />
        </mesh>
        {/* Internal Pot Liner */}
        <mesh material={secondaryMaterial} position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.7, 0.48, 1.6, 24]} />
        </mesh>
      </group>
    );
  }

  if (type === 'samurai') {
    return (
      <group ref={groupRef} position={[0, -0.7, 0]}>
        {/* Torso Cyber Armor */}
        <mesh material={material} position={[0, 0.7, 0]}>
          <boxGeometry args={[0.8, 0.9, 0.5]} />
        </mesh>
        {/* Cyber Helmet */}
        <mesh material={material} position={[0, 1.45, 0]}>
          <dodecahedronGeometry args={[0.35, 1]} />
        </mesh>
        {/* Helmet Crest */}
        <mesh material={secondaryMaterial} position={[0, 1.8, 0.1]}>
          <boxGeometry args={[0.4, 0.25, 0.05]} />
        </mesh>
        {/* Shoulder Pauldrons */}
        <mesh material={material} position={[-0.65, 1.05, 0]}>
          <boxGeometry args={[0.4, 0.35, 0.45]} />
        </mesh>
        <mesh material={material} position={[0.65, 1.05, 0]}>
          <boxGeometry args={[0.4, 0.35, 0.45]} />
        </mesh>
        {/* Dual Katanas crossed behind back */}
        <mesh material={secondaryMaterial} position={[0, 0.9, -0.35]} rotation={[0, 0, 0.6]}>
          <cylinderGeometry args={[0.03, 0.03, 1.8, 8]} />
        </mesh>
        <mesh material={secondaryMaterial} position={[0, 0.9, -0.35]} rotation={[0, 0, -0.6]}>
          <cylinderGeometry args={[0.03, 0.03, 1.8, 8]} />
        </mesh>
        {/* Magnetic Display Plinth */}
        <mesh material={secondaryMaterial} position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.9, 1.0, 0.2, 24]} />
        </mesh>
      </group>
    );
  }

  if (type === 'spool') {
    return (
      <group ref={groupRef} rotation={[Math.PI / 4, 0, 0]}>
        {/* Outer Flanges */}
        <mesh material={secondaryMaterial} position={[0, 0, 0.4]}>
          <cylinderGeometry args={[1.3, 1.3, 0.06, 32]} />
        </mesh>
        <mesh material={secondaryMaterial} position={[0, 0, -0.4]}>
          <cylinderGeometry args={[1.3, 1.3, 0.06, 32]} />
        </mesh>
        {/* Center Spool Core */}
        <mesh material={secondaryMaterial} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.76, 32]} />
        </mesh>
        {/* Wound Filament Coil */}
        <mesh material={material} position={[0, 0, 0]}>
          <cylinderGeometry args={[1.15, 1.15, 0.74, 32, 1, true]} />
        </mesh>
      </group>
    );
  }

  if (type === 'bottle') {
    return (
      <group ref={groupRef} position={[0, -0.6, 0]}>
        {/* Bottle Body */}
        <mesh material={material} position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.65, 0.65, 1.5, 32]} />
        </mesh>
        {/* Bottle Neck */}
        <mesh material={secondaryMaterial} position={[0, 1.6, 0]}>
          <cylinderGeometry args={[0.25, 0.35, 0.4, 24]} />
        </mesh>
        {/* Child Safe Cap */}
        <mesh material={secondaryMaterial} position={[0, 1.9, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.25, 24]} />
        </mesh>
      </group>
    );
  }

  if (type === 'keychain') {
    return (
      <group ref={groupRef}>
        {/* Keychain Base Plate */}
        <mesh material={material} position={[0, 0, 0]}>
          <boxGeometry args={[2.0, 0.7, 0.14]} />
        </mesh>
        {/* Embossed Text Block 1 */}
        <mesh material={secondaryMaterial} position={[-0.4, 0, 0.1]}>
          <boxGeometry args={[0.8, 0.35, 0.1]} />
        </mesh>
        {/* Embossed Text Block 2 */}
        <mesh material={secondaryMaterial} position={[0.45, 0, 0.1]}>
          <boxGeometry args={[0.65, 0.35, 0.1]} />
        </mesh>
        {/* Metal Split Ring */}
        <mesh material={secondaryMaterial} position={[-1.2, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.05, 12, 24]} />
        </mesh>
      </group>
    );
  }

  if (type === 'drone') {
    return (
      <group ref={groupRef} position={[0, -0.2, 0]}>
        {/* Center Hub */}
        <mesh material={secondaryMaterial} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.12, 16]} />
        </mesh>
        {/* 4 Carbon Arms */}
        {[Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4].map((ang, i) => (
          <group key={i} rotation={[0, ang, 0]}>
            <mesh material={secondaryMaterial} position={[0.8, 0, 0]}>
              <boxGeometry args={[1.2, 0.08, 0.14]} />
            </mesh>
            {/* Motor Bell */}
            <mesh material={material} position={[1.4, 0.1, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.18, 16]} />
            </mesh>
          </group>
        ))}
        {/* Camera TPU Canopy */}
        <mesh material={material} position={[0, 0.25, 0.1]}>
          <coneGeometry args={[0.35, 0.45, 12]} />
        </mesh>
      </group>
    );
  }

  // Fallback parametric geometry
  return (
    <group ref={groupRef}>
      <mesh material={material}>
        <torusKnotGeometry args={[0.9, 0.28, 64, 16]} />
      </mesh>
    </group>
  );
}

export default function ModelViewer({
  url,
  modelType = 'procedural',
  proceduralType = 'gearbox',
  initialColor = '#2563eb',
  showControls = true,
  height = '320px'
}) {
  const [color, setColor] = useState(initialColor);
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const controlsRef = useRef();

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const presetColors = [
    { label: 'Royal Blue', hex: '#2563eb' },
    { label: 'Crimson Red', hex: '#dc2626' },
    { label: 'Emerald Green', hex: '#059669' },
    { label: 'Silk Gold', hex: '#d97706' },
    { label: 'Cyber Purple', hex: '#7c3aed' },
    { label: 'Stealth Black', hex: '#1e293b' },
    { label: 'Pure White', hex: '#f8fafc' },
  ];

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60 shadow-inner group select-none" style={{ height }}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [2.5, 2.5, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#090d16']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-10, -5, -5]} intensity={0.6} color="#60a5fa" />
        <pointLight position={[0, 5, 0]} intensity={0.5} />

        <Suspense fallback={<Loader />}>
          {modelType === 'obj' && url ? (
            <OBJModel
              url={url}
              color={color}
              wireframe={wireframe}
              autoRotate={autoRotate}
            />
          ) : (
            <ProceduralModel
              type={proceduralType}
              color={color}
              wireframe={wireframe}
              autoRotate={autoRotate}
            />
          )}

          {showGrid && (
            <Grid
              position={[0, -1.2, 0]}
              args={[10, 10]}
              cellSize={0.5}
              cellThickness={1}
              cellColor="#334155"
              sectionSize={2}
              sectionThickness={1.5}
              sectionColor="#0284c7"
              fadeDistance={20}
              fadeStrength={1}
            />
          )}
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.05}
          minDistance={1.2}
          maxDistance={12}
        />
      </Canvas>

      {/* Floating 3D Badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/85 backdrop-blur-md rounded-md border border-slate-700/80 text-[11px] font-semibold text-cyan-400">
        <Box className="w-3.5 h-3.5 animate-pulse" />
        <span>3D Interactive Studio</span>
      </div>

      {/* Action Controls Toolbar */}
      {showControls && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
            className={`p-1.5 rounded-lg text-xs font-medium transition-colors backdrop-blur-md border ${
              autoRotate
                ? 'bg-blue-600/80 text-white border-blue-400'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setWireframe(!wireframe)}
            title="Toggle Wireframe CAD Mode"
            className={`p-1.5 rounded-lg text-xs font-medium transition-colors backdrop-blur-md border ${
              wireframe
                ? 'bg-amber-500/80 text-white border-amber-400'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setShowGrid(!showGrid)}
            title="Toggle 3D Print Bed Grid"
            className={`p-1.5 rounded-lg text-xs font-medium transition-colors backdrop-blur-md border ${
              showGrid
                ? 'bg-cyan-600/80 text-white border-cyan-400'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <span className="text-[10px] font-bold px-0.5">BED</span>
          </button>

          <button
            type="button"
            onClick={handleResetCamera}
            title="Reset Camera Angle"
            className="p-1.5 rounded-lg text-xs font-medium bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700 transition-colors backdrop-blur-md"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Color Finishes Swatch Bar */}
      {showControls && (
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 bg-slate-900/85 backdrop-blur-md rounded-lg border border-slate-700/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">Material Finish:</span>
            <div className="flex items-center gap-1.5">
              {presetColors.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setColor(c.hex)}
                  title={c.label}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    color === c.hex ? 'scale-125 border-white ring-2 ring-blue-500 ring-offset-1 ring-offset-slate-900' : 'border-slate-600 hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
          <span className="text-[10px] text-slate-400 tracking-wide font-mono">
            Drag to Rotate • Scroll to Zoom
          </span>
        </div>
      )}
    </div>
  );
}
