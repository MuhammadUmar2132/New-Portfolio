// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import * as THREE from 'three';
// import { Download, ArrowDown, Mail, ChevronRight, Sparkles, Code, Layers, Zap } from 'lucide-react';
// import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';

// const ROLES = ['MERN Stack Developer', 'Next.js Specialist', 'NestJS Backend Dev', 'Full Stack Engineer'];

// const floatingTech = [
//   { label: 'Next.js', x: '5%', y: '15%', delay: 0, icon: '⚡' },
//   { label: 'React', x: '75%', y: '8%', delay: 0.4, icon: '⚛️' },
//   { label: 'NestJS', x: '82%', y: '78%', delay: 0.8, icon: '🚀' },
//   { label: 'MongoDB', x: '8%', y: '80%', delay: 1.2, icon: '🍃' },
//   { label: 'TypeScript', x: '12%', y: '50%', delay: 0.6, icon: '📘' },
//   { label: 'Node.js', x: '85%', y: '45%', delay: 1, icon: '🟢' },
// ];

// const stats = [
//   { value: '3+', label: 'Years Experience' },
//   { value: '20+', label: 'Projects Completed' },
//   { value: '15+', label: 'Happy Clients' },
//   { value: '100%', label: 'Code Quality' },
// ];

// export default function Hero() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const containerRef = useRef<HTMLElement>(null);
//   const [roleIdx, setRoleIdx] = useState(0);
//   const [displayed, setDisplayed] = useState('');
//   const [typing, setTyping] = useState(true);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start start', 'end start'],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
//   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

//   // Typing animation
//   useEffect(() => {
//     const role = ROLES[roleIdx];
//     let timeout: ReturnType<typeof setTimeout>;
//     if (typing) {
//       if (displayed.length < role.length) {
//         timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 65);
//       } else {
//         timeout = setTimeout(() => setTyping(false), 1800);
//       }
//     } else {
//       if (displayed.length > 0) {
//         timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
//       } else {
//         setRoleIdx((i) => (i + 1) % ROLES.length);
//         setTyping(true);
//       }
//     }
//     return () => clearTimeout(timeout);
//   }, [displayed, typing, roleIdx]);

//   // Mouse tracking for 3D
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth) * 2 - 1,
//         y: -(e.clientY / window.innerHeight) * 2 + 1,
//       });
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   // Premium Three.js Scene
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ 
//       canvas, 
//       alpha: true, 
//       antialias: true,
//       powerPreference: "high-performance"
//     });
//     renderer.setSize(canvas.clientWidth, canvas.clientHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     camera.position.z = 4;

//     // Main Geometry
//     const geometry = new THREE.IcosahedronGeometry(2, 2);
    
//     const material = new THREE.MeshPhysicalMaterial({
//       color: 0x050508,
//       metalness: 0.9,
//       roughness: 0.1,
//       clearcoat: 1.0,
//       clearcoatRoughness: 0.1,
//       wireframe: false,
//       envMapIntensity: 1.0,
//     });

//     const mesh = new THREE.Mesh(geometry, material);
    
//     const wireframeMaterial = new THREE.LineBasicMaterial({
//       color: 0x00d4ff,
//       transparent: true,
//       opacity: 0.3,
//     });
//     const wireframe = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), wireframeMaterial);
    
//     const group = new THREE.Group();
//     group.add(mesh);
//     group.add(wireframe);
//     scene.add(group);

//     // Particles
//     const particleCount = 2000;
//     const particleGeometry = new THREE.BufferGeometry();
//     const positions = new Float32Array(particleCount * 3);
//     const colors = new Float32Array(particleCount * 3);
//     for (let i = 0; i < particleCount * 3; i += 3) {
//       positions[i] = (Math.random() - 0.5) * 20;
//       positions[i+1] = (Math.random() - 0.5) * 20;
//       positions[i+2] = (Math.random() - 0.5) * 10;
      
//       const color = new THREE.Color().setHSL(0.5 + Math.random() * 0.2, 0.8, 0.5);
//       colors[i] = color.r;
//       colors[i+1] = color.g;
//       colors[i+2] = color.b;
//     }
//     particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//     particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
//     const particleMaterial = new THREE.PointsMaterial({
//       size: 0.03,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.6,
//       blending: THREE.AdditiveBlending,
//     });
//     const particles = new THREE.Points(particleGeometry, particleMaterial);
//     scene.add(particles);

//     // Lighting
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     scene.add(ambientLight);

//     const pointLight1 = new THREE.PointLight(0x00d4ff, 50, 10);
//     pointLight1.position.set(3, 3, 3);
//     scene.add(pointLight1);

//     const pointLight2 = new THREE.PointLight(0xa855f7, 50, 10);
//     pointLight2.position.set(-3, -3, 3);
//     scene.add(pointLight2);

//     const pointLight3 = new THREE.PointLight(0xf59e0b, 30, 10);
//     pointLight3.position.set(0, 4, -2);
//     scene.add(pointLight3);

//     // Morphing
//     const positionAttribute = geometry.getAttribute('position');
//     const vertex = new THREE.Vector3();
//     const originalPositions = [];
//     for (let i = 0; i < positionAttribute.count; i++) {
//       vertex.fromBufferAttribute(positionAttribute, i);
//       originalPositions.push(vertex.clone());
//     }

//     let animId: number;
//     let time = 0;

//     const animate = () => {
//       animId = requestAnimationFrame(animate);
//       time += 0.01;

//       // Smooth rotation with mouse
//       group.rotation.x += (mousePosition.y * 0.5 - group.rotation.x) * 0.05;
//       group.rotation.y += (mousePosition.x * 0.5 - group.rotation.y) * 0.05;
//       group.rotation.z += 0.002;

//       // Morphing
//       const positions = geometry.attributes.position;
//       for (let i = 0; i < positions.count; i++) {
//         const p = originalPositions[i];
//         vertex.copy(p);
        
//         const distortion = Math.sin(time * 2 + p.x * 2) * Math.cos(time * 2 + p.y * 2) * 0.1;
//         vertex.normalize().multiplyScalar(2 + distortion);
        
//         positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
//       }
//       positions.needsUpdate = true;

//       // Particle animation
//       const particlePositions = particles.geometry.attributes.position.array;
//       for (let i = 0; i < particlePositions.length; i += 3) {
//         particlePositions[i+1] += Math.sin(time + particlePositions[i] * 0.5) * 0.001;
//         particlePositions[i] += Math.cos(time + particlePositions[i+1] * 0.5) * 0.001;
//       }
//       particles.geometry.attributes.position.needsUpdate = true;

//       // Dynamic lights
//       pointLight1.intensity = 30 + Math.sin(time * 3) * 10;
//       pointLight2.intensity = 30 + Math.cos(time * 2) * 10;
//       pointLight3.intensity = 20 + Math.sin(time * 1.5) * 10;

//       renderer.render(scene, camera);
//     };
//     animate();

//     const onResize = () => {
//       camera.aspect = canvas.clientWidth / canvas.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(canvas.clientWidth, canvas.clientHeight);
//     };
//     window.addEventListener('resize', onResize);

//     // Theme observer
//     const observer = new MutationObserver((mutations) => {
//       mutations.forEach((mutation) => {
//         if (mutation.attributeName === 'class') {
//           const isDark = document.documentElement.classList.contains('dark');
//           material.color.setHex(isDark ? 0x050508 : 0xf8fafc);
//           wireframeMaterial.color.setHex(isDark ? 0x00d4ff : 0x0284c7);
//           wireframeMaterial.opacity = isDark ? 0.3 : 0.15;
//           pointLight1.color.setHex(isDark ? 0x00d4ff : 0x0ea5e9);
//           pointLight2.color.setHex(isDark ? 0xa855f7 : 0x6366f1);
//           pointLight3.color.setHex(isDark ? 0xf59e0b : 0xf59e0b);
//           particleMaterial.opacity = isDark ? 0.6 : 0.3;
//         }
//       });
//     });
//     observer.observe(document.documentElement, { attributes: true });
    
//     const isDark = document.documentElement.classList.contains('dark');
//     if (!isDark) {
//       material.color.setHex(0xf8fafc);
//       wireframeMaterial.color.setHex(0x0284c7);
//       wireframeMaterial.opacity = 0.15;
//       pointLight1.color.setHex(0x0ea5e9);
//       pointLight2.color.setHex(0x6366f1);
//       particleMaterial.opacity = 0.3;
//     }

//     return () => {
//       cancelAnimationFrame(animId);
//       window.removeEventListener('resize', onResize);
//       observer.disconnect();
//       renderer.dispose();
//       geometry.dispose();
//       material.dispose();
//       wireframeMaterial.dispose();
//       particleGeometry.dispose();
//       particleMaterial.dispose();
//     };
//   }, [mousePosition]);

//   return (
//     <section 
//       id="home" 
//       ref={containerRef}
//       className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20"
//     >
//       {/* Three.js canvas */}
//       <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70 dark:opacity-100" />

//       {/* Modern Grid Pattern */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-background/80 pointer-events-none" />
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

//       {/* Gradient Orbs */}
//       <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
//       <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse-slower pointer-events-none" />
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

//       <motion.div 
//         style={{ y, opacity }}
//         className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-32 pb-20"
//       >
//         <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-[80vh]">

//           {/* ── LEFT: Text content ── */}
//           <div className="flex flex-col justify-center order-2 lg:order-1 relative z-20">

//             {/* Premium Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="flex items-center gap-3 mb-8 flex-wrap"
//             >
//               <div className="relative group">
//                 <span className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono tracking-wider shadow-lg backdrop-blur-xl hover:scale-105 transition-all duration-300 cursor-default">
//                   <span className="relative flex h-2 w-2">
//                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//                     <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
//                   </span>
//                   Available for Work
//                 </span>
//               </div>
//               <span className="px-5 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-700 dark:text-cyan-400/80 text-xs font-mono tracking-wider backdrop-blur-xl">
//                 Remote / On-site
//               </span>
//               <span className="px-5 py-2.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-700 dark:text-purple-400/80 text-xs font-mono tracking-wider backdrop-blur-xl hidden sm:flex items-center gap-1">
//                 <Sparkles size={12} /> 3+ Years
//               </span>
//             </motion.div>

//             {/* Name with Premium Animation */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <p className="text-muted-foreground text-sm font-mono mb-3 tracking-[0.3em] uppercase font-semibold flex items-center gap-2">
//                 <span className="w-8 h-[2px] bg-cyan-500/50" /> Hi there, I&apos;m
//               </p>
//               <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[1.05] mb-6 tracking-tight">
//                 <motion.span 
//                   className="text-foreground block"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   Muhammad
//                 </motion.span>
//                 <motion.span 
//                   className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 dark:from-cyan-300 dark:via-blue-400 dark:to-purple-400 text-glow-cyan inline-block"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.4 }}
//                 >
//                   Umar
//                   <motion.span
//                     className="inline-block ml-1"
//                     animate={{ rotate: [0, 10, -10, 0] }}
//                     transition={{ repeat: Infinity, duration: 2, delay: 1 }}
//                   >
//                     ✦
//                   </motion.span>
//                 </motion.span>
//               </h1>
//             </motion.div>

//             {/* Typing role with Premium Style */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.5 }}
//               className="flex items-center gap-4 mb-8"
//             >
//               <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
//               <div className="text-xl md:text-2xl text-cyan-700 dark:text-cyan-400 font-mono font-bold flex items-center gap-2">
//                 <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
//                 <span className="min-h-[2rem]">{displayed}</span>
//                 <span className="inline-block w-[2px] h-7 bg-cyan-400 animate-pulse ml-1" />
//               </div>
//             </motion.div>

//             {/* Description with Rich Text */}
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.65 }}
//               className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl mb-10 font-medium"
//             >
//               I craft high-performance web applications using{' '}
//               <span className="text-foreground font-semibold border-b-2 border-cyan-500/30">Next.js</span>,{' '}
//               <span className="text-foreground font-semibold border-b-2 border-purple-500/30">NestJS</span>, and{' '}
//               <span className="text-foreground font-semibold border-b-2 border-emerald-500/30">MongoDB</span>.
//               From sleek frontends to scalable APIs — I build it all.
//             </motion.p>

//             {/* Stats */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.7 }}
//               className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
//             >
//               {stats.map((stat, index) => (
//                 <motion.div
//                   key={stat.label}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.8 + index * 0.1 }}
//                   className="text-center p-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-cyan-500/30 transition-all duration-300 hover:bg-card/80 hover:scale-105"
//                 >
//                   <div className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
//                     {stat.value}
//                   </div>
//                   <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* CTA Buttons with Premium Design */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.9 }}
//               className="flex flex-wrap gap-4 mb-12"
//             >
//               <button
//                 onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
//                 className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-2 overflow-hidden"
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   View My Work <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </button>
              
//               <a
//                 href="/cv"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="group relative px-8 py-4 border-2 border-border text-foreground font-bold rounded-xl hover:border-cyan-500/50 hover:bg-secondary/50 transition-all duration-300 flex items-center gap-2 overflow-hidden"
//               >
//                 <Download size={18} className="group-hover:-translate-y-1 transition-transform" /> 
//                 Download CV
//                 <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
//               </a>
//             </motion.div>

//             {/* Social Links with Premium Design */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6, delay: 1 }}
//               className="flex items-center gap-4"
//             >
//               <span className="text-muted-foreground text-sm font-mono font-semibold uppercase tracking-wider mr-2 flex items-center gap-2">
//                 <span className="w-4 h-[2px] bg-muted-foreground/30" /> Follow
//               </span>
//               {[
//                 { icon: GithubIcon, href: 'https://github.com', label: 'GitHub', color: 'hover:text-foreground hover:border-foreground/40 hover:bg-foreground/5' },
//                 { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-500 hover:border-blue-500/40 hover:bg-blue-500/5' },
//                 { icon: Mail, href: 'mailto:bakkahtransport@gmail.com', label: 'Email', color: 'hover:text-cyan-500 hover:border-cyan-500/40 hover:bg-cyan-500/5' },
//               ].map(({ icon: Icon, href, label, color }, index) => (
//                 <motion.a
//                   key={label}
//                   href={href}
//                   target="_blank"
//                   rel="noreferrer"
//                   aria-label={label}
//                   initial={{ opacity: 0, scale: 0 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 1.1 + index * 0.1 }}
//                   className={`p-3.5 rounded-xl border border-border/50 text-muted-foreground bg-card/30 backdrop-blur-sm shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-110 ${color}`}
//                 >
//                   <Icon size={18} />
//                 </motion.a>
//               ))}
//             </motion.div>
//           </div>

//           {/* ── RIGHT: Interactive 3D Area ── */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.85 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
//             className="relative flex items-center justify-center order-1 lg:order-2 min-h-[24rem] sm:min-h-[28rem] lg:min-h-0 pointer-events-none"
//           >
//             {/* Floating Tech Badges with Premium Design */}
//             {floatingTech.map((tech, i) => (
//               <motion.div
//                 key={tech.label}
//                 initial={{ opacity: 0, scale: 0, rotate: -20 }}
//                 animate={{ opacity: 1, scale: 1, rotate: 0 }}
//                 transition={{ 
//                   delay: 0.8 + i * 0.12, 
//                   type: 'spring', 
//                   stiffness: 200,
//                   damping: 15
//                 }}
//                 style={{ 
//                   position: 'absolute', 
//                   left: tech.x, 
//                   top: tech.y,
//                   transform: `translate(${Math.sin(i) * 10}px, ${Math.cos(i * 1.5) * 10}px)`
//                 }}
//                 className={`px-5 py-2.5 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl flex items-center gap-2 text-foreground text-sm font-mono pointer-events-auto hover:scale-110 hover:border-cyan-500/30 transition-all duration-300 ${
//                   i % 3 === 0 ? 'float' : i % 3 === 1 ? 'float-delayed' : 'float-slow'
//                 }`}
//               >
//                 <span className="text-lg">{tech.icon}</span>
//                 <span>{tech.label}</span>
//                 <span className="absolute -inset-px bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
//               </motion.div>
//             ))}

//             {/* Decorative Rings */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-[20rem] h-[20rem] border border-cyan-500/10 rounded-full animate-spin-slow" />
//               <div className="absolute w-[15rem] h-[15rem] border border-purple-500/10 rounded-full animate-spin-slower" />
//               <div className="absolute w-[10rem] h-[10rem] border border-blue-500/10 rounded-full animate-spin-slow" />
//             </div>

//             {/* Glow Ring */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-[25rem] h-[25rem] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse-slow" />
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Premium Scroll Indicator */}
//       <motion.button
//         onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1, y: [0, 8, 0] }}
//         transition={{ 
//           opacity: { delay: 1.8 }, 
//           y: { 
//             repeat: Infinity, 
//             duration: 2,
//             ease: "easeInOut"
//           } 
//         }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors z-20 group"
//       >
//         <span className="text-[10px] font-mono tracking-[0.3em] font-bold uppercase flex items-center gap-2">
//           <span className="w-4 h-[1px] bg-muted-foreground/30" />
//           Scroll
//           <span className="w-4 h-[1px] bg-muted-foreground/30" />
//         </span>
//         <div className="w-6 h-10 border-2 border-muted-foreground/20 rounded-full flex justify-center group-hover:border-foreground/40 transition-colors">
//           <motion.div
//             animate={{ y: [0, 12, 0] }}
//             transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
//             className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2"
//           />
//         </div>
//       </motion.button>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-12px) rotate(2deg); }
//         }

//         @keyframes float-delayed {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-12px) rotate(-2deg); }
//         }

//         @keyframes float-slow {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-8px) rotate(1deg); }
//         }

//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         @keyframes spin-slower {
//           from { transform: rotate(360deg); }
//           to { transform: rotate(0deg); }
//         }

//         @keyframes pulse-slow {
//           0%, 100% { opacity: 0.4; transform: scale(1); }
//           50% { opacity: 0.8; transform: scale(1.05); }
//         }

//         @keyframes pulse-slower {
//           0%, 100% { opacity: 0.3; transform: scale(1); }
//           50% { opacity: 0.7; transform: scale(1.1); }
//         }

//         .float { animation: float 4s ease-in-out infinite; }
//         .float-delayed { animation: float-delayed 4s ease-in-out infinite 1s; }
//         .float-slow { animation: float-slow 6s ease-in-out infinite 0.5s; }
//         .animate-spin-slow { animation: spin-slow 20s linear infinite; }
//         .animate-spin-slower { animation: spin-slower 25s linear infinite; }
//         .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
//         .animate-pulse-slower { animation: pulse-slower 6s ease-in-out infinite; }

//         .text-glow-cyan {
//           text-shadow: 0 0 40px rgba(6, 182, 212, 0.2);
//         }

//         .dark .text-glow-cyan {
//           text-shadow: 0 0 60px rgba(6, 182, 212, 0.15);
//         }
//       `}</style>
//     </section>
//   );
// }

// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import * as THREE from 'three';
// import { Download, ArrowDown, Mail, ChevronRight, Code, Zap, Cpu, Globe } from 'lucide-react';
// import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';

// const ROLES = ['MERN Stack Developer', 'Next.js Specialist', 'NestJS Backend Dev', 'Full Stack Engineer'];

// // Optimized floating tech - reduced items for better performance
// const floatingTech = [
//   { label: 'Next.js', icon: '⚡', color: 'border-cyan-500/30 bg-cyan-500/10' },
//   { label: 'React', icon: '⚛️', color: 'border-blue-500/30 bg-blue-500/10' },
//   { label: 'NestJS', icon: '🚀', color: 'border-purple-500/30 bg-purple-500/10' },
//   { label: 'MongoDB', icon: '🍃', color: 'border-green-500/30 bg-green-500/10' },
// ];

// const stats = [
//   { value: '3+', label: 'Years Experience', icon: <Cpu size={16} /> },
//   { value: '20+', label: 'Projects', icon: <Code size={16} /> },
//   { value: '15+', label: 'Clients', icon: <Globe size={16} /> },
//   { value: '100%', label: 'Quality', icon: <Zap size={16} /> },
// ];

// export default function Hero() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const containerRef = useRef<HTMLElement>(null);
//   const [roleIdx, setRoleIdx] = useState(0);
//   const [displayed, setDisplayed] = useState('');
//   const [typing, setTyping] = useState(true);
//   const [isVisible, setIsVisible] = useState(false);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start start', 'end start'],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
//   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

//   // Typing animation - optimized
//   useEffect(() => {
//     const role = ROLES[roleIdx];
//     let timeout: ReturnType<typeof setTimeout>;
//     if (typing) {
//       if (displayed.length < role.length) {
//         timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 60);
//       } else {
//         timeout = setTimeout(() => setTyping(false), 1500);
//       }
//     } else {
//       if (displayed.length > 0) {
//         timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
//       } else {
//         setRoleIdx((i) => (i + 1) % ROLES.length);
//         setTyping(true);
//       }
//     }
//     return () => clearTimeout(timeout);
//   }, [displayed, typing, roleIdx]);

//   // Intersection Observer for performance
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsVisible(entry.isIntersecting);
//       },
//       { threshold: 0.1 }
//     );
//     if (containerRef.current) {
//       observer.observe(containerRef.current);
//     }
//     return () => observer.disconnect();
//   }, []);

//   // Optimized Three.js Scene with fewer particles
//   useEffect(() => {
//     if (!canvasRef.current || !isVisible) return;

//     const canvas = canvasRef.current;
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ 
//       canvas, 
//       alpha: true, 
//       antialias: true,
//       powerPreference: "high-performance"
//     });
//     renderer.setSize(canvas.clientWidth, canvas.clientHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
//     camera.position.z = 4;

//     // Main Geometry - lower poly for performance
//     const geometry = new THREE.IcosahedronGeometry(2, 1);
    
//     const material = new THREE.MeshPhysicalMaterial({
//       color: 0x050508,
//       metalness: 0.8,
//       roughness: 0.2,
//       clearcoat: 0.8,
//       clearcoatRoughness: 0.2,
//       wireframe: false,
//     });

//     const mesh = new THREE.Mesh(geometry, material);
    
//     // Wireframe with lower opacity
//     const wireframeMaterial = new THREE.LineBasicMaterial({
//       color: 0x00d4ff,
//       transparent: true,
//       opacity: 0.2,
//     });
//     const wireframe = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), wireframeMaterial);
    
//     const group = new THREE.Group();
//     group.add(mesh);
//     group.add(wireframe);
//     scene.add(group);

//     // Reduced particles for better performance
//     const particleCount = 800;
//     const particleGeometry = new THREE.BufferGeometry();
//     const positions = new Float32Array(particleCount * 3);
//     for (let i = 0; i < particleCount * 3; i += 3) {
//       positions[i] = (Math.random() - 0.5) * 15;
//       positions[i+1] = (Math.random() - 0.5) * 15;
//       positions[i+2] = (Math.random() - 0.5) * 8;
//     }
//     particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
//     const particleMaterial = new THREE.PointsMaterial({
//       size: 0.02,
//       color: 0x00d4ff,
//       transparent: true,
//       opacity: 0.4,
//       blending: THREE.AdditiveBlending,
//     });
//     const particles = new THREE.Points(particleGeometry, particleMaterial);
//     scene.add(particles);

//     // Optimized Lighting
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
//     scene.add(ambientLight);

//     const pointLight1 = new THREE.PointLight(0x00d4ff, 30, 10);
//     pointLight1.position.set(3, 3, 3);
//     scene.add(pointLight1);

//     const pointLight2 = new THREE.PointLight(0xa855f7, 30, 10);
//     pointLight2.position.set(-3, -3, 3);
//     scene.add(pointLight2);

//     // Pre-calculate original positions for morphing
//     const positionAttribute = geometry.getAttribute('position');
//     const vertex = new THREE.Vector3();
//     const originalPositions = [];
//     for (let i = 0; i < positionAttribute.count; i++) {
//       vertex.fromBufferAttribute(positionAttribute, i);
//       originalPositions.push(vertex.clone());
//     }

//     let animId: number;
//     let time = 0;
//     let mouseX = 0;
//     let mouseY = 0;

//     const animate = () => {
//       animId = requestAnimationFrame(animate);
//       time += 0.01;

//       // Smooth rotation
//       group.rotation.x += (mouseY * 0.3 - group.rotation.x) * 0.05;
//       group.rotation.y += (mouseX * 0.3 - group.rotation.y) * 0.05;
//       group.rotation.z += 0.001;

//       // Morphing - simplified
//       const positions = geometry.attributes.position;
//       for (let i = 0; i < positions.count; i++) {
//         const p = originalPositions[i];
//         vertex.copy(p);
        
//         const distortion = Math.sin(time * 1.5 + p.x * 2) * Math.cos(time * 1.5 + p.y * 2) * 0.08;
//         vertex.normalize().multiplyScalar(2 + distortion);
        
//         positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
//       }
//       positions.needsUpdate = true;

//       // Simple particle rotation
//       particles.rotation.y += 0.0005;
//       particles.rotation.x += 0.0003;

//       renderer.render(scene, camera);
//     };
//     animate();

//     const onResize = () => {
//       camera.aspect = canvas.clientWidth / canvas.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(canvas.clientWidth, canvas.clientHeight);
//     };

//     const onMouseMove = (e: MouseEvent) => {
//       mouseX = (e.clientX / window.innerWidth) * 2 - 1;
//       mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
//     };

//     window.addEventListener('resize', onResize);
//     window.addEventListener('mousemove', onMouseMove);

//     // Cleanup
//     return () => {
//       cancelAnimationFrame(animId);
//       window.removeEventListener('resize', onResize);
//       window.removeEventListener('mousemove', onMouseMove);
//       renderer.dispose();
//       geometry.dispose();
//       material.dispose();
//       wireframeMaterial.dispose();
//       particleGeometry.dispose();
//       particleMaterial.dispose();
//     };
//   }, [isVisible]);

//   return (
//     <section 
//       id="home" 
//       ref={containerRef}
//       className="relative min-h-screen flex items-center overflow-hidden bg-background"
//     >
//       {/* Optimized Three.js canvas */}
//       {isVisible && (
//         <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 dark:opacity-80" />
//       )}

//       {/* Simple gradient overlay - no heavy animations */}
//       <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background pointer-events-none" />
      
//       {/* Subtle grid - lightweight */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

//       <motion.div 
//         style={{ y, opacity }}
//         className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-28 pb-16"
//       >
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[75vh]">

//           {/* ── LEFT: Text content ── */}
//           <div className="flex flex-col justify-center order-2 lg:order-1">

//             {/* Minimal Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: 0.1 }}
//               className="flex items-center gap-2 mb-6 flex-wrap"
//             >
//               <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-500/20">
//                 <span className="relative flex h-1.5 w-1.5">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
//                 </span>
//                 Available
//               </span>
//               <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-medium border border-cyan-500/20">
//                 Remote
//               </span>
//             </motion.div>

//             {/* Name */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-4 tracking-tight">
//                 <span className="text-foreground block">Muhammad</span>
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 inline-block">
//                   Umar
//                 </span>
//               </h1>
//             </motion.div>

//             {/* Typing role */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.4, delay: 0.4 }}
//               className="flex items-center gap-3 mb-6"
//             >
//               <div className="w-8 h-[2px] bg-gradient-to-r from-cyan-500 to-purple-500" />
//               <span className="text-lg md:text-xl text-cyan-600 dark:text-cyan-400 font-mono font-semibold flex items-center gap-2">
//                 <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
//                 <span>{displayed}</span>
//                 <span className="inline-block w-[2px] h-6 bg-cyan-400 animate-pulse" />
//               </span>
//             </motion.div>

//             {/* Description */}
//             <motion.p
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.5 }}
//               className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mb-8"
//             >
//               Full-stack developer specializing in{' '}
//               <span className="text-foreground font-semibold">Next.js</span>,{' '}
//               <span className="text-foreground font-semibold">NestJS</span>, and{' '}
//               <span className="text-foreground font-semibold">MongoDB</span>.
//               Building modern, scalable web applications.
//             </motion.p>

//             {/* Stats - Clean design */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.6 }}
//               className="grid grid-cols-4 gap-3 mb-8"
//             >
//               {stats.map((stat, index) => (
//                 <motion.div
//                   key={stat.label}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.7 + index * 0.05 }}
//                   className="text-center p-2.5 rounded-lg bg-card/30 border border-border/30"
//                 >
//                   <div className="text-lg font-bold text-foreground">{stat.value}</div>
//                   <div className="text-[10px] text-muted-foreground font-medium flex items-center justify-center gap-1">
//                     {stat.icon}
//                     {stat.label}
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* CTA Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: 0.8 }}
//               className="flex flex-wrap gap-3 mb-8"
//             >
//               <button
//                 onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
//                 className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
//               >
//                 View Work <ChevronRight size={16} />
//               </button>
              
//               <a
//                 href="/cv"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary/50 transition-all duration-300 flex items-center gap-2"
//               >
//                 <Download size={16} /> CV
//               </a>
//             </motion.div>

//             {/* Social Links */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.4, delay: 0.9 }}
//               className="flex items-center gap-3"
//             >
//               {[
//                 { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
//                 { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
//                 { icon: Mail, href: 'mailto:bakkahtransport@gmail.com', label: 'Email' },
//               ].map(({ icon: Icon, href, label }, index) => (
//                 <motion.a
//                   key={label}
//                   href={href}
//                   target="_blank"
//                   rel="noreferrer"
//                   aria-label={label}
//                   initial={{ opacity: 0, scale: 0 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 1 + index * 0.05 }}
//                   className="p-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-300 hover:-translate-y-0.5"
//                 >
//                   <Icon size={16} />
//                 </motion.a>
//               ))}
//             </motion.div>
//           </div>

//           {/* ── RIGHT: Floating Tech Stack ── */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="relative flex items-center justify-center order-1 lg:order-2 min-h-[20rem] sm:min-h-[24rem]"
//           >
//             {/* Central Tech Stack */}
//             <div className="relative grid grid-cols-2 gap-4 p-6 bg-card/20 backdrop-blur-sm rounded-2xl border border-border/30">
//               {floatingTech.map((tech, i) => (
//                 <motion.div
//                   key={tech.label}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.5 + i * 0.08 }}
//                   className={`flex items-center gap-2 px-4 py-3 rounded-xl border ${tech.color} backdrop-blur-sm`}
//                 >
//                   <span className="text-xl">{tech.icon}</span>
//                   <span className="text-sm font-medium">{tech.label}</span>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Decorative ring - lightweight */}
//             <div className="absolute -z-10 w-[18rem] h-[18rem] border border-cyan-500/10 rounded-full animate-spin-slow" />
//             <div className="absolute -z-10 w-[14rem] h-[14rem] border border-purple-500/10 rounded-full animate-spin-slower" />
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Scroll Indicator */}
//       <motion.button
//         onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5 }}
//         className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors z-20"
//       >
//         <span className="text-[8px] font-mono tracking-[0.2em] font-bold uppercase">Scroll</span>
//         <ArrowDown size={16} className="animate-bounce" />
//       </motion.button>

//       <style jsx>{`
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         @keyframes spin-slower {
//           from { transform: rotate(360deg); }
//           to { transform: rotate(0deg); }
//         }
//         .animate-spin-slow { animation: spin-slow 20s linear infinite; }
//         .animate-spin-slower { animation: spin-slower 25s linear infinite; }
//       `}</style>
//     </section>
//   );
// }



'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { Download, ArrowDown, Mail, ChevronRight, Code, Zap, Cpu, Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';
import { getProfile } from '@/lib/api';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const avatarSrc = (url: string) => (url.startsWith('http') ? url : `${API_BASE}${url}`);

const ROLES = ['MERN Stack Developer', 'Next.js Specialist', 'NestJS Backend Dev', 'Full Stack Engineer'];

// Optimized floating tech - reduced items for better performance
const floatingTech = [
  { label: 'Next.js', icon: '⚡', color: 'border-cyan-500/30 bg-cyan-500/10' },
  { label: 'React', icon: '⚛️', color: 'border-blue-500/30 bg-blue-500/10' },
  { label: 'Node.js', icon: '🚀', color: 'border-purple-500/30 bg-purple-500/10' },
  { label: 'MongoDB', icon: '🍃', color: 'border-green-500/30 bg-green-500/10' },
];

const defaultStats = [
  { value: '3+', label: 'Years Experience', icon: <Cpu size={16} /> },
  { value: '20+', label: 'Projects', icon: <Code size={16} /> },
  { value: '15+', label: 'Clients', icon: <Globe size={16} /> },
  { value: '100%', label: 'Quality', icon: <Zap size={16} /> },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    getProfile()
      .then((profile) => {
        setAvatarUrl(profile.avatarUrl ?? null);
        // About's stats: index 0 = Projects Completed, index 1 = Years Experience — keep Hero in sync with the same admin-set values
        const projectsCompleted = profile.stats?.[0]?.value;
        const yearsExperience = profile.stats?.[1]?.value;
        setStats((prev) =>
          prev.map((s, i) => {
            if (i === 0 && yearsExperience) return { ...s, value: yearsExperience };
            if (i === 1 && projectsCompleted) return { ...s, value: projectsCompleted };
            return s;
          }),
        );
      })
      .catch(() => setAvatarUrl(null));
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Typing animation - optimized
  useEffect(() => {
    const role = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < role.length) {
        timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1500);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIdx]);

  // Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Optimized Three.js Scene with fewer particles
  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    camera.position.z = 4;

    // Main Geometry - lower poly for performance
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x050508,
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    
    // Wireframe with lower opacity
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.2,
    });
    const wireframe = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), wireframeMaterial);
    
    const group = new THREE.Group();
    group.add(mesh);
    group.add(wireframe);
    scene.add(group);

    // Reduced particles for better performance
    const particleCount = 800;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i+1] = (Math.random() - 0.5) * 15;
      positions[i+2] = (Math.random() - 0.5) * 8;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Optimized Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00d4ff, 30, 10);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 30, 10);
    pointLight2.position.set(-3, -3, 3);
    scene.add(pointLight2);

    // Pre-calculate original positions for morphing
    const positionAttribute = geometry.getAttribute('position');
    const vertex = new THREE.Vector3();
    const originalPositions: THREE.Vector3[] = [];
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      originalPositions.push(vertex.clone());
    }

    let animId: number;
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.01;

      // Smooth rotation
      group.rotation.x += (mouseY * 0.3 - group.rotation.x) * 0.05;
      group.rotation.y += (mouseX * 0.3 - group.rotation.y) * 0.05;
      group.rotation.z += 0.001;

      // Morphing - simplified
      const positions = geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const p = originalPositions[i];
        vertex.copy(p);
        
        const distortion = Math.sin(time * 1.5 + p.x * 2) * Math.cos(time * 1.5 + p.y * 2) * 0.08;
        vertex.normalize().multiplyScalar(2 + distortion);
        
        positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }
      positions.needsUpdate = true;

      // Simple particle rotation
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0003;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      wireframeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, [isVisible]);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      {/* Optimized Three.js canvas */}
      {isVisible && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 dark:opacity-80" />
      )}

      {/* Simple gradient overlay - no heavy animations */}
      <div className="absolute inset-0 bg-linear-to-b from-background/0 via-background/50 to-background pointer-events-none" />
      
      {/* Subtle grid - lightweight */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg/[size:60px_60px] pointer-events-none" />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-28 pb-16"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[75vh]">

          {/* ── LEFT: Text content ── */}
          <div className="flex flex-col justify-center order-2 lg:order-1">

            {/* Minimal Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-2 mb-6 flex-wrap"
            >
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-500/20">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                Available
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-medium border border-cyan-500/20">
                Remote
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-4 tracking-tight">
                <span className="text-foreground block">Muhammad</span>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 inline-block">
                  Umar
                </span>
              </h1>
            </motion.div>

            {/* Typing role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h/[2px] bg-linear-to-r from-cyan-500 to-purple-500" />
              <span className="text-lg md:text-xl text-cyan-600 dark:text-cyan-400 font-mono font-semibold flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                <span>{displayed}</span>
                <span className="inline-block w/[2px] h-6 bg-cyan-400 animate-pulse" />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mb-8"
            >
              Full-stack developer specializing in{' '}
              <span className="text-foreground font-semibold">Next.js</span>,{' '}
              <span className="text-foreground font-semibold">NestJS</span>, and{' '}
              <span className="text-foreground font-semibold">MongoDB</span>.
              Building modern, scalable web applications.
            </motion.p>

            {/* Stats - Clean design */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-4 gap-3 mb-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="text-center p-2.5 rounded-lg bg-card/30 border border-border/30"
                >
                  <div className="text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground font-medium flex items-center justify-center gap-1">
                    {stat.icon}
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-linear-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                View Work <ChevronRight size={16} />
              </button>
              
              <a
                href="/cv"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary/50 transition-all duration-300 flex items-center gap-2"
              >
                <Download size={16} /> CV
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="flex items-center gap-3"
            >
              {[
                { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
                { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:bakkahtransport@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.05 }}
                  className="p-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Profile Image and Tech Stack ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex flex-col items-center justify-center order-1 lg:order-2 min-h/[20rem] sm:min-h/[24rem]"
          >
            {/* Profile Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 mb-6"
            >
              {/* Animated Border Gradient */}
              <div className="absolute inset/[-3px] rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 animate-spin-slow blur-sm" />
              <div className="absolute inset/[-2px] rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 animate-spin-slow" />
              
              {/* Profile Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-background bg-background/10 backdrop-blur-sm flex items-center justify-center">
                {avatarUrl ? (
                  <img
                    src={avatarSrc(avatarUrl)}
                    alt="Muhammad Umar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-6xl select-none">👨‍💻</span>
                )}
              </div>

              {/* Online Status Badge */}
              <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-emerald-500 rounded-full p-1.5 border-2 border-background">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              </div>
            </motion.div>

            {/* Tech Stack Grid */}
            <div className="relative grid grid-cols-2 gap-2 sm:gap-3 p-4 bg-card/20 backdrop-blur-sm rounded-xl border border-border/30 w-full max-w-xs">
              {floatingTech.map((tech, i) => (
                <motion.div
                  key={tech.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg border ${tech.color} backdrop-blur-sm text-xs sm:text-sm`}
                >
                  <span className="text-base sm:text-xl">{tech.icon}</span>
                  <span className="font-medium truncate">{tech.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Decorative rings */}
            <div className="absolute -z-10 w-[20rem] h/[20rem] border border-cyan-500/10 rounded-full animate-spin-slow" />
            <div className="absolute -z-10 w-[16rem] h/[16rem] border border-purple-500/10 rounded-full animate-spin-slower" />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors z-20"
      >
        <span className="text-[8px] font-mono tracking-[0.2em] font-bold uppercase">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </motion.button>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slower {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-slower { animation: spin-slower 25s linear infinite; }
      `}</style>
    </section>
  );
}