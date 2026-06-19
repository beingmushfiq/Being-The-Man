'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function Book3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 300;
    const height = containerRef.current.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 4);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xd4af37, 1.2, 10);
    pointLight.position.set(-2, 1, 2);
    scene.add(pointLight);

    // Create Procedural Book Cover Textures
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Dark Blue Background
      ctx.fillStyle = '#050a18';
      ctx.fillRect(0, 0, 512, 700);

      // Gold Borders
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 6;
      ctx.strokeRect(20, 20, 472, 660);
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 30, 452, 640);

      // Gold Title
      ctx.fillStyle = '#d4af37';
      ctx.font = 'italic bold 36px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('The Silent Language', 256, 280);
      ctx.fillText('of Style', 256, 330);

      // Subtitle
      ctx.fillStyle = '#e2c974';
      ctx.font = '16px Montserrat, sans-serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('FIT • COLOR • PRESENCE', 256, 400);

      ctx.fillStyle = '#8f9cae';
      ctx.font = '14px Montserrat, sans-serif';
      ctx.letterSpacing = '1px';
      ctx.fillText('BEING THE MAN', 256, 550);
    }
    const coverTexture = new THREE.CanvasTexture(canvas);

    // Book spine texture
    const canvasSpine = document.createElement('canvas');
    canvasSpine.width = 100;
    canvasSpine.height = 700;
    const ctxSpine = canvasSpine.getContext('2d');
    if (ctxSpine) {
      ctxSpine.fillStyle = '#0b1528';
      ctxSpine.fillRect(0, 0, 100, 700);
      
      // Gold line down spine
      ctxSpine.fillStyle = '#d4af37';
      ctxSpine.fillRect(45, 0, 10, 700);
    }
    const spineTexture = new THREE.CanvasTexture(canvasSpine);

    // Book Pages material (white/beige)
    const pagesMaterial = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.8 });
    const coverMaterial = new THREE.MeshStandardMaterial({ map: coverTexture, roughness: 0.3, metalness: 0.1 });
    const spineMaterial = new THREE.MeshStandardMaterial({ map: spineTexture, roughness: 0.4 });
    const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x050a18, roughness: 0.5 });

    // Multi-materials array for Cube/BoxGeometry
    // Order: Right, Left, Top, Bottom, Front, Back
    const materials = [
      pagesMaterial,  // Right (edges of pages)
      spineMaterial,  // Left (spine)
      pagesMaterial,  // Top (pages edge)
      pagesMaterial,  // Bottom (pages edge)
      coverMaterial,  // Front cover
      darkMaterial,   // Back cover
    ];

    // Geometry (Book dimensions: width=1.8, height=2.5, depth=0.3)
    const geometry = new THREE.BoxGeometry(1.8, 2.5, 0.3);
    const book = new THREE.Mesh(geometry, materials);
    scene.add(book);

    // Position and initial rotation
    book.rotation.y = -0.4;
    book.rotation.x = 0.2;

    // Interaction controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = () => { isDragging = true; };
    const handleMouseMove = (e: MouseEvent) => {
      const deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y
      };

      if (isDragging) {
        book.rotation.y += deltaMove.x * 0.005;
        book.rotation.x += deltaMove.y * 0.005;
      }

      previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
      };
    };
    const handleMouseUp = () => { isDragging = false; };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    domElement.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto-rotation if not dragging
      if (!isDragging) {
        book.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', handleMouseDown);
      domElement.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        containerRef.current.removeChild(domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing">
      <div ref={containerRef} className="w-[300px] h-[400px]" />
      <div className="absolute bottom-4 text-center text-xs text-brand-gray tracking-wider uppercase select-none pointer-events-none bg-brand-dark/80 px-3 py-1 rounded-full border border-brand-gold/20">
        বইটি ঘুরিয়ে দেখতে ড্র্যাগ করুন
      </div>
    </div>
  );
}
