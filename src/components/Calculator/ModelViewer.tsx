import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCw, Eye, Box, Maximize2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ModelViewerProps {
  geometry: THREE.BufferGeometry | null;
  materialColor: string;
  wireframe: boolean;
  onToggleWireframe: () => void;
  dimensions: { x: number; y: number; z: number } | null;
  loading: boolean;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({
  geometry,
  materialColor,
  wireframe,
  onToggleWireframe,
  dimensions,
  loading
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const gridRef = useRef<THREE.GridHelper | null>(null);
  const { theme } = useTheme();

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(theme === 'dark' ? 0x0f172a : 0xf1f5f9);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    camera.position.set(150, 180, 220);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    containerRef.current.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 1000;
    controls.minDistance = 10;
    controls.target.set(0, 20, 0);
    controlsRef.current = controls;

    // 5. Lighting: Studio setup
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 1.0 : 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(120, 200, 150);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x94a3b8, 0.8);
    dirLight2.position.set(-100, 100, -100);
    scene.add(dirLight2);

    // 6. Build Plate (representing Bambu Lab P1S 256x256mm build plate)
    const bedSize = 256;
    const gridColor1 = theme === 'dark' ? 0x22c55e : 0x15803d;
    const gridColor2 = theme === 'dark' ? 0x334155 : 0xcbd5e1;
    const gridHelper = new THREE.GridHelper(bedSize, 32, gridColor1, gridColor2);
    gridHelper.position.y = 0;
    scene.add(gridHelper);
    gridRef.current = gridHelper;

    // Ground plane to catch subtle shadows
    const planeGeo = new THREE.PlaneGeometry(bedSize, bedSize);
    const planeMat = new THREE.ShadowMaterial({ opacity: theme === 'dark' ? 0.35 : 0.15 });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.1;
    plane.receiveShadow = true;
    scene.add(plane);

    // 7. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 8. Handle Resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update scene background and grid on theme toggle
  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.background = new THREE.Color(theme === 'dark' ? 0x0f172a : 0xf1f5f9);
    if (gridRef.current && sceneRef.current) {
      sceneRef.current.remove(gridRef.current);
      const bedSize = 256;
      const gridColor1 = theme === 'dark' ? 0x22c55e : 0x15803d;
      const gridColor2 = theme === 'dark' ? 0x334155 : 0xcbd5e1;
      const newGrid = new THREE.GridHelper(bedSize, 32, gridColor1, gridColor2);
      sceneRef.current.add(newGrid);
      gridRef.current = newGrid;
    }
  }, [theme]);

  // Update Geometry and fit camera
  useEffect(() => {
    if (!sceneRef.current || !controlsRef.current || !cameraRef.current) return;

    // Remove existing model mesh
    if (meshRef.current) {
      sceneRef.current.remove(meshRef.current);
      meshRef.current.geometry.dispose();
      if (Array.isArray(meshRef.current.material)) {
        meshRef.current.material.forEach(m => m.dispose());
      } else {
        meshRef.current.material.dispose();
      }
      meshRef.current = null;
    }

    if (!geometry) return;

    // Center geometry on build plate
    geometry.computeBoundingBox();
    const bbox = geometry.boundingBox;
    if (!bbox) return;

    const center = new THREE.Vector3();
    bbox.getCenter(center);
    // Center X & Z, place lowest Y on bed level (y = 0)
    geometry.translate(-center.x, -bbox.min.y, -center.z);

    // Recompute normals
    geometry.computeVertexNormals();

    // Create Material with realistic shading
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(materialColor),
      roughness: 0.35,
      metalness: 0.1,
      wireframe: wireframe
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    sceneRef.current.add(mesh);
    meshRef.current = mesh;

    // Adjust camera to fit model size nicely
    const size = new THREE.Vector3();
    bbox.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z, 20);
    const camera = cameraRef.current;
    const distance = maxDim * 2.2;
    camera.position.set(distance * 0.9, distance * 0.8, distance * 1.1);
    controlsRef.current.target.set(0, size.y / 2, 0);
    controlsRef.current.update();

  }, [geometry]);

  // Update material color and wireframe dynamically
  useEffect(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    if (mat) {
      mat.color.set(materialColor);
      mat.wireframe = wireframe;
      mat.needsUpdate = true;
    }
  }, [materialColor, wireframe]);

  // Reset Camera View
  const handleResetCamera = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    if (dimensions) {
      const maxDim = Math.max(dimensions.x, dimensions.y, dimensions.z, 30);
      const distance = maxDim * 2.2;
      cameraRef.current.position.set(distance * 0.9, distance * 0.8, distance * 1.1);
      controlsRef.current.target.set(0, dimensions.z / 2, 0);
      controlsRef.current.update();
    } else {
      cameraRef.current.position.set(150, 180, 220);
      controlsRef.current.target.set(0, 20, 0);
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full h-[420px] md:h-[500px] bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-inner flex flex-col justify-between transition-colors">
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white z-20">
          <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="font-semibold text-sm tracking-wide">Memproses geometri 3D...</p>
          <p className="text-xs text-slate-300 mt-1">Menghitung volume solid mesh...</p>
        </div>
      )}

      {/* Floating Controls Bar */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button
          type="button"
          onClick={onToggleWireframe}
          aria-label="Toggle Wireframe mode"
          title="Tampilan Wireframe / Solid"
          className={`p-2.5 rounded-lg border text-xs font-medium transition-colors shadow-xs ${
            wireframe
              ? 'bg-emerald-700 text-white border-emerald-800'
              : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-750'
          }`}
        >
          <Eye className="w-4 h-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleResetCamera}
          aria-label="Reset Camera View"
          title="Reset Sudut Kamera"
          className="p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-750 text-xs font-medium transition-colors shadow-xs"
        >
          <RotateCw className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* Bed Reference Badge */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-800/85 dark:bg-slate-900/90 text-emerald-300 backdrop-blur-xs shadow-xs border border-slate-700">
          <Box className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
          Bambu Lab P1S Bed (256 × 256 mm)
        </span>
      </div>

      {/* Dimensions Overlay on Bottom-Left */}
      {dimensions && (
        <div className="absolute bottom-4 left-4 z-10 bg-white/95 dark:bg-slate-850/95 backdrop-blur-xs border border-slate-300 dark:border-slate-700 rounded-xl p-3 shadow-md text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-1.5 border-b border-slate-200 dark:border-slate-700 pb-1">
            <Maximize2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            Dimensi Bounding Box Fisik
          </div>
          <div className="grid grid-cols-3 gap-2 font-mono-tech">
            <div className="bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Panjang (X)</span>
              <span className="font-semibold text-slate-900 dark:text-white">{dimensions.x} mm</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Lebar (Y)</span>
              <span className="font-semibold text-slate-900 dark:text-white">{dimensions.y} mm</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Tinggi (Z)</span>
              <span className="font-semibold text-slate-900 dark:text-white">{dimensions.z} mm</span>
            </div>
          </div>
        </div>
      )}

      {/* Instructions on Bottom-Right */}
      <div className="absolute bottom-4 right-4 z-10 pointer-events-none hidden sm:block">
        <span className="text-[11px] text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
          Klik kiri & geser: Putar | Scroll: Zoom | Klik kanan: Geser
        </span>
      </div>
    </div>
  );
};
