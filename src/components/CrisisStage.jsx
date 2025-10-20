// ========================================
// Stage 1: Crisis
// ========================================

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

const CrisisStage = ({ onComplete }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentSectionRef = useRef(0);

  const objectsRef = useRef({
    particles: [],
    papers: [],
    pixels: [],
    binaryStars: [],
  });

  const sections = [
    { id: 0, name: "ابرانگاره", color: 0xf59e0b },
    { id: 1, name: "سه بدن", color: 0xd4a574 },
    { id: 2, name: "گذار", color: 0xef4444 },
    { id: 3, name: "رخداد", color: 0x06b6d4 },
    { id: 4, name: "هدف", color: 0x9333ea },
    { id: 5, name: "تلفیق", color: 0xef4444 },
    { id: 6, name: "چارچوب", color: 0x06b6d4 },
    { id: 7, name: "دستاوردها", color: 0x10b981 },
  ];

  // Helper function to create text sprite
  const createTextSprite = (text, color) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 256;
    canvas.height = 128;

    context.fillStyle = "rgba(0, 0, 0, 0)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = "Bold 40px monospace";
    context.fillStyle = color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.8,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(4, 2, 1);

    return sprite;
  };

  // Create binary code stars
  const createBinaryCodeStars = (scene) => {
    const bytesCodes = [
      "01010101",
      "11001100",
      "10101010",
      "11110000",
      "00001111",
      "10011001",
      "11100011",
      "01100110",
      "11010010",
      "01010110",
      "10110101",
      "11001001",
      "11111111",
      "00000000",
      "10101010",
      "01010101",
      "11110000",
      "00001111",
      "10011001",
      "01100110",
    ];

    const bitCodes = [
      "0",
      "1",
      "01",
      "10",
      "00",
      "11",
      "001",
      "010",
      "101",
      "110",
      "0011",
      "1100",
      "0101",
      "1010",
      "0110",
      "1001",
    ];

    for (let i = 0; i < 300; i++) {
      const isBytes = Math.random() > 0.4;
      const code = isBytes
        ? bytesCodes[Math.floor(Math.random() * bytesCodes.length)]
        : bitCodes[Math.floor(Math.random() * bitCodes.length)];

      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 200;
      const z = (Math.random() - 0.5) * 200;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 128;
      canvas.height = 128;

      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const colors = ["#00ff00", "#0088ff", "#ff00ff", "#00ffff", "#ffff00", "#ff6600", "#00ff88"];
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.font = isBytes ? "Bold 20px monospace" : "Bold 24px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(code, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8,
      });

      const sprite = new THREE.Sprite(material);
      sprite.position.set(x, y, z);
      sprite.scale.set(isBytes ? 6 : 5, isBytes ? 6 : 5, 1);
      sprite.userData = {
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.02,
        rotation: Math.random() * Math.PI * 2,
      };

      scene.add(sprite);
      objectsRef.current.binaryStars.push(sprite);
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011);
    scene.fog = new THREE.FogExp2(0x000011, 0.0008);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    createBinaryCodeStars(scene);
    createSectionObjects(scene, 0);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Animate binary stars
      objectsRef.current.binaryStars.forEach((star) => {
        star.position.x += star.userData.vx;
        star.position.y += star.userData.vy;
        star.position.z += star.userData.vz;

        // Wrap around
        if (Math.abs(star.position.x) > 120) star.userData.vx *= -1;
        if (Math.abs(star.position.y) > 120) star.userData.vy *= -1;
        if (Math.abs(star.position.z) > 120) star.userData.vz *= -1;

        star.material.rotation += 0.01;
      });

      objectsRef.current.particles.forEach((p) => {
        p.rotation.x += 0.001;
        p.rotation.y += 0.001;
      });

      animateSection(currentSectionRef.current);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  const createSectionObjects = (scene, sectionId) => {
    objectsRef.current.papers.forEach((obj) => scene.remove(obj));
    objectsRef.current.pixels.forEach((obj) => scene.remove(obj));
    objectsRef.current.papers = [];
    objectsRef.current.pixels = [];

    switch (sectionId) {
      case 0:
        createFloatingCodeSnippets(scene);
        break;
      case 1:
        createThreeBodies(scene);
        break;
      case 2:
        createTransformation(scene);
        break;
      case 3:
        createEventParticles(scene);
        break;
      case 4:
        createTargetGeometry(scene);
        break;
      case 5:
        createIntegrationVisual(scene);
        break;
      case 6:
        createFrameworkStructure(scene);
        break;
      case 7:
        createAchievementsVisual(scene);
        break;
    }
  };

  const createFloatingCodeSnippets = (scene) => {
    const codeSnippets = [
      "if()",
      "for",
      "{...}",
      "map()",
      "const",
      "let",
      "<div>",
      "<h1>",
      "css",
      "===",
      "=>",
      "[]",
      "fn",
      "var",
      "try",
    ];

    for (let i = 0; i < 20; i++) {
      const code = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      const colors = ["#f59e0b", "#06b6d4", "#ef4444", "#9333ea", "#10b981"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const sprite = createTextSprite(code, color);
      sprite.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30);

      scene.add(sprite);
      objectsRef.current.papers.push(sprite);
    }
  };

  const createThreeBodies = (scene) => {
    const positions = [-15, 0, 15];
    const names = ["حنجره", "کاغذ", "پیکسل"];
    const colors = [0xff6b6b, 0xfeca57, 0x48dbfb];

    positions.forEach((x, idx) => {
      const geometry = new THREE.SphereGeometry(3, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: colors[idx],
        emissive: colors[idx],
        emissiveIntensity: 0.4,
      });
      const body = new THREE.Mesh(geometry, material);
      body.position.set(x, 0, 0);
      scene.add(body);
      objectsRef.current.papers.push(body);

      const sprite = createTextSprite(names[idx], `#${colors[idx].toString(16)}`);
      sprite.position.set(x, -6, 0);
      scene.add(sprite);
      objectsRef.current.papers.push(sprite);
    });

    // Connection lines
    const material = new THREE.LineBasicMaterial({ color: 0x888888 });
    const points = [new THREE.Vector3(-15, 0, 0), new THREE.Vector3(15, 0, 0)];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    scene.add(line);
    objectsRef.current.papers.push(line);
  };

  const createTransformation = (scene) => {
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

  const createIntegrationVisual = (scene) => {
    const leftSphere = new THREE.Mesh(
      new THREE.SphereGeometry(5, 32, 32),
      new THREE.MeshPhongMaterial({
        color: 0x06b6d4,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.3,
      })
    );
    leftSphere.position.set(-15, 0, 0);
    scene.add(leftSphere);
    objectsRef.current.papers.push(leftSphere);

    const rightSphere = new THREE.Mesh(
      new THREE.SphereGeometry(5, 32, 32),
      new THREE.MeshPhongMaterial({
        color: 0xef4444,
        emissive: 0xef4444,
        emissiveIntensity: 0.3,
      })
    );
    rightSphere.position.set(15, 0, 0);
    scene.add(rightSphere);
    objectsRef.current.papers.push(rightSphere);

    // Connection particles
    for (let i = 0; i < 50; i++) {
      const x = -15 + (i / 50) * 30;
      const y = Math.sin(i * 0.5) * 5;
      const geometry = new THREE.SphereGeometry(0.3, 8, 8);
      const material = new THREE.MeshPhongMaterial({
        color: 0x9333ea,
        emissive: 0x9333ea,
        emissiveIntensity: 0.6,
      });
      const particle = new THREE.Mesh(geometry, material);
      particle.position.set(x, y, 0);
      scene.add(particle);
      objectsRef.current.pixels.push(particle);
    }
  };

  const createFrameworkStructure = (scene) => {
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

  const createAchievementsVisual = (scene) => {
    const achievements = [
      { pos: [-20, 10, 0], color: 0x10b981 },
      { pos: [-5, 15, 0], color: 0x10b981 },
      { pos: [10, 10, 0], color: 0x10b981 },
      { pos: [-12, -8, 0], color: 0x10b981 },
      { pos: [5, -10, 0], color: 0x10b981 },
    ];

    achievements.forEach((item) => {
      const geometry = new THREE.BoxGeometry(3, 3, 3);
      const material = new THREE.MeshPhongMaterial({
        color: item.color,
        emissive: item.color,
        emissiveIntensity: 0.4,
      });
      const box = new THREE.Mesh(geometry, material);
      box.position.set(...item.pos);
      scene.add(box);
      objectsRef.current.papers.push(box);
    });
  };

  const animateSection = (sectionId) => {
    const time = Date.now() * 0.001;

    switch (sectionId) {
      case 0:
        objectsRef.current.papers.forEach((sprite, i) => {
          sprite.position.y += Math.sin(time + i) * 0.05;
          sprite.position.x += Math.cos(time * 0.5 + i) * 0.03;
        });
        break;

      case 1:
        objectsRef.current.papers.forEach((obj, i) => {
          if (obj.geometry.type === "SphereGeometry") {
            obj.rotation.x = time * 0.3 + i;
            obj.rotation.y = time * 0.2 + i;
            obj.scale.x = 1 + Math.sin(time + i) * 0.1;
            obj.scale.y = 1 + Math.sin(time + i) * 0.1;
          }
        });
        break;

      case 2:
        objectsRef.current.papers.forEach((paper, i) => {
          paper.scale.x = 1 + Math.sin(time + i) * 0.1;
        });
        objectsRef.current.pixels.forEach((pixel, i) => {
          pixel.position.x += Math.sin(time + i) * 0.05;
          pixel.position.y += Math.cos(time + i) * 0.05;
          pixel.rotation.x += 0.02;
          pixel.rotation.y += 0.02;
        });
        break;

      case 3:
        objectsRef.current.pixels.forEach((particle, i) => {
          particle.position.x += Math.sin(time * 2 + i) * 0.1;
          particle.position.y += Math.cos(time * 2 + i) * 0.1;
          particle.scale.setScalar(0.5 + Math.sin(time * 3 + i) * 0.5);
        });
        break;

      case 4:
        objectsRef.current.papers.forEach((ring, i) => {
          ring.rotation.z = time + i * 0.5;
        });
        break;

      case 5:
        objectsRef.current.papers.forEach((sphere, i) => {
          if (sphere.geometry.type === "SphereGeometry") {
            sphere.rotation.x = time * 0.4 + i;
            sphere.rotation.y = time * 0.3 + i;
          }
        });
        objectsRef.current.pixels.forEach((particle, i) => {
          particle.scale.setScalar(0.5 + Math.sin(time * 2 + i) * 0.5);
        });
        break;

      case 6:
        objectsRef.current.pixels.forEach((node, i) => {
          node.scale.setScalar(0.5 + Math.sin(time * 2 + i * 0.1) * 0.5);
        });
        break;

      case 7:
        objectsRef.current.papers.forEach((box, i) => {
          box.rotation.x = time * 0.5 + i * 0.2;
          box.rotation.y = time * 0.3 + i * 0.2;
          box.position.y += Math.sin(time + i) * 0.05;
        });
        break;
    }
  };

  useEffect(() => {
    currentSectionRef.current = currentSection;
    if (!sceneRef.current) return;

    setIsTransitioning(true);

    setTimeout(() => {
      createSectionObjects(sceneRef.current, currentSection);
      setIsTransitioning(false);
    }, 300);
  }, [currentSection]);

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

  const getContent = () => {
    const contents = [
      {
        title: "ابرانگارهٔ مسلط",
        desc: "برای قرن‌ها، علم‌الادب و پژوهش‌های ادبی بر شالودۀ یک ابرانگارۀ مسلط استوار بوده است",
        formula: "متن = ابژهٔ ثابت",
        items: [],
        shake: false,
      },
      {
        title: "یک ادبیات و سه بدن",
        desc: "ادبیات در تاریخ خود سه سکوی مادی را تجربه کرده است که هرکدام منطق و قواعد خاص خود را تحمیل می‌کند",
        formula: "حنجره ← کاغذ ← پیکسل",
        items: ["بدن گذرا و شفاهی", "بدن ایستا و مکتوب", "بدن پویا و اجرایی"],
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
        title: "هِیلز و آرست",
        desc: "این رساله با ترکیب بینش هستی‌شناختی کاترین هیلز و روش پدیدارشناختی اسپن آرست، یک چارچوب تحلیلی دووجهی را تدوین می‌کند",
        formula: "هیلز ⟷ آرست",
        items: ["پساانسان‌گرایی انتقادی", "ادبیات سخت‌پیما", "مادیت رسانه", "مادیت اجرایی", "سایبرمتن"],
        shake: false,
      },
      {
        title: "زیبایی‌شناسی رایانشی",
        desc: " سازمان‌دهی شگردهای بیانی کدبیات در پنج دستۀ کارکردی",
        formula: "⸎",
        items: [
          "شگردهای رابط کاربری",
          "شگردهای طراحی فضایی",
          "شگردهای توالی زمانی",
          "شگردهای چندرسانگی",
          "شگردهای زیرساخت رویه‌ای",
        ],
        shake: false,
      },
      {
        title: "دستاوردها",
        desc: "عمده‌‌دست‌آوردهای این رساله عبارت‌اند از",
        formula: "✓",
        items: [
          "تدوین چارچوبی مفهومی از ادبیات الکترونیک برپایۀ سنتز نظری و بازخوانی تلفیقی آراء هیلز در حوزه‌های مختلف (انسان‌شناسی، ابزارشناسی، رسانه‌شناسی، ادبیات‌شناسی)",
          "تدوین شگردهای بیانی کدبیات (زیبایی‌شناسی رایانشی) با تکیه‌بر چارچوب مفهومی رساله و نظریۀ ادبیات سخت‌پیمای آرست",
          " ارائۀ طبقه‌بندی نوینی از گونه‌ها براساس استعارۀ کارکردی متن (معیاری درون‌رشته‌ای)",
          "واکاوی نظام‌مند آثار کدبی فارسی با تکیه‌بر جعبه‌ابزار تحلیلی رساله",
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

      <div ref={mountRef} className="absolute inset-0" />

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
              background: `rgba(${parseInt(
                sections[currentSection].color.toString(16).slice(0, 2),
                16
              )}, ${parseInt(sections[currentSection].color.toString(16).slice(2, 4), 16)}, ${parseInt(
                sections[currentSection].color.toString(16).slice(4, 6),
                16
              )}, 0.2)`,
              border: `2px solid #${sections[currentSection].color.toString(16)}`,
              animationDelay: "0.5s",
              opacity: 0,
            }}
          >
            <div
              className={`text-4xl font-bold text-white text-justify ${content.shake && "glitch"} rtl ${
                content.title === "سؤالات تحقیق" && " text-xl"
              }`}
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
