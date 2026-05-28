import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Hls from "hls.js";
import { X, ArrowLeft, ArrowRight, Mail, MessageSquare, MapPin } from "lucide-react";

import AnimatedShaderBackground from "./components/ui/animated-shader-hero";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// PROJECTS DATA
// ============================================================================
const projectsData = [
  {
    title: "Wicht Restaurant",
    desc: "Architecture & Interior Design",
    img: "/projects/Wicht Resturant/YK Design Group 1_page-0009.jpg",
    span: "col-span-1 md:col-span-7",
    images: [
      "/projects/Wicht Resturant/YK Design Group 1_page-0009.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0010.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0011.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0012.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0013.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0014.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0015.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0016.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0017.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0018.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0019.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0020.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0021.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0022.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0023.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0024.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0025.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0026.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0027.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0028.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0029.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0031.jpg",
      "/projects/Wicht Resturant/YK Design Group 1_page-0032.jpg"
    ]
  },
  {
    title: "VIP Majles",
    desc: "Architecture & Interior Design",
    img: "/projects/VIP Majles/1.jpg",
    span: "col-span-1 md:col-span-5",
    images: [
      "/projects/VIP Majles/1.jpg",
      "/projects/VIP Majles/2.jpg",
      "/projects/VIP Majles/3.jpg",
      "/projects/VIP Majles/4.jpg",
      "/projects/VIP Majles/5.jpg",
      "/projects/VIP Majles/6.jpg",
      "/projects/VIP Majles/7.jpg",
      "/projects/VIP Majles/8.jpg",
      "/projects/VIP Majles/9.jpg",
      "/projects/VIP Majles/10.jpg",
      "/projects/VIP Majles/11.jpg",
      "/projects/VIP Majles/12.jpg",
      "/projects/VIP Majles/13.jpg",
      "/projects/VIP Majles/14.jpg",
      "/projects/VIP Majles/15.jpg",
      "/projects/VIP Majles/16.jpg",
      "/projects/VIP Majles/17.jpg"
    ]
  },
  {
    title: "Chocolate Store",
    desc: "Architecture & Interior Design",
    img: "/projects/Chocolate Store/YK Design Group 1_page-0033.jpg",
    span: "col-span-1 md:col-span-5",
    images: [
      "/projects/Chocolate Store/YK Design Group 1_page-0033.jpg",
      "/projects/Chocolate Store/YK Design Group 1_page-0034.jpg",
      "/projects/Chocolate Store/YK Design Group 1_page-0035.jpg",
      "/projects/Chocolate Store/YK Design Group 1_page-0036.jpg",
      "/projects/Chocolate Store/YK Design Group 1_page-0037.jpg",
      "/projects/Chocolate Store/YK Design Group 1_page-0038.jpg",
      "/projects/Chocolate Store/YK Design Group 1_page-0039.jpg",
      "/projects/Chocolate Store/YK Design Group 1_page-0040.jpg",
      "/projects/Chocolate Store/YK Design Group 1_page-0041.jpg"
    ]
  },
  {
    title: "Barber Shop",
    desc: "Architecture & Interior Design",
    img: "/projects/Barber Shop/ChatGPT Image May 12, 2026, 04_17_23 PM.png",
    span: "col-span-1 md:col-span-7",
    images: [
      "/projects/Barber Shop/ChatGPT Image May 12, 2026, 04_17_23 PM.png",
      "/projects/Barber Shop/ChatGPT Image May 20, 2026, 04_23_40 PM.png",
      "/projects/Barber Shop/ChatGPT Image May 20, 2026, 04_23_48 PM.png"
    ]
  },
  {
    title: "Luxury Palace",
    desc: "Architecture & Interior Design",
    img: "/projects/Luxury Palace/1.jpg",
    span: "col-span-1 md:col-span-12",
    images: [
      "/projects/Luxury Palace/1.jpg",
      "/projects/Luxury Palace/2.jpg",
      "/projects/Luxury Palace/3.jpg",
      "/projects/Luxury Palace/4.jpg",
      "/projects/Luxury Palace/5.jpg"
    ]
  }
];

// ============================================================================
// LOADING SCREEN
// ============================================================================
// ============================================================================
// LOADING SCREEN (Premium Curtain Split Reveal Transition)
// ============================================================================
function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const frameRef = useRef(0);
  const startTimeRef = useRef(Date.now());
  const rolesRef = useRef(["DRAFT", "DESIGN", "COMPOSE"]);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / 2200, 1);
      const newCount = Math.floor(progress * 100);
      setCount(newCount);

      if (newCount >= 100) {
        setIsExiting(true);
        setTimeout(() => onComplete(), 800);
      } else {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [onComplete]);

  useEffect(() => {
    const roleTimer = setInterval(
      () => setRoleIndex((prev) => (prev + 1) % rolesRef.current.length),
      700
    );
    return () => clearInterval(roleTimer);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden flex">
      {/* Left Shutter Panel */}
      <motion.div
        className="w-1/2 h-full bg-[#030303] flex items-center justify-end border-r border-[#d4af37]/10"
        initial={{ x: 0 }}
        animate={{ x: isExiting ? "-100%" : "0%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
      {/* Right Shutter Panel */}
      <motion.div
        className="w-1/2 h-full bg-[#030303] flex items-center justify-start border-l border-[#d4af37]/10"
        initial={{ x: 0 }}
        animate={{ x: isExiting ? "100%" : "0%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Centered Loading Overlay Content */}
      <AnimatePresence>
        {!isExiting && (
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center z-[10000] pointer-events-auto"
            exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            transition={{ duration: 0.4 }}
          >
            {/* Top-left label */}
            <div className="absolute top-8 left-6 text-xs text-[#d8d2c4] font-semibold uppercase tracking-[0.4em]">
              YK DESIGN GROUP
            </div>

            {/* Center rotating words */}
            <div className="flex flex-col items-center gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-4xl md:text-6xl font-display italic text-[#d8d2c4] tracking-wider"
                >
                  {rolesRef.current[roleIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom-right counter */}
            <div className="absolute bottom-12 right-8 text-5xl md:text-7xl font-display text-text-primary/70 tabular-nums">
              {String(count).padStart(3, "0")}
            </div>

            {/* Micro Gold Loading line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
              <div 
                className="h-full bg-gradient-to-r from-[#d8d2c4] to-[#8a8273] transition-all duration-75"
                style={{ width: `${count}%`, boxShadow: "0 0 10px rgba(216,210,196,0.4)" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// NAVBAR
// ============================================================================
function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ["home", "work", "skills", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveNav(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Work", id: "work" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" }
  ];

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-1.5 py-1.5 sm:px-2 sm:py-2 transition-shadow duration-300 ${
          scrollY > 100 ? "shadow-md shadow-black/20" : ""
        }`}
      >
        {/* Logo */}
        <motion.div
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-[#d8d2c4] to-[#8a8273] p-[2px] cursor-pointer flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          onClick={() => handleScrollTo("home")}
        >
          <div className="w-full h-full rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[11px] sm:text-[13px] font-bold text-text-primary">YK</span>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-1.5 sm:mx-2 hidden md:block" />

        {/* Nav Links */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {navLinks.map((link) => (
            <motion.button
              key={link.id}
              className={`text-[10px] sm:text-xs md:text-sm rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 transition-colors ${
                activeNav === link.id
                  ? "text-text-primary bg-stroke/50"
                  : "text-muted hover:text-text-primary hover:bg-stroke/50"
              }`}
              onClick={() => handleScrollTo(link.id)}
              whileHover={{ scale: 1.05 }}
            >
              {link.label}
            </motion.button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-1.5 sm:mx-2 hidden sm:block" />

        {/* Say Hi Button */}
        <motion.button
          className="relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary overflow-hidden group hidden sm:block"
          whileHover="hover"
          onClick={() => handleScrollTo("contact")}
        >
          <motion.div
            className="absolute inset-0 -inset-[2px] bg-gradient-to-r from-[#d8d2c4] to-[#8a8273] rounded-full opacity-0 group-hover:opacity-100 -z-10"
            variants={{
              hover: { opacity: 1 },
            }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative bg-surface rounded-full px-2 py-1 backdrop-blur-md flex items-center gap-2">
            Say hi <span className="text-[10px]">↗</span>
          </div>
        </motion.button>
      </div>
    </nav>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================
function Hero() {
  const videoRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Interior Designer", "Architect", "Space Composer", "YK Design Founder"];

  useEffect(() => {
  // Set local background video
  if (videoRef.current) {
    videoRef.current.src = "/videos/background.mp4";
    videoRef.current.playbackRate = 0.55; // Slower video speed
    videoRef.current.loop = false; // Disable loop programmatically
  }
}, []);

  useEffect(() => {
    // GSAP entrance animations
    const tl = gsap.timeline();

    tl.to(
      ".name-reveal",
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
      0.1
    ).to(
      ".blur-in",
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      },
      0.3
    );
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/* 1. Full Screen Entry Video Section */}
      <section id="home" className="relative h-[85vh] sm:h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full hero-video"
          style={{ left: "50%", top: "50%" }}
        />

        {/* Subtle Dark Gradient Overlay only at bottom to blend with background */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-black/10" />

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => handleScrollTo("bio")}
        >
          <span className="text-xs text-white/80 uppercase tracking-[0.2em]">
            ENTER PORTFOLIO
          </span>
          <div className="w-px h-10 bg-white/50" />
        </motion.div>
      </section>

      {/* 2. Biography & Intro Section (Below the Video) — with Shader Background */}
      <section id="bio" className="relative py-28 md:py-40 overflow-hidden border-t border-stroke/10">
        {/* Shader Canvas Background */}
        <div className="absolute inset-0 z-0">
          <AnimatedShaderBackground />
        </div>

        {/* Subtle vignette overlay for depth */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-radial-vignette pointer-events-none" />

        {/* Decorative horizontal rule top */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d8d2c4]/30 to-transparent z-[2]"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />

        {/* Main content — above shader */}
        <div className="relative z-[3] max-w-4xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 flex flex-col items-center justify-center gap-10 text-center">

          {/* Corner accent lines */}
          <motion.div
            className="absolute top-8 left-8 w-8 h-8 border-t border-l border-[#d8d2c4]/25"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.div
            className="absolute top-8 right-8 w-8 h-8 border-t border-r border-[#d8d2c4]/25"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          {/* Eyebrow label */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#d8d2c4]/60" />
            <span className="text-[10px] text-[#d8d2c4]/80 font-semibold uppercase tracking-[0.45em]">
              YK DESIGN GROUP
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#d8d2c4]/60" />
          </motion.div>

          {/* Founder Profile Image — now with premium glow ring */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Glow ring behind image */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-b from-[#d8d2c4]/10 to-[#8a8273]/10 blur-xl opacity-70 pointer-events-none" />
            <div className="relative w-36 h-48 sm:w-52 sm:h-72 rounded-2xl overflow-hidden border border-[#d8d2c4]/20 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
              <img
                src="/Personal Image/founder.jpeg"
                alt="Yazan Alkhawandi"
                className="w-full h-full object-cover scale-[1.02] hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle inner vignette on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
            </div>
          </motion.div>

          {/* Name — cinematic reveal */}
          <div className="overflow-hidden">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-display italic leading-[1.05] tracking-wide text-text-primary"
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            >
              Yazan Alkhawandi
            </motion.h1>
          </div>

          {/* Role tagline with animated underline */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-base md:text-xl text-[#d8d2c4]/90 font-light tracking-[0.15em] uppercase">
              Architect & Interior Designer
            </p>
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-[#d8d2c4]/50 to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              style={{ minWidth: "120px" }}
            />
          </motion.div>

          {/* Description — staggered word reveal feel */}
          <motion.p
            className="text-sm md:text-base text-white/50 max-w-2xl mx-auto leading-[2] font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            Crafting quiet, material-led interiors and residences across Riyadh and beyond.
            Working fluently across AutoCAD, Revit, SketchUp and Lumion — blending
            traditional drafting with AI-assisted design to compose spaces that feel
            both inevitable and human.
          </motion.p>

          {/* Stats strip — inline in bio */}
          <motion.div
            className="flex items-center gap-8 md:gap-16 py-6 px-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            {[
              { num: "6+", label: "Years" },
              { num: "50+", label: "Projects" },
              { num: "100%", label: "Satisfaction" }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-2xl md:text-3xl font-display italic text-[#d8d2c4]">{s.num}</span>
                <span className="text-[9px] text-white/40 uppercase tracking-[0.3em]">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-row gap-4 justify-center w-full max-w-sm mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <motion.button
              onClick={() => handleScrollTo("work")}
              className="rounded-full text-xs sm:text-sm px-5 py-3 sm:px-8 sm:py-4 bg-[#d8d2c4] text-bg font-semibold flex-1 text-center shadow-[0_0_25px_rgba(216,210,196,0.2)] hover:shadow-[0_0_35px_rgba(216,210,196,0.35)] transition-shadow duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Work
            </motion.button>
            <motion.button
              onClick={() => handleScrollTo("contact")}
              className="rounded-full text-xs sm:text-sm px-5 py-3 sm:px-8 sm:py-4 border border-[#d8d2c4]/30 bg-white/[0.04] text-[#d8d2c4] font-semibold flex-1 text-center backdrop-blur-sm hover:border-[#d8d2c4]/60 transition-colors duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Me ↗
            </motion.button>
          </motion.div>
        </div>

        {/* Decorative horizontal rule bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d8d2c4]/20 to-transparent z-[2]"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        />
      </section>
    </div>
  );
}

// ============================================================================
// SELECTED WORKS SECTION (Bento Grid)
// ============================================================================
function SelectedWorks({ onSelectProject }) {
  return (
    <section id="work" className="bg-grid py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Selected Work
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display italic mb-4">
            Featured <span className="font-display italic">projects</span>
          </h2>
          <p className="text-muted max-w-xl">
            A curated showcase of quiet, material-led interiors and custom residences designed for elegant living.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projectsData.map((project, idx) => {
            const [coords, setCoords] = useState({ x: 0, y: 0 });
            const [isHovered, setIsHovered] = useState(false);

            const handleMouseMove = (e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setCoords({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
              });
            };

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: idx * 0.1,
                }}
                viewport={{ once: true, margin: "-50px" }}
                className={`${project.span} group relative rounded-3xl overflow-hidden bg-surface border border-stroke aspect-[4/3] cursor-pointer`}
                onClick={() => onSelectProject(project)}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Background Image */}
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Halftone Overlay */}
                <div
                  className="absolute inset-0 opacity-15 mix-blend-multiply"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #000 1px, transparent 1px)",
                    backgroundSize: "4px 4px",
                  }}
                />

                {/* Dynamic Spotlight Effect on Hover */}
                {isHovered && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
                    style={{
                      background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.06), transparent 80%)`
                    }}
                  />
                )}

                {/* Mobile Info Overlay (visible only on mobile) */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-5 pt-12 md:hidden flex flex-col justify-end pointer-events-none">
                  <h3 className="text-xl font-display italic text-text-primary mb-0.5">
                    {project.title}
                  </h3>
                  <p className="text-[10px] text-muted uppercase tracking-wider">
                    {project.desc}
                  </p>
                </div>

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-bg/85 backdrop-blur-md hidden md:flex flex-col items-center justify-center p-6 text-center z-20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h3 
                    className="text-2xl font-display italic text-text-primary mb-2"
                    initial={{ y: 15, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p
                    className="text-xs text-muted mb-6"
                    initial={{ y: 15, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {project.desc}
                  </motion.p>
                  <motion.div
                    className="relative rounded-full bg-text-primary text-bg px-6 py-2.5 text-xs font-medium flex items-center gap-2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    View Gallery ({project.images.length} images) — ↗
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SKILLS SECTION
// ============================================================================
function Skills() {
  const skills = [
    { name: "AutoCAD", icon: "/icons/autocad.png", desc: "Precision drafting and architectural blueprints" },
    { name: "Lumion", icon: "/icons/lumion.png", desc: "Cinematic rendering and environment visualization" },
    { name: "SketchUp", icon: "/icons/sketchup.png", desc: "Detailed 3D spatial modeling and layout design" },
    { name: "Revit", icon: "/icons/revit.png", desc: "Building Information Modeling (BIM) workflows" },
    { name: "AI Design", icon: "/icons/ai.png", desc: "AI-assisted conceptualization and spatial moodboarding" }
  ];

  return (
    <section id="skills" className="bg-grid py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Craft & Capabilities
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display italic mb-4">
            Technical <span className="font-display italic">skills</span>
          </h2>
          <p className="text-muted max-w-xl">
            Blending traditional drafting rigor with modern 3D rendering and generative AI workflows to create beautiful, livable environments.
          </p>
        </motion.div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`group bg-surface/30 hover:bg-surface/75 border border-stroke hover:border-[#89AACC]/40 rounded-3xl p-4 sm:p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 ${
                idx === 4 ? "col-span-2 sm:col-span-1" : "col-span-1"
              }`}
              whileHover={{ y: -6 }}
            >
              {/* Skill Icon */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-bg/50 border border-stroke flex items-center justify-center p-2.5 sm:p-3 mb-3 sm:mb-4 group-hover:scale-110 group-hover:border-[#89AACC]/30 transition-transform duration-300">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
              
              {/* Skill Details */}
              <h3 className="text-xs sm:text-sm font-semibold text-text-primary mb-1 sm:mb-2 group-hover:text-text-primary tracking-wide">
                {skill.name}
              </h3>
              <p className="text-[10px] sm:text-xs text-muted leading-relaxed">
                {skill.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// STATS SECTION
// ============================================================================
function Stats() {
  const stats = [
    { number: "6+", label: "Years Experience" },
    { number: "50+", label: "Completed Projects" },
    { number: "100%", label: "Client Satisfaction" },
  ];

  return (
    <section className="bg-grid py-12 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 lg:px-16">
        <div className="grid grid-cols-3 gap-3 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: idx * 0.1,
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center"
            >
              <motion.div
                className="text-3xl sm:text-5xl md:text-7xl font-display italic text-text-primary mb-1 sm:mb-2"
                whileInView={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              >
                {stat.number}
              </motion.div>
              <p className="text-muted text-[9px] sm:text-xs md:text-sm tracking-wide uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CONTACT & FOOTER
// ============================================================================
function Contact() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    // GSAP Marquee animation
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 35,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  return (
    <section id="contact" className="bg-grid relative min-h-[70vh] w-full overflow-hidden flex flex-col items-center justify-center pt-20 pb-12">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Marquee */}
      <div className="relative z-10 w-full overflow-hidden mb-16 border-y border-stroke/40 py-6 bg-black/30 backdrop-blur-sm">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap text-3xl md:text-5xl font-display italic text-text-primary"
        >
          {Array(10)
            .fill(0)
            .map((_, idx) => (
              <span key={idx} className="mx-8 uppercase tracking-widest">
                YAZAN ALKHAWANDI • ARCHITECTURE & INTERIORS • CREATING SPACES FOR LIFE •
              </span>
            ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-md text-center px-4 mb-12">
        <h2 className="text-3xl md:text-5xl font-display italic mb-2">Let's build together.</h2>
        <p className="text-sm text-muted mb-4">
          Available for residential and commercial interior architecture projects worldwide. Located in Riyadh, Saudi Arabia.
        </p>
        
        {/* Contact Links */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <motion.button
            onClick={() => {
              const email = "yazankh.95@gmail.com";
              const subject = "Contact from Portfolio";
              const body = "Hi Yazan,\n\nI visited your portfolio and would like to get in touch.";
              const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              
              // Copy to clipboard fallback first
              navigator.clipboard.writeText(email).catch(() => {});
              
              // Open mailto client safely
              window.open(mailtoUrl, '_self');
              
              // Notify user via friendly browser alert that email address was copied
              alert("Email address (yazankh.95@gmail.com) has been copied to your clipboard & mail client opened!");
            }}
            className="rounded-full text-sm px-6 py-4 bg-text-primary text-bg font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <Mail size={16} />
            <span>yazankh.95@gmail.com</span>
          </motion.button>
          
          <motion.a
            href="https://wa.me/966534782775"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full text-sm px-6 py-4 border-2 border-stroke bg-bg/40 backdrop-blur-sm text-text-primary font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <MessageSquare size={16} />
            <span>Chat via WhatsApp</span>
          </motion.a>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-8 border-t border-stroke/40 gap-4 text-xs text-muted">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-[#89AACC]" /> Riyadh, KSA
          </span>
          <span className="hidden sm:inline">•</span>
          <span>© 2026 YK Design. All Rights Reserved.</span>
        </div>

        <div className="flex items-center gap-2 bg-surface/30 backdrop-blur-sm border border-stroke rounded-full px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] tracking-wider uppercase">Available for projects</span>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// PREMIUM IMAGE GALLERY MODAL
// ============================================================================
function ProjectModal({ project, onClose }) {
  const [index, setIndex] = useState(0);
  const images = project.images;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Reset index when active project changes
  useEffect(() => {
    setIndex(0);
  }, [project]);

  // Lock body scrolling to prevent background shifting
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const prev = (e) => {
    if (e) e.stopPropagation();
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };
  const next = (e) => {
    if (e) e.stopPropagation();
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  // Close on Escape & switch images with Arrow keys
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, images.length]);

  // Swipe Gesture Handling for Mobile Devices
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) { // Swipe threshold
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-Right Close Button */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {/* Dynamic Image Indicator counter */}
        {images.length > 1 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-widest text-[#89AACC] z-15 border border-white/5 shadow-lg">
            {index + 1} / {images.length}
          </div>
        )}

        {/* Carousel Slider */}
        <div 
          className="modal-slider-container w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="modal-slider-track flex h-full"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((src, idx) => (
              <div className="modal-slide flex-shrink-0 w-full h-full flex items-center justify-center bg-[#050505]" key={idx}>
                <img
                  src={src}
                  alt={`${project.title} ${idx + 1}`}
                  loading={idx === 0 || Math.abs(idx - index) <= 1 ? "eager" : "lazy"}
                  className="max-w-full max-h-[75vh] md:max-h-[80vh] object-contain block pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Details Bar */}
        <div className="p-5 md:p-6 bg-surface border-t border-stroke/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-text-primary tracking-wide">
              {project.title}
            </h3>
            <p className="text-xs text-muted">
              {project.desc}
            </p>
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 sm:self-center">
              <button className="modal-nav flex items-center justify-center w-10 h-10 rounded-full border border-stroke bg-bg/50 hover:bg-stroke text-text-primary transition-colors duration-200" onClick={(e) => prev(e)} aria-label="Previous">
                <ArrowLeft size={18} />
              </button>
              <button className="modal-nav flex items-center justify-center w-10 h-10 rounded-full border border-stroke bg-bg/50 hover:bg-stroke text-text-primary transition-colors duration-200" onClick={(e) => next(e)} aria-label="Next">
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APP
// ============================================================================
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="bg-bg/10 text-text-primary min-h-screen scroll-smooth overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600&family=Playfair+Display:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

        :root {
          --bg: 0 0% 2%;
          --surface: 0 0% 5%;
          --text: 0 0% 98%;
          --muted: 0 0% 60%;
          --stroke: 0 0% 10%;
          --accent-gold: 41 12% 81%; /* Soft Architectural Platinum-Sand HSL #d8d2c4 replacement */
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Montserrat', sans-serif;
          background-color: hsl(var(--bg));
          color: hsl(var(--text));
          overflow-x: hidden;
          letter-spacing: 0.03em;
        }

        .font-body {
          font-family: 'Montserrat', sans-serif;
        }

        .font-display {
          font-family: 'Playfair Display', serif;
        }

        .bg-bg {
          background-color: hsl(var(--bg));
        }

        .bg-surface {
          background-color: hsl(var(--surface));
        }

        .text-text-primary {
          color: hsl(var(--text));
        }

        .text-muted {
          color: hsl(var(--muted));
        }

        .bg-stroke {
          background-color: hsl(var(--stroke));
        }

        .accent-gradient {
          background: linear-gradient(90deg, #d8d2c4 0%, #8a8273 100%);
        }

        .text-gradient {
          background: linear-gradient(90deg, #f0ede6 0%, #d8d2c4 50%, #8a8273 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes scroll-down {
          0%, 100% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(200%);
          }
        }

        .animate-scroll-down {
          animation: scroll-down 1.5s ease-in-out infinite;
        }

        @keyframes role-fade-in {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-role-fade-in {
          animation: role-fade-in 0.4s ease-out;
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease infinite;
        }

        .bg-radial-vignette {
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%);
        }

        html {
          scroll-behavior: smooth;
        }

        /* Project modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          position: relative;
          width: min(100%, 1100px);
          max-height: 90vh;
          border-radius: 24px;
          background: #0a0a0a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
          overflow: hidden;
          animation: scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .modal-slider-container {
          position: relative;
          width: 100%;
          height: 60vh;
          overflow: hidden;
          background: #050505;
        }

        .modal-slider-track {
          display: flex;
          width: 100%;
          height: 100%;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          border: none;
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: hsl(var(--text));
          width: 38px;
          height: 38px;
          border-radius: 50%;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
          transition: transform 0.2s, background 0.2s;
        }

        .modal-close:hover {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 768px) {
          .modal-overlay {
            padding: 0.5rem;
          }
          .modal-content {
            max-height: 95vh;
            border-radius: 16px;
          }
          .modal-slider-container {
            height: 50vh;
          }
        }
      `}</style>

      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <Navbar />
      <Hero />
      <SelectedWorks onSelectProject={(project) => setSelectedProject(project)} />
      <Skills />
      <Contact />

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
