// ========================================
// Stage 2: Trinity
// ========================================

import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const TextCharacterInBox = ({ char, index, totalChars, isActive, parentPos }) => {
  const groupRef = useRef();
  const textMeshRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      const angle = (index / totalChars) * Math.PI * 2;
      const radius = 0.65 + Math.sin(state.clock.elapsedTime * 2.5 + index) * 0.2;

      groupRef.current.position.x = parentPos[0] + Math.cos(angle) * radius;
      groupRef.current.position.y = parentPos[1] + Math.sin(angle) * radius;
      groupRef.current.position.z = parentPos[2] + Math.sin(state.clock.elapsedTime * 2 + index * 0.5) * 0.35;

      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.2 + angle) * 0.3;
      groupRef.current.rotation.y = state.clock.elapsedTime * 1.2 + angle;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.8 + index) * 0.2;
    }

    if (textMeshRef.current && isActive) {
      textMeshRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      textMeshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  const createCharacterTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext("2d");

    // پس زمینه شفاف
    context.clearRect(0, 0, 256, 256);

    // حرف روشن و درخشان
    context.fillStyle = "#00F5D4";
    context.font = "bold 200px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(char, 128, 128);

    // سایه‌ی درخشان
    context.strokeStyle = "rgba(0, 245, 212, 0.6)";
    context.lineWidth = 3;
    context.strokeText(char, 128, 128);

    return new THREE.CanvasTexture(canvas);
  };

  return (
    <group ref={groupRef}>
      {/* حرف درخشان */}
      <mesh ref={textMeshRef} position={[0, 0, 0]}>
        <planeGeometry args={[0.25, 0.25]} />
        <meshBasicMaterial map={createCharacterTexture()} transparent={true} toneMapped={false} />
      </mesh>

      {/* هاله درخشان اطراف حرف */}
      {isActive && (
        <mesh position={[0, 0, -0.02]}>
          <circleGeometry args={[0.15, 32]} />
          <meshBasicMaterial color="#00F5D4" transparent opacity={0.25} />
        </mesh>
      )}

      {/* ذرات درخشان اطراف */}
      {isActive && (
        <points position={[0, 0, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={12}
              array={
                new Float32Array(
                  Array.from({ length: 36 }, (_, i) => {
                    const angle = (i / 12) * Math.PI * 2;
                    const r = 0.15 + Math.random() * 0.08;
                    return i % 3 === 0
                      ? Math.cos(angle) * r
                      : i % 3 === 1
                      ? Math.sin(angle) * r
                      : (Math.random() - 0.5) * 0.1;
                  })
                )
              }
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.04} color="#00F5D4" sizeAttenuation transparent opacity={0.9} />
        </points>
      )}
    </group>
  );
};

const ShapeNodeWithText = ({ type, isActive, position, onClick, relatedChars }) => {
  const meshRef = useRef();
  const outerRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;

      if (isActive) {
        meshRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
        meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
        meshRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
      } else {
        meshRef.current.scale.x = 1;
        meshRef.current.scale.y = 1;
        meshRef.current.scale.z = 1;
      }
    }

    if (outerRef.current && isActive) {
      outerRef.current.rotation.x -= 0.008;
      outerRef.current.rotation.y -= 0.012;
    }
  });

  const geometries = {
    cube: () => <boxGeometry args={[1.2, 1.2, 1.2]} />,
    pyramid: () => <coneGeometry args={[1, 1.8, 4]} />,
    sphere: () => <sphereGeometry args={[0.9, 32, 32]} />,
  };

  return (
    <group>
      {/* مکعب اصلی */}
      <mesh
        ref={meshRef}
        position={position}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {geometries[type]()}
        <meshStandardMaterial
          color={isActive || isHovered ? "#00F5D4" : "#d4d4c8"}
          wireframe={isActive}
          emissive={isActive || isHovered ? "#00F5D4" : "#000000"}
          emissiveIntensity={isActive ? 0.8 : isHovered ? 0.4 : 0}
          toneMapped={false}
          metalness={isActive ? 0.6 : 0.3}
          roughness={isActive ? 0.2 : 0.4}
        />
      </mesh>

      {/* لایهٔ بیرونی wireframe */}
      {isActive && (
        <mesh ref={outerRef} position={position} scale={1.35}>
          {geometries[type]()}
          <meshStandardMaterial
            emissive="#00F5D4"
            emissiveIntensity={0.25}
            transparent
            opacity={0.2}
            wireframe={true}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* حروف و شکل‌های شناور */}
      {isActive &&
        relatedChars &&
        relatedChars.map((char, i) => (
          <TextCharacterInBox
            key={i}
            char={char}
            index={i}
            totalChars={relatedChars.length}
            isActive={isActive}
            parentPos={position}
          />
        ))}
    </group>
  );
};

const TrinityStage = ({ onComplete }) => {
  const [activeShape, setActiveShape] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedInfo, setSelectedInfo] = useState(null);

  useEffect(() => {
    const handleScroll = (e) => {
      setScrollProgress((prev) => {
        const newProgress = Math.min(prev + e.deltaY * 0.0005, 1);
        if (newProgress === 1) {
          setTimeout(() => onComplete(), 1200);
        }
        return newProgress;
      });
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [onComplete]);

  const shapes = [
    {
      type: "cube",
      name: "متن: از ابژه به رخداد",
      label: "متن",
      chars: ["ت", "ع", "م", "ن", "ر", "خ", "د", "ا", "د", "ت", "ع", "م", "ن", "ر", "خ", "د", "ا", "د"],
      oldDesc:
        "یک ساختار ایستا و ثابت، یک نتیجهٔ تمام‌شده که معنای آن ثابت و غیرمتغیر است. صفحه چاپی = نسخه ثابت.",
      newDesc:
        "یک رخداد پویا که در لحظۀ تعامل ماشین و انسان متولد می‌شود. متن در لحظه ایجاد می‌شود و موجودیتی زنده می‌یابد و هرلحظه ممکن است از دست برود.",
      details:
        "متن دیجیتال یک موجودیت سیال است، نه جوهری بر کاغذ. این متن رفتاری پویا دارد و به شرایط و منطق حاکم پاسخ می‌دهد.",
      pos: [-3.5, 0, 0],
    },
    {
      type: "pyramid",
      name: "نویسنده: از خالق به معمار",
      label: "مؤلف",
      chars: ["م", "ع", "م", "ا", "ر", "ا", "ل", "گ", "و", "م", "ع", "م", "ا", "ر", "ا", "ل", "گ", "و"],
      oldDesc: "قادر مطلق و تجلی خودپندارۀ استعلایی",
      newDesc: "معمار فضاهای ممکن، طراح الگوریتم‌ها و قواعد. برنامه‌نویسنده.",
      details:
        "برنامه‌نویسندگی در ادبیات الکترونیک یعنی تلفیق آموزه‌های نوشتن در ادبیات مکتوب و آموزه‌های برنامه‌نویسی کامپیوتری",
      pos: [0, 0, 0],
    },
    {
      type: "sphere",
      name: "خواننده: از مفسر به ناوبر",
      label: "خواننده",
      chars: ["خ", "و", "ا", "ن", "ن", "د", "ه", "ن", "ا", "خ", "و", "ا", "ن", "ن", "د", "ه", "ن", "ا"],
      oldDesc:
        "تماشاگری منفعل که معنا را سطر به سطر و در مسیری خطی دنبال می‌کند و تعاملی از لحاظ پیمایش با متن ندارد",
      newDesc: "کنشگری فعال که با مسیر روایی تعامل می‌کند. هر کلیک، هر حرکت، یک انتخاب روایی است.",
      details: "خواننده تبدیل به هم‌آفرینندۀ اثر می‌شود",
      pos: [3.5, 0, 0],
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
      dir="rtl"
    >
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@master/Vazirmatn-Regular.woff2');
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@master/Vazirmatn-Bold.woff2');
        * { font-family: 'Vazirmatn', sans-serif !important; }
      `}</style>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[8, 8, 8]} intensity={1.2} color="#00F5D4" />
        <pointLight position={[-8, -8, 5]} intensity={0.6} color="#8B0000" />

        {shapes.map((shape, i) => (
          <ShapeNodeWithText
            key={i}
            type={shape.type}
            isActive={activeShape === i}
            position={shape.pos}
            onClick={() => setActiveShape(activeShape === i ? null : i)}
            relatedChars={shape.chars}
          />
        ))}

        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      {selectedInfo !== null && (
        <>
          <div className="mb-6">
            <div className="text-cyan-400 text-xs font-bold tracking-widest mb-2">
              {shapes[selectedInfo].name}
            </div>
            <h3 className="text-2xl text-white mb-6">{shapes[selectedInfo].name}</h3>
          </div>
          <div className="absolute bottom-20 z-50 left-1/2 -translate-x-1/2 p-8 bg-black/10 border-2 border-cyan-400 max-w-2xl rounded-lg backdrop-blur">
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <div className="text-gray-400 text-xs mb-2 font-bold">ادبیات مکتوب</div>
                <p className="text-gray-300 text-sm leading-relaxed">{shapes[selectedInfo].oldDesc}</p>
              </div>
              <div>
                <div className="text-cyan-400 text-xs mb-2 font-bold">کُدَبیات</div>
                <p className="text-cyan-200 text-sm leading-relaxed">{shapes[selectedInfo].newDesc}</p>
              </div>
            </div>

            <div className="mb-4 p-4 bg-cyan-400/10 border-r-2 border-cyan-400">
              <p className="text-cyan-300 text-sm leading-relaxed">{shapes[selectedInfo].details}</p>
            </div>

            <div className="mb-6 p-4 bg-gray-900/50 border border-gray-700 rounded">
              <p className="text-gray-400 text-xs mb-3 font-bold">🔍 توضیح تعاملی:</p>
              <p className="text-gray-300 text-xs leading-relaxed">
                {selectedInfo === 0 &&
                  "روی مکعب کلیک کنید تا حروف درون آن شناور شوند. چنین متنی را چگونه می‌توان چاپ کرد؟"}
                {selectedInfo === 1 &&
                  "حروف در شکل بر پایۀ احتمالاتی که نویسنده در بنلادمتن پی‌رریزی کرده جابه‌جا می‌شوند"}
                {selectedInfo === 2 &&
                  "مخاطب با کلیک روی مکعب‌ها، باعث نمایش حروف می‌شود. انتخاب یا عدم انتخاب او، کیفیات حیات متن را شکل می‌دهد"}
              </p>
            </div>

            <div className="mb-6 p-3 bg-amber-900/20 border-r-2 border-amber-600">
              <p className="text-amber-100 text-xs">
                💡 حروف‌های شناور را ببینید؟ آن‌ها درون فضایی محاسباتی محبوس‌اند، اما ثابت نیستند. مانند معنا
                در کُدبیات — زنده، مهندسی‌شده و متغیر.
              </p>
            </div>

            <button
              onClick={() => setSelectedInfo(null)}
              className="text-gray-500 hover:text-cyan-400 text-sm transition-colors"
            >
              بستن [ESC]
            </button>
          </div>
        </>
      )}

      <div className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-4">
        {shapes.map((shape, i) => (
          <button
            key={i}
            onClick={() => setSelectedInfo(selectedInfo === i ? null : i)}
            className="px-6 py-3 border border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all text-sm font-bold text-cyan-400"
          >
            {shape.name}
          </button>
        ))}
      </div>

      {scrollProgress < 0.9 && (
        <div className="absolute top-8 right-8 text-gray-500 text-xs font-bold animate-pulse">
          [{Math.round(scrollProgress * 100)}%] اسکرول کنید برای ادامه
        </div>
      )}
    </div>
  );
};

export default TrinityStage;
