import { useState, useEffect, useRef } from "react";

import * as THREE from "three";

const CrisisStage = ({ onComplete }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Objects for each section
  const objectsRef = useRef({
    particles: [],
    papers: [],
    pixels: [],
    textMeshes: [],
  });

  const sections = [
    { id: 0, name: "ابرانگاره", color: 0xf59e0b },
    { id: 1, name: "کاغذ", color: 0xd4a574 },
    { id: 2, name: "گذار", color: 0xef4444 },
    { id: 3, name: "رخداد", color: 0x06b6d4 },
    { id: 4, name: "هدف", color: 0x9333ea },
    { id: 5, name: "کدبیات", color: 0xef4444 },
    { id: 6, name: "چارچوب", color: 0x06b6d4 },
  ];

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.002);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    // Create particle field (background)
    createParticleField(scene);

    // Create initial section objects
    createSectionObjects(scene, 0);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate particles
      objectsRef.current.particles.forEach((p) => {
        p.rotation.x += 0.001;
        p.rotation.y += 0.001;
      });

      // Animate based on current section
      animateSection(currentSection);

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Create particle field
  const createParticleField = (scene) => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 2000; i++) {
      vertices.push((Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.3,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    objectsRef.current.particles.push(particles);
  };

  // Create objects for each section
  const createSectionObjects = (scene, sectionId) => {
    // Clear previous objects
    objectsRef.current.papers.forEach((obj) => scene.remove(obj));
    objectsRef.current.pixels.forEach((obj) => scene.remove(obj));
    objectsRef.current.papers = [];
    objectsRef.current.pixels = [];

    switch (sectionId) {
      case 0: // ابرانگاره - Books floating
        createFloatingBooks(scene);
        break;
      case 1: // کاغذ - Paper sheets
        createPaperSheets(scene);
        break;
      case 2: // گذار - Transformation
        createTransformation(scene);
        break;
      case 3: // رخداد - Event particles
        createEventParticles(scene);
        break;
      case 4: // هدف - Target geometry
        createTargetGeometry(scene);
        break;
      case 5: // کدبیات - Framework structure
        createTransformation(scene);
        break;
      case 6: // چارچوب - Framework structure
        createFrameworkStructure(scene);
        break;
    }
  };

  // Section 0: Floating books
  const createFloatingBooks = (scene) => {
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.BoxGeometry(3, 4, 0.5);
      const material = new THREE.MeshPhongMaterial({
        color: 0xf59e0b,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.2,
      });
      const book = new THREE.Mesh(geometry, material);

      book.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10);

      scene.add(book);
      objectsRef.current.papers.push(book);
    }
  };

  // Section 1: Paper sheets
  const createPaperSheets = (scene) => {
    for (let i = 0; i < 10; i++) {
      const geometry = new THREE.PlaneGeometry(5, 7);
      const material = new THREE.MeshPhongMaterial({
        color: 0xf5f5dc,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const paper = new THREE.Mesh(geometry, material);

      paper.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20);
      paper.rotation.x = Math.random() * Math.PI;
      paper.rotation.y = Math.random() * Math.PI;

      scene.add(paper);
      objectsRef.current.papers.push(paper);
    }
  };

  // Section 2: Transformation (papers breaking into pixels)
  const createTransformation = (scene) => {
    // Papers on left
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.PlaneGeometry(3, 4);
      const material = new THREE.MeshPhongMaterial({
        color: 0xf5f5dc,
        side: THREE.DoubleSide,
      });
      const paper = new THREE.Mesh(geometry, material);
      paper.position.set(-20 + i * 2, (Math.random() - 0.5) * 10, 0);
      scene.add(paper);
      objectsRef.current.papers.push(paper);
    }

    // Pixels on right
    for (let i = 0; i < 100; i++) {
      const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const material = new THREE.MeshPhongMaterial({
        color: 0x06b6d4,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.5,
      });
      const pixel = new THREE.Mesh(geometry, material);
      pixel.position.set(
        10 + (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      );
      scene.add(pixel);
      objectsRef.current.pixels.push(pixel);
    }
  };

  // Section 3: Event particles
  const createEventParticles = (scene) => {
    const geometry = new THREE.SphereGeometry(0.3, 8, 8);

    for (let i = 0; i < 200; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: Math.random() > 0.5 ? 0x06b6d4 : 0xf59e0b,
        emissive: Math.random() > 0.5 ? 0x06b6d4 : 0xf59e0b,
        emissiveIntensity: 0.5,
      });
      const particle = new THREE.Mesh(geometry, material);

      particle.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30
      );

      scene.add(particle);
      objectsRef.current.pixels.push(particle);
    }
  };

  // Section 4: Target geometry
  const createTargetGeometry = (scene) => {
    const ringGeometry = new THREE.TorusGeometry(10, 0.5, 16, 100);

    for (let i = 0; i < 3; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: 0x9333ea,
        emissive: 0x9333ea,
        emissiveIntensity: 0.3,
      });
      const ring = new THREE.Mesh(ringGeometry, material);
      ring.scale.set(1 - i * 0.3, 1 - i * 0.3, 1);
      ring.position.z = -i * 2;
      scene.add(ring);
      objectsRef.current.papers.push(ring);
    }
  };

  // Section 5: Framework structure
  const createFrameworkStructure = (scene) => {
    // Create a grid structure
    const material = new THREE.LineBasicMaterial({ color: 0x3d3d3d });

    for (let i = -20; i <= 20; i += 5) {
      const points = [new THREE.Vector3(-20, i, 0), new THREE.Vector3(30, i, 10)];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      objectsRef.current.papers.push(line);
    }

    for (let i = -20; i <= 20; i += 5) {
      const points = [new THREE.Vector3(i, -20, 0), new THREE.Vector3(i, 10, 0)];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      objectsRef.current.papers.push(line);
    }

    // Add nodes at intersections
    for (let x = -20; x <= 20; x += 5) {
      for (let y = -20; y <= 20; y += 5) {
        const geometry = new THREE.SphereGeometry(0.5, 8, 8);
        const nodeMaterial = new THREE.MeshPhongMaterial({
          color: 0x06b6d4,
          emissive: 0x06b6d4,
          emissiveIntensity: 0.5,
        });
        const node = new THREE.Mesh(geometry, nodeMaterial);
        node.position.set(x, y, 0);
        scene.add(node);
        objectsRef.current.pixels.push(node);
      }
    }
  };

  // Animate based on section
  const animateSection = (sectionId) => {
    const time = Date.now() * 0.001;

    switch (sectionId) {
      case 0: // Floating books
        objectsRef.current.papers.forEach((book, i) => {
          book.rotation.y = time + i;
          book.position.y += Math.sin(time + i) * 0.02;
        });
        break;

      case 1: // Paper sheets
        objectsRef.current.papers.forEach((paper, i) => {
          paper.rotation.x = time * 0.5 + i;
          paper.rotation.y = time * 0.3 + i;
        });
        break;

      case 2: // Transformation
        objectsRef.current.papers.forEach((paper, i) => {
          paper.scale.x = 1 + Math.sin(time + i) * 0.1;
          paper.material.opacity = 0.5 + Math.sin(time + i) * 0.5;
        });
        objectsRef.current.pixels.forEach((pixel, i) => {
          pixel.position.x += Math.sin(time + i) * 0.05;
          pixel.position.y += Math.cos(time + i) * 0.05;
          pixel.rotation.x += 0.02;
          pixel.rotation.y += 0.02;
        });
        break;

      case 3: // Event particles
        objectsRef.current.pixels.forEach((particle, i) => {
          particle.position.x += Math.sin(time * 2 + i) * 0.1;
          particle.position.y += Math.cos(time * 2 + i) * 0.1;
          particle.scale.setScalar(0.5 + Math.sin(time * 3 + i) * 0.5);
        });
        break;

      case 4: // Target
        objectsRef.current.papers.forEach((ring, i) => {
          ring.rotation.z = time + i * 0.5;
        });
        break;

      case 5: // Framework
        objectsRef.current.pixels.forEach((node, i) => {
          node.scale.setScalar(0.5 + Math.sin(time * 2 + i * 0.1) * 0.5);
        });
        break;
    }
  };

  // Handle section change
  useEffect(() => {
    if (!sceneRef.current) return;

    setIsTransitioning(true);

    // Fade out current objects
    const fadeOut = () => {
      [...objectsRef.current.papers, ...objectsRef.current.pixels].forEach((obj) => {
        if (obj.material) {
          obj.material.transparent = true;
          obj.material.opacity = Math.max(0, obj.material.opacity - 0.05);
        }
      });
    };

    const fadeInterval = setInterval(fadeOut, 16);

    setTimeout(() => {
      clearInterval(fadeInterval);
      createSectionObjects(sceneRef.current, currentSection);
      setIsTransitioning(false);
    }, 500);
  }, [currentSection]);

  // Handle scroll
  useEffect(() => {
    const handleWheel = (e) => {
      if (isTransitioning) return;

      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        setCurrentSection((prev) => prev + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection((prev) => prev - 1);
      } else if (e.deltaY > 0 && currentSection === sections.length - 1) {
        setTimeout(() => onComplete(), 500);
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentSection, isTransitioning, onComplete]);

  // Content for each section
  const getContent = () => {
    const contents = [
      {
        title: "ابرانگارهٔ مسلط",
        desc: "برای قرن‌ها، پژوهش‌های ادبی بر شالودۀ یک ابرانگارۀ مسلط استوار بوده است",
        formula: "متن = ابژهٔ ثابت",
        items: [""],
        shake: false,
      },
      {
        title: "سکوی کاغذ",
        desc: "ما آموخته‌ایم که با امر ادبی همچون یک ساختار پایدار، کامل و خودبسنده مواجه شویم ",
        formula: "کاغذ ← ثبات",
        items: ["مادیت ایستا", "چاپی", "پایدار"],
        shake: false,
      },
      {
        title: "فقر ابزارهای مفهومی",
        desc: "دیگر نمی‌توان با همان ابزارهای پیشین به سراغ متونی رفت که هستی‌شناسی آن‌ها اساساً زیروزبر شده است",
        formula: "پیکسل ↔ کاغذ",
        items: ["مادیت ایستا ← مادیت پویا", "ثابت ← سیال", "اثر ← رخداد"],
        shake: true,
      },
      {
        title: "اثر ← رخداد",
        desc: "رویدادی که در لحظه از تعامل ماشین و انسان ظهور می‌کند",
        formula: "بودن ← شَوَند",
        items: ["معنا در لحظه", "پویا و متغیر", "وابسته به تعامل"],
        shake: true,
      },
      {
        title: "سؤالات تحقیق",
        desc: "هدف اصلی این پژوهش صورت‌بندی یک چارچوب تحلیلی منسجم از زیست‌بوم نوظهور ادبیات الکترونیک در زبان فارسی است",
        formula: `تغییر سکو از کاغذ به پیکسل، دقیقاً چه دگرگونی‌هایی در مفاهیم بنیادین «مؤلف»، «متن» و «خواننده» ایجاد می‌کند؟
        
         با توجه به ماهیت سیال و بینارشته‌ای این حوزه، چگونه می‌توان به یک تعریف کارآمد و یک طبقه‌بندی معنادار از گونه‌های مختلف ادبیات الکترونیک دست یافت؟
        
         تجربه‌های بومی در زبان فارسی را با چه ابزارهایی می‌توان به صورت عمیق و انتقادی واکاوی کرد؟`,
        items: ["دگرگونی مفاهیم", "تعریف و طبقه‌بندی", "تجربه‌های بومی"],
        shake: false,
      },
      {
        title: " کدبیات",
        desc: "چرا این رساله از کدبیات به جای ادبیات الکترونیک استفاده می‌کند؟",
        formula: "دلایل",
        items: [
          "کژتابی اصطلاح ادبیات الکترونیک",
          "تلاش برای واژه‌سازی یک مفهوم، تلاش برای روشن‌سازی فهم ",
          "تخصیص زمینۀ پیدایی (کُد) در واژۀ پیشنهادی ",
          "آشنایی‌زدایی صوری از واژۀ ادبیات، به قصد آشنایی‌زدایی از مفهوم ادبیات به معنای مصطلح",
          "کمک به جداسازی رستۀ ادبیات الکترونیک از ادبیات مکتوب",
          "عینیت‌بخشی به ماهیت بینارشته‌ای آن با ساخت آمیزشی واژگان",
        ],
        shake: false,
      },
      {
        title: "دستاوردها",
        desc: "عمده‌‌دست‌آوردهای این رساله عبارت‌اند از",
        formula: "⸎",
        items: [
          "ساخت چارچوب مفهومی بدیع از ادبیات الکترونیک بر پایۀ بازخوانی تلفیقی آراء کاترین هیلز",
          "ساخت جعبه‌ابزاری تحلیلی منبعث از چارچوب مفهومی و بر پایۀ نظریۀ ادبیات سخت‌پیمای اسپن آرست",
          "سازمان‌دهی شگردهای بیانی کدبیات در پنج دسته",
          "ارائۀ طبقه‌بندی نوین گونه‌ها بر اساس استعارۀ کارکردی متن (رویکردی درون‌رشته‌ای)",
          "واکاوی نظام‌مند اثار کدبی فارسی بر اساس چارچوب مفهومی و ابزار تحلیلی برآمده از رساله",
        ],
        shake: false,
      },
    ];

    return contents[currentSection];
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 bg-black" dir="rtl">
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@master/Vazirmatn-font-face.css');
        * { font-family: 'Vazirmatn', sans-serif !important; }
        
        @keyframes glitchAnim {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(2px, 2px); }
          100% { transform: translate(0); }
        }
        
        .glitch {
          animation: glitchAnim 0.3s infinite;
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>

      {/* Three.js Canvas */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Content Overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="max-w-4xl w-full px-8 text-center">
          <h1
            className="text-6xl md:text-8xl font-bold mb-6 fade-in"
            style={{
              color: `#${sections[currentSection].color.toString(16)}`,
              textShadow: `0 0 30px #${sections[currentSection].color.toString(16)}`,
              animationDelay: "0.1s",
              opacity: 0,
            }}
          >
            {content.title}
          </h1>

          <p
            className="text-2xl md:text-3xl text-gray-300 mb-8 fade-in"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            {content.desc}
          </p>

          <div
            className="inline-block px-8 py-4 rounded-2xl mb-12 fade-in"
            style={{
              background: `rgba(${parseInt(sections[currentSection].color.toString(16).slice(0, 2), 16)}, ${parseInt(sections[currentSection].color.toString(16).slice(2, 4), 16)}, ${parseInt(sections[currentSection].color.toString(16).slice(4, 6), 16)}, 0.2)`,
              border: `2px solid #${sections[currentSection].color.toString(16)}`,
              animationDelay: "0.5s",
              opacity: 0,
            }}
          >
            <div
              className={`text-4xl font-bold text-white text-justify ${content.shake && "glitch"} rtl ${content.title === "سؤالات تحقیق" && " text-xl"}`}
              style={{ whiteSpace: "pre-line" }}
            >
              {content.formula}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {content.items.map((item, i) => (
              <div
                key={i}
                className="px-6 py-3 rounded-xl backdrop-blur-sm fade-in "
                style={{
                  background: "rgba(0, 0, 0, 0.5)",
                  border: `1px solid #${sections[currentSection].color.toString(16)}40`,
                  animationDelay: `${0.7 + i * 0.1}s`,
                  opacity: 0,
                }}
              >
                <div className="text-lg text-gray-300">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 space-y-3 pointer-events-auto">
        {sections.map((section, i) => (
          <button
            key={section.id}
            onClick={() => setCurrentSection(i)}
            className="block w-3 h-3 rounded-full transition-all duration-300"
            style={{
              background: currentSection === i ? `#${section.color.toString(16)}` : "#ffffff40",
              boxShadow: currentSection === i ? `0 0 20px #${section.color.toString(16)}` : "none",
              transform: currentSection === i ? "scale(1.5)" : "scale(1)",
            }}
            title={section.name}
          />
        ))}
      </div>

      {/* Progress */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <div
          className="flex items-center gap-4 px-6 py-3 rounded-full backdrop-blur-sm"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="text-cyan-400 font-bold">
            {currentSection + 1} / {sections.length}
          </div>
          <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${((currentSection + 1) / sections.length) * 100}%`,
                background: `linear-gradient(90deg, #f59e0b, #06b6d4, #9333ea)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Hint */}
      {currentSection < sections.length - 1 && (
        <div className="fixed bottom-8 left-8 text-gray-500 text-sm animate-pulse">اسکرول برای ادامه ↓</div>
      )}

      {currentSection === sections.length - 1 && (
        <div className="fixed bottom-20 left-1/10 -translate-x-1/2 text-center pointer-events-none">
          <div className="text-cyan-400 text-xl font-bold animate-pulse">✓</div>
        </div>
      )}
    </div>
  );
};

export default CrisisStage;
