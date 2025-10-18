import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Text } from "@react-three/drei";
import { RigidBody, Physics, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";

const ShapeCrate = ({
  crateId,
  label = "لوگو",
  position = [0, 0, 0],
  color = "#0ff5d4",
  size = [2.4, 2.4, 2.4],
  initialPush = [0, 0, 0],
}) => {
  const bodyRef = useRef();
  const [isHovered, setHovered] = useState(false);

  // تقسیم متن فارسی به "قطعات" — هر حرف یک ریجیدبادی مستقل
  const letters = useMemo(() => {
    // حذف فاصله‌ها؛ اما می‌تونی نگه داری
    // اگر می‌خواهی قطعه‌ها بزرگ‌تر/کوچک‌تر باشند، scaleLetter رو تغییر بده
    return Array.from(label);
  }, [label]);

  // on mount: یک ضربهٔ تصادفی به crate برای نمایشی بودن
  useEffect(() => {
    if (!bodyRef.current) return;
    // delay اندک تا فیزیک آماده شود
    const t = setTimeout(() => {
      // push a small random impulse
      bodyRef.current.applyImpulse({
        x: initialPush[0] + (Math.random() - 0.5) * 0.8,
        y: initialPush[1] + (Math.random() - 0.5) * 0.6,
        z: initialPush[2] + (Math.random() - 0.5) * 0.8,
      });
      bodyRef.current.applyTorqueImpulse({
        x: (Math.random() - 0.5) * 0.6,
        y: (Math.random() - 0.5) * 0.6,
        z: (Math.random() - 0.5) * 0.6,
      });
    }, 120);
    return () => clearTimeout(t);
  }, [initialPush]);

  // subtle floating/rotation for visuals when hovered/active
  useFrame((state) => {
    if (!bodyRef.current) return;
    const t = state.clock.elapsedTime;
    // small visual rotation applied by kinematic move if hovered
    if (isHovered) {
      // rotate a tiny bit for visual emphasis
      const q = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(Math.sin(t) * 0.05, Math.cos(t) * 0.03, Math.sin(t * 0.5) * 0.04)
      );
      bodyRef.current.setRotation(q, true);
    }
  });

  // internal walls: 6 thin cuboid colliders attached to same rigidbody so that
  // they move with the crate. We build them as "children" colliders.
  const [sx, sy, sz] = size;
  const wallThickness = 0.08;
  // inner half-sizes for colliders (Rapier cuboid takes half-extents)
  const hx = sx / 2;
  const hy = sy / 2;
  const hz = sz / 2;

  return (
    <RigidBody
      ref={bodyRef}
      colliders={false} // we'll add custom cuboid colliders (outer shape)
      position={position}
      mass={3}
      linearDamping={0.12}
      angularDamping={0.18}
      restitution={0.5} // bounce of the crate itself
      friction={0.6}
    >
      {/* visual cube (wireframe+glass) */}
      <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <boxGeometry args={[sx, sy, sz]} />
        {/* semi-transparent glass-like */}
        <meshPhysicalMaterial
          transmission={0.8}
          thickness={0.5}
          metalness={0.1}
          roughness={0.15}
          clearcoat={0.3}
          opacity={1}
          transparent
          reflectivity={0.6}
          emissive={isHovered ? color : "#001010"}
          emissiveIntensity={isHovered ? 0.25 : 0.05}
          color={"#0b0f12"}
        />
      </mesh>

      {/* internal colliders: 6 walls. each collider is a thin cuboid placed exactly at the inner faces.
          Important: colliders are attached to the same rigidbody so they move/rotate with the crate.
          We use negative offsets toward center. Rapier CuboidCollider args: size half-extents */}
      {/* +X wall (right) */}
      <CuboidCollider
        args={[wallThickness / 2, hy - wallThickness, hz - wallThickness]}
        translation={[hx - wallThickness / 2, 0, 0]}
        restitution={0.85}
        friction={0.2}
      />
      {/* -X wall (left) */}
      <CuboidCollider
        args={[wallThickness / 2, hy - wallThickness, hz - wallThickness]}
        translation={[-hx + wallThickness / 2, 0, 0]}
        restitution={0.85}
        friction={0.2}
      />
      {/* +Y wall (top) */}
      <CuboidCollider
        args={[hx - wallThickness, wallThickness / 2, hz - wallThickness]}
        translation={[0, hy - wallThickness / 2, 0]}
        restitution={0.85}
        friction={0.2}
      />
      {/* -Y wall (bottom) */}
      <CuboidCollider
        args={[hx - wallThickness, wallThickness / 2, hz - wallThickness]}
        translation={[0, -hy + wallThickness / 2, 0]}
        restitution={0.85}
        friction={0.6} // floor should have a touch more friction
      />
      {/* +Z wall (front) */}
      <CuboidCollider
        args={[hx - wallThickness, hy - wallThickness, wallThickness / 2]}
        translation={[0, 0, hz - wallThickness / 2]}
        restitution={0.85}
        friction={0.2}
      />
      {/* -Z wall (back) */}
      <CuboidCollider
        args={[hx - wallThickness, hy - wallThickness, wallThickness / 2]}
        translation={[0, 0, -hz + wallThickness / 2]}
        restitution={0.85}
        friction={0.2}
      />

      {/* --- Letters inside: each is a dynamic RigidBody so it collides with walls and other letters --- */}
      {letters.map((ltr, idx) => {
        // randomize initial position inside the inner volume
        const pad = 0.3; // margin from walls
        const px = (Math.random() - 0.5) * (sx - pad * 2);
        const py = (Math.random() - 0.5) * (sy - pad * 2);
        const pz = (Math.random() - 0.5) * (sz - pad * 2);
        const scaleLetter = 0.45; // adjust letter size

        return (
          <RigidBody
            key={idx}
            type="dynamic"
            colliders={false}
            position={[px, py, pz]}
            mass={0.12}
            linearDamping={0.12}
            angularDamping={0.12}
            restitution={0.75} // letters should be bouncy
            friction={0.25}
          >
            {/* each letter gets a small bounding box collider */}
            <CuboidCollider args={[0.12 * scaleLetter, 0.18 * scaleLetter, 0.04]} />
            {/* 3D text (troika via drei Text) */}
            <Text
              font="/fonts/IRANSansX-Medium.woff" // توصیه: یک فونت فارسی وب‌قابل‌دسترس قرار بده
              scale={scaleLetter}
              anchorX="center"
              anchorY="middle"
              maxWidth={1}
              depthOffset={-0.01}
              // material props
              toneMapped={false}
              // slight bevel/weight look (troika supports)
              // color and emissive for لوکس بودن
              color={color}
              position={[0, 0, 0]}
            >
              {ltr}
              <meshStandardMaterial
                emissive={color}
                emissiveIntensity={0.5}
                metalness={0.2}
                roughness={0.15}
              />
            </Text>
          </RigidBody>
        );
      })}
    </RigidBody>
  );
};

const TrinityPhysicsStage = ({ onComplete = () => {} }) => {
  // shapes config
  const shapes = [
    {
      type: "cube",
      label: "متن",
      pos: [-4.5, 0, 0],
      color: "#00F5D4",
      size: [2.6, 2.6, 2.6],
      push: [-0.8, 0.1, 0],
    },
    {
      type: "pyramid",
      label: "مؤلف",
      pos: [0, 0, 0],
      color: "#68D9FF",
      size: [2.6, 2.6, 2.6],
      push: [0.2, 0.6, 0.1],
    },
    {
      type: "sphere",
      label: "خواننده",
      pos: [4.5, 0, 0],
      color: "#A78BFA",
      size: [2.6, 2.6, 2.6],
      push: [0.9, -0.15, 0],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black text-white">
      <Canvas shadows camera={{ position: [0, 0, 14], fov: 50 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 14]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-8, -8, -6]} intensity={0.4} color="#8B0000" />

        {/* Physics world */}
        <Physics gravity={[0, -9.81, 0]} allowSleep={true}>
          {/* ground plane far below so errant objects don't fall forever */}
          <RigidBody type="fixed" colliders={false} position={[0, -30, 0]}>
            <mesh>
              <boxGeometry args={[200, 1, 200]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <CuboidCollider args={[100, 0.5, 100]} />
          </RigidBody>

          {/* Spawn 3 crates */}
          {shapes.map((s, i) => (
            <ShapeCrate
              key={i}
              crateId={i}
              label={s.label}
              position={s.pos}
              color={s.color}
              size={s.size}
              initialPush={s.push}
            />
          ))}

          {/* optional invisible boundaries of the entire scene to keep crates in view */}
          <RigidBody type="fixed" colliders={false}>
            <CuboidCollider args={[40, 1, 40]} translation={[0, -12, 0]} />
            <CuboidCollider args={[40, 1, 40]} translation={[0, 12, 0]} />
            <CuboidCollider args={[1, 40, 40]} translation={[-18, 0, 0]} />
            <CuboidCollider args={[1, 40, 40]} translation={[18, 0, 0]} />
            <CuboidCollider args={[40, 40, 1]} translation={[0, 0, -18]} />
            <CuboidCollider args={[40, 40, 1]} translation={[0, 0, 18]} />
          </RigidBody>
        </Physics>

        <OrbitControls enablePan={true} enableZoom={true} autoRotate={false} maxPolarAngle={Math.PI / 2} />
      </Canvas>

      {/* simple UI */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-sm font-mono text-cyan-300/80 bg-black/60 px-4 py-2 rounded">
        Trinity — حرکت دهید یا کلیک کنید بر روی مکعب‌ها — حروف محبوس با فیزیک واقعی رفتار می‌کنند.
      </div>
    </div>
  );
};

export default TrinityPhysicsStage;
