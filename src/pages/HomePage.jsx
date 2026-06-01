/**
 * TeamUp — HomePage.jsx
 * Stack: React + Vite + Bootstrap 5 + Framer Motion + React Icons
 *
 * Install deps (if missing):
 *   npm install bootstrap framer-motion react-icons
 *
 * In main.jsx add:
 *   import 'bootstrap/dist/css/bootstrap.min.css'
 *   import 'bootstrap/dist/js/bootstrap.bundle.min.js'
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiCode, FiUsers, FiFileText, FiShield, FiUser, FiBriefcase,
  FiArrowRight, FiStar, FiGithub, FiTwitter, FiLinkedin,
  FiCheck, FiZap, FiTrendingUp, FiMenu, FiX, FiChevronLeft,
  FiChevronRight, FiMessageSquare, FiTarget, FiCpu, FiLayers,
  FiMail,
} from "react-icons/fi";

/* ─── Global Styles injected once ─────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap');

  :root {
    --tu-violet: #7c3aed;
    --tu-indigo: #4f46e5;
    --tu-violet-light: #ede9fe;
    --tu-violet-mid: #8b5cf6;
    --tu-cyan: #06b6d4;
    --tu-emerald: #10b981;
    --tu-pink: #ec4899;
    --tu-amber: #f59e0b;
    --tu-slate-50: #f8fafc;
    --tu-slate-100: #f1f5f9;
    --tu-slate-200: #e2e8f0;
    --tu-slate-400: #94a3b8;
    --tu-slate-500: #64748b;
    --tu-slate-600: #475569;
    --tu-slate-700: #334155;
    --tu-slate-800: #1e293b;
    --tu-slate-900: #0f172a;
    --tu-gradient: linear-gradient(135deg, var(--tu-violet) 0%, var(--tu-indigo) 100%);
    --tu-gradient-hero: linear-gradient(160deg, #f8fafc 0%, #f0f4ff 50%, #faf5ff 100%);
    --tu-shadow-sm: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
    --tu-shadow: 0 4px 24px rgba(124,58,237,.10);
    --tu-shadow-lg: 0 12px 48px rgba(124,58,237,.18);
    --tu-shadow-xl: 0 24px 64px rgba(124,58,237,.22);
    --tu-radius: 16px;
    --tu-radius-lg: 24px;
    --tu-radius-xl: 32px;
  }

  *, *::before, *::after { box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #ffffff;
    color: var(--tu-slate-800);
    overflow-x: hidden;
  }

  h1,h2,h3,h4,h5,h6 { font-family: 'Outfit', sans-serif; font-weight: 800; }

  /* Gradient text utility */
  .tu-gradient-text {
    background: var(--tu-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Dot grid background */
  .tu-dot-grid {
    background-image: radial-gradient(rgba(79,70,229,.07) 1px, transparent 1px);
    background-size: 30px 30px;
  }

  /* Glass card */
  .tu-glass {
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.9);
  }

  /* Navbar */
  .tu-navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    transition: all .4s ease;
    padding: 14px 0;
  }
  .tu-navbar.scrolled {
    background: rgba(255,255,255,.88) !important;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 1px 32px rgba(0,0,0,.07);
    border-bottom: 1px solid var(--tu-slate-100);
    padding: 10px 0;
  }
  .tu-nav-link {
    font-size: .875rem; font-weight: 600;
    color: var(--tu-slate-600) !important;
    padding: 8px 16px !important;
    border-radius: 10px;
    transition: all .2s;
    text-decoration: none;
  }
  .tu-nav-link:hover { color: var(--tu-violet) !important; background: var(--tu-violet-light); }

  /* Buttons */
  .tu-btn-primary {
    background: var(--tu-gradient);
    color: #fff; font-weight: 700; font-size: .875rem;
    padding: 12px 28px; border-radius: 14px; border: none;
    box-shadow: 0 8px 28px rgba(124,58,237,.30);
    transition: all .25s; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
  }
  .tu-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(124,58,237,.38); color: #fff; }

  .tu-btn-outline {
    background: transparent;
    color: var(--tu-slate-700); font-weight: 700; font-size: .875rem;
    padding: 11px 28px; border-radius: 14px;
    border: 2px solid var(--tu-slate-200);
    transition: all .25s; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
  }
  .tu-btn-outline:hover { border-color: var(--tu-violet-mid); color: var(--tu-violet); background: var(--tu-violet-light); transform: translateY(-2px); }

  .tu-btn-white {
    background: #fff; color: var(--tu-violet);
    font-weight: 700; font-size: .875rem;
    padding: 13px 32px; border-radius: 14px; border: none;
    box-shadow: 0 8px 32px rgba(0,0,0,.12);
    transition: all .25s; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
  }
  .tu-btn-white:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(0,0,0,.18); color: var(--tu-indigo); }

  .tu-btn-ghost {
    background: rgba(255,255,255,.12);
    border: 2px solid rgba(255,255,255,.3);
    color: #fff; font-weight: 700; font-size: .875rem;
    padding: 12px 32px; border-radius: 14px;
    transition: all .25s; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
  }
  .tu-btn-ghost:hover { background: rgba(255,255,255,.22); transform: translateY(-2px); color: #fff; }

  /* Feature card */
  .tu-feature-card {
    background: #fff;
    border: 1.5px solid var(--tu-slate-100);
    border-radius: var(--tu-radius-lg);
    padding: 32px;
    transition: all .35s cubic-bezier(.22,1,.36,1);
    cursor: default; height: 100%;
  }
  .tu-feature-card:hover {
    border-color: #c4b5fd;
    box-shadow: var(--tu-shadow-lg);
    transform: translateY(-8px);
  }
  .tu-feature-card:hover .tu-feature-icon { background: var(--tu-gradient); }
  .tu-feature-card:hover .tu-feature-icon svg { color: #fff !important; }

  .tu-feature-icon {
    width: 52px; height: 52px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px;
    transition: all .3s;
  }

  /* Project card */
  .tu-project-card {
    background: #fff;
    border: 1.5px solid var(--tu-slate-100);
    border-radius: var(--tu-radius-lg);
    overflow: hidden;
    transition: all .35s cubic-bezier(.22,1,.36,1);
    height: 100%;
  }
  .tu-project-card:hover {
    border-color: #c4b5fd;
    box-shadow: var(--tu-shadow-lg);
    transform: translateY(-8px);
  }

  /* Skill badge */
  .tu-skill-badge {
    font-size: 11px; font-weight: 700;
    padding: 4px 12px; border-radius: 8px;
    background: var(--tu-violet-light);
    color: var(--tu-violet);
    border: 1px solid #ddd6fe;
    display: inline-block;
  }

  /* Benefit card */
  .tu-benefit-card {
    background: #fff;
    border: 1.5px solid var(--tu-slate-100);
    border-radius: var(--tu-radius);
    padding: 28px;
    transition: all .3s;
    height: 100%;
  }
  .tu-benefit-card:hover {
    border-color: #c4b5fd;
    box-shadow: var(--tu-shadow);
    transform: translateY(-4px);
  }
  .tu-benefit-card:hover .tu-benefit-icon { background: var(--tu-gradient) !important; }
  .tu-benefit-card:hover .tu-benefit-icon svg { color: #fff !important; }

  .tu-benefit-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: var(--tu-violet-light);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 16px;
    transition: all .3s;
  }

  /* Stat card */
  .tu-stat-card {
    background: linear-gradient(160deg, #faf5ff 0%, #eff6ff 100%);
    border: 1.5px solid #e9d5ff;
    border-radius: var(--tu-radius-lg);
    padding: 36px 24px;
    text-align: center;
    transition: all .3s;
  }
  .tu-stat-card:hover { transform: translateY(-4px); box-shadow: var(--tu-shadow); border-color: #c4b5fd; }

  /* Step card */
  .tu-step-card {
    text-align: center;
    padding: 16px;
    transition: all .3s;
  }
  .tu-step-icon {
    width: 72px; height: 72px; border-radius: 22px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px;
    box-shadow: 0 12px 36px rgba(124,58,237,.25);
    transition: transform .3s;
  }
  .tu-step-card:hover .tu-step-icon { transform: translateY(-6px) scale(1.05); }

  /* Testimonial */
  .tu-testimonial {
    background: linear-gradient(160deg, #faf5ff 0%, #eef2ff 100%);
    border: 1.5px solid #e9d5ff;
    border-radius: var(--tu-radius-xl);
    padding: 48px;
    position: relative;
    overflow: hidden;
  }
  .tu-quote-mark {
    position: absolute; top: 16px; right: 32px;
    font-size: 120px; font-family: Georgia, serif;
    color: #ede9fe; line-height: 1; user-select: none;
  }

  /* Pill tag */
  .tu-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 18px; border-radius: 100px;
    background: var(--tu-violet-light);
    border: 1px solid #ddd6fe;
    font-size: .8rem; font-weight: 700;
    color: var(--tu-violet); letter-spacing: .04em; text-transform: uppercase;
  }

  /* Avatar circle */
  .tu-avatar {
    width: 40px; height: 40px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: .8rem; color: #fff;
    flex-shrink: 0;
  }

  /* Floating card animation - Modern variations */
  @keyframes floatModern1 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-15px) rotate(2deg)} }
  @keyframes floatModern2 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(12px) rotate(-1.5deg)} }
  @keyframes floatModern3 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-8px) scale(1.02)} }
  @keyframes floatModern4 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }
  @keyframes glowPulse { 0%,100%{opacity:0.4;filter:blur(20px)} 50%{opacity:0.8;filter:blur(35px)} }
  @keyframes spinSlow { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
  @keyframes dashOffset { 0%{stroke-dashoffset:0} 100%{stroke-dashoffset:100} }
  @keyframes ripple { 0%{transform:scale(0.8);opacity:0.5} 100%{transform:scale(1.5);opacity:0} }
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes pulseRing { 0%{transform:scale(0.8);opacity:0.6} 100%{transform:scale(1.3);opacity:0} }
  @keyframes slideGlow { 0%{opacity:0;transform:translateX(-20px)} 50%{opacity:1} 100%{opacity:0;transform:translateX(20px)} }

  .float-m1 { animation: floatModern1 4s ease-in-out infinite; }
  .float-m2 { animation: floatModern2 4.5s ease-in-out infinite; }
  .float-m3 { animation: floatModern3 3.8s ease-in-out infinite; }
  .float-m4 { animation: floatModern4 5s ease-in-out infinite; }
  .glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
  .spin-slow { animation: spinSlow 20s linear infinite; }
  .pulse-ring { animation: pulseRing 2s ease-out infinite; }
  .shimmer-text { background: linear-gradient(90deg, #7c3aed, #a78bfa, #7c3aed); background-size: 200% auto; animation: shimmer 3s linear infinite; -webkit-background-clip: text; background-clip: text; color: transparent; }

  /* CTA orbs */
  .cta-orb1 { animation: floatModern1 6s ease-in-out infinite; }
  .cta-orb2 { animation: floatModern2 7s ease-in-out infinite; }

  /* Footer */
  .tu-footer { background: var(--tu-slate-900); color: var(--tu-slate-400); }
  .tu-footer-link {
    color: var(--tu-slate-500); text-decoration: none;
    font-size: .875rem; transition: color .2s;
    display: block; margin-bottom: 10px;
  }
  .tu-footer-link:hover { color: #a78bfa; }
  .tu-social-btn {
    width: 38px; height: 38px; border-radius: 10px;
    background: #1e293b;
    display: flex; align-items: center; justify-content: center;
    color: var(--tu-slate-500); transition: all .2s; text-decoration: none;
  }
  .tu-social-btn:hover { background: var(--tu-violet); color: #fff; transform: translateY(-2px); }

  /* Section spacing */
  .tu-section { padding: 96px 0; }
  .tu-section-sm { padding: 64px 0; }
`;

/* ─── Inject CSS once ──────────────────────────────────────────────────────── */
function GlobalStyles() {
  useEffect(() => {
    const id = "teamup-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => document.getElementById(id)?.remove();
  }, []);
  return null;
}

/* ─── Animated Counter ─────────────────────────────────────────────────────── */
function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const duration = 1800;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(e * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── FadeIn wrapper ───────────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, y = 36, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={{ hidden: { opacity: 0, y }, visible: { opacity: 1, y: 0 } }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -72 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`tu-navbar ${scrolled ? "scrolled" : ""}`}
    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">

          {/* Logo */}
          <div className="d-flex align-items-center gap-2">
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: "var(--tu-gradient)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(124,58,237,.35)",
            }}>
              <FiLayers color="#fff" size={17} />
            </div>
            <span style={{ fontFamily: "Outfit,sans-serif", fontWeight: 900, fontSize: "1.25rem", background: "var(--tu-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              TeamUp
            </span>
          </div>

          {/* Desktop links */}
          <div className="d-none d-md-flex align-items-center gap-1">
            {["Home", "Projects", "Features", "About"].map(l => (
              <a key={l} href="#" className="tu-nav-link">{l}</a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="d-none d-md-flex align-items-center gap-3">
            <a href="/login" className="tu-nav-link">Login</a>
            <a href="/register" className="tu-btn-primary" style={{ padding: "10px 22px" }}>
              Get Started <FiArrowRight size={14} />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="d-md-none btn p-2"
            onClick={() => setOpen(o => !o)}
            style={{ border: "1.5px solid var(--tu-slate-200)", borderRadius: 10, background: "#fff" }}
          >
            {open ? <FiX size={20} color="var(--tu-slate-700)" /> : <FiMenu size={20} color="var(--tu-slate-700)" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: "hidden", borderTop: "1px solid var(--tu-slate-100)", marginTop: 10 }}
            >
              <div className="py-3">
                {["Home", "Projects", "Features", "About"].map(l => (
                  <a key={l} href="#" style={{ display: "block", padding: "10px 4px", fontSize: ".9rem", fontWeight: 600, color: "var(--tu-slate-600)", textDecoration: "none", borderBottom: "1px solid var(--tu-slate-50)" }}>{l}</a>
                ))}
                <div className="d-flex gap-3 mt-3">
                  <a href="#" className="tu-btn-outline flex-fill justify-content-center" style={{ padding: "10px" }}>Login</a>
                  <a href="#" className="tu-btn-primary flex-fill justify-content-center" style={{ padding: "10px" }}>Get Started</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO - Modern Animated Version
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Card data
  const cards = [
    { id: 1, title: "React Developer", status: "Available Now", statusColor: "#22c55e", icon: FiCode, gradient: "linear-gradient(135deg, #eff6ff, #dbeafe)", iconColor: "#3b82f6", position: "top-left", x: 20, y: 40 },
    { id: 2, title: "UI/UX Designer", status: "Open to Collab", statusColor: "#f59e0b", icon: FiUser, gradient: "linear-gradient(135deg, #fdf2f8, #fce7f3)", iconColor: "#ec4899", position: "top-right", x: 20, y: 40 },
    { id: 3, title: "Backend Engineer", status: "Available Now", statusColor: "#22c55e", icon: FiCpu, gradient: "linear-gradient(135deg, #f0fdf4, #dcfce7)", iconColor: "#10b981", position: "bottom-left", x: 20, y: 50 },
    { id: 4, title: "Project Manager", status: "Actively Looking", statusColor: "#3b82f6", icon: FiBriefcase, gradient: "linear-gradient(135deg, #fffbeb, #fef3c7)", iconColor: "#f59e0b", position: "bottom-right", x: 20, y: 50 },
    { id: 5, title: "ML Engineer", status: "Open to Work", statusColor: "#22c55e", icon: FiTarget, gradient: "linear-gradient(135deg, #f3e8ff, #ede9fe)", iconColor: "#7c3aed", position: "center-top", x: 50, y: 120 },
  ];

  const activities = [
    { text: "Applied to AI Project", color: "#7c3aed", delay: 0 },
    { text: "New Team Formed", color: "#10b981", delay: 0.1 },
    { text: "PR Merged 🎉", color: "#f59e0b", delay: 0.2 },
    { text: "Hackathon Winner", color: "#06b6d4", delay: 0.3 },
  ];

  // Helper to get card style based on position
  const getCardStyle = (position, x, y) => {
    switch(position) {
      case "top-left": return { top: y, left: x };
      case "top-right": return { top: y, right: x };
      case "bottom-left": return { bottom: y, left: x };
      case "bottom-right": return { bottom: y, right: x };
      case "center-top": return { top: y, left: `calc(50% - ${x}px)` };
      default: return { top: y, left: x };
    }
  };

  const getCardAnimation = (id) => {
    const animations = ["float-m1", "float-m2", "float-m3", "float-m4", "float-m1"];
    return animations[(id - 1) % animations.length];
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "radial-gradient(ellipse at 20% 30%, #f5f3ff 0%, #eef2ff 40%, #f8fafc 100%)",
        paddingTop: 90,
        paddingBottom: 60,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Animated Gradient Orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div className="glow-pulse" style={{ position: "absolute", top: "-10%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)" }} />
        <div className="glow-pulse" style={{ position: "absolute", bottom: "-10%", right: "-5%", width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)", animationDelay: "1.5s" }} />
        <div className="spin-slow" style={{ position: "absolute", top: "30%", left: "40%", width: 300, height: 300, borderRadius: "50%", border: "1px dashed rgba(124,58,237,0.1)", pointerEvents: "none" }} />
        <div className="spin-slow" style={{ position: "absolute", top: "20%", right: "30%", width: 200, height: 200, borderRadius: "50%", border: "1px dashed rgba(139,92,246,0.08)", pointerEvents: "none", animationDirection: "reverse" }} />
      </div>

      {/* Particle effects */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200]
            }}
            transition={{ 
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut"
            }}
            style={{
              position: "absolute",
              width: 3 + Math.random() * 6,
              height: 3 + Math.random() * 6,
              borderRadius: "50%",
              background: `rgba(124, 58, 237, ${0.3 + Math.random() * 0.4})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center g-4 g-lg-5">

          {/* LEFT COLUMN - Content with modern animations */}
          <div className="col-lg-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Platform Badge with shimmer */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(124, 58, 237, 0.2)",
                  borderRadius: 100,
                  padding: "6px 18px 6px 12px",
                  marginBottom: 24,
                  boxShadow: "0 4px 12px rgba(124,58,237,0.08)",
                  cursor: "pointer",
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 8, height: 8, borderRadius: "50%", background: "#7c3aed", display: "inline-block" }}
                />
                <span style={{ fontSize: ".75rem", fontWeight: 700, background: "linear-gradient(135deg, #7c3aed, #4f46e5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  ✨ Student Collaboration Platform ✨
                </span>
              </motion.div>

              {/* Main Heading with typewriter effect */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, color: "#0f172a" }}
              >
                Build{" "}
                <motion.span
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ backgroundPosition: "100% 50%" }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  style={{
                    background: "linear-gradient(90deg, #7c3aed, #a78bfa, #7c3aed, #4f46e5, #7c3aed)",
                    backgroundSize: "300% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                  }}
                >
                  Amazing
                </motion.span>
                {" "}Projects<br />Together
              </motion.h1>

              {/* Description with fade up */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                style={{ fontSize: "1rem", color: "#475569", lineHeight: 1.7, marginBottom: 32, maxWidth: 500 }}
              >
                Connect with talented developers, designers, and innovators to turn your ideas into successful projects.
              </motion.p>

              {/* CTA Buttons with hover effects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="d-flex flex-wrap gap-3 mb-5"
              >
                <motion.a
                  href="#"
                  className="tu-btn-primary"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  Explore Projects <FiArrowRight size={15} />
                  <motion.div
                    style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.a>
                <motion.a
                  href="#"
                  className="tu-btn-outline"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Create Project
                </motion.a>
              </motion.div>

              {/* Social Proof with staggered animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="d-flex align-items-center gap-4"
              >
                <div className="d-flex">
                  {["#7c3aed", "#4f46e5", "#06b6d4", "#ec4899", "#f59e0b"].map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, x: -10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.05, type: "spring" }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      style={{
                        width: 34, height: 34, borderRadius: 10,
                        background: c,
                        border: "2.5px solid #fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontWeight: 800, fontSize: ".65rem",
                        marginLeft: i > 0 ? -10 : 0,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        cursor: "pointer",
                      }}
                    >
                      {["A", "K", "M", "R", "S"][i]}
                    </motion.div>
                  ))}
                </div>
                <div>
                  <div className="d-flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.85 + i * 0.05 }}
                      >
                        <FiStar size={13} style={{ fill: "#f59e0b", color: "#f59e0b" }} />
                      </motion.div>
                    ))}
                  </div>
                  <p style={{ fontSize: ".75rem", color: "#64748b", margin: 0 }}>
                    <strong style={{ color: "#1e293b" }}>500+</strong> students building together
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - Modern Animated Cards Layout */}
          <div className="col-lg-7 d-none d-lg-block">
            <div style={{ position: "relative", width: "100%", height: 560, margin: "0 auto" }}>
              
              {/* Central Purple Hub Card with ripple effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                className="float-m3"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 210,
                  height: 210,
                  borderRadius: 35,
                  background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 60%, #4338ca 100%)",
                  boxShadow: "0 32px 64px rgba(109, 40, 217, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.15) inset",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                  textAlign: "center",
                  cursor: "pointer",
                }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                {/* Ripple rings */}
                <div className="pulse-ring" style={{ position: "absolute", width: "100%", height: "100%", borderRadius: 35, border: "2px solid rgba(255,255,255,0.3)", pointerEvents: "none" }} />
                <div className="pulse-ring" style={{ position: "absolute", width: "100%", height: "100%", borderRadius: 35, border: "2px solid rgba(255,255,255,0.2)", animationDelay: "0.5s", pointerEvents: "none" }} />
                
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: 52, height: 52, borderRadius: 16,
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(12px)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 12,
                  }}
                >
                  <FiUsers size={24} color="#fff" />
                </motion.div>
                <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>4 Member</p>
                <p style={{ fontSize: ".75rem", color: "rgba(255, 255, 255, 0.75)", margin: "4px 0 16px", fontWeight: 500 }}>Working Together</p>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {[24, 38, 48].map((w, i) => (
                    <motion.div
                      key={i}
                      initial={{ width: 0 }}
                      animate={{ width: w }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                      style={{
                        height: 4, borderRadius: 10,
                        background: `rgba(255, 255, 255, ${0.2 + i * 0.25})`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Card 1: React Developer - Top Left */}
              <motion.div
                initial={{ opacity: 0, x: -50, y: -30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
                className={getCardAnimation(1)}
                style={{
                  position: "absolute", top: 40, left: 20,
                  background: "rgba(255, 255, 255, 0.98)",
                  backdropFilter: "blur(16px)",
                  border: `2px solid ${hoveredCard === 1 ? "#7c3aed" : "rgba(255, 255, 255, 0.8)"}`,
                  borderRadius: 20,
                  padding: "12px 18px 12px 12px",
                  boxShadow: hoveredCard === 1 ? "0 20px 40px rgba(124,58,237,0.15)" : "0 12px 28px rgba(0, 0, 0, 0.06)",
                  display: "flex", alignItems: "center", gap: 12,
                  minWidth: 200, zIndex: 12,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.05 }}
                  style={{
                    width: 44, height: 44, borderRadius: 14,
                    background: "linear-gradient(135deg, #eff6ff, #dbeafe)", border: "1.5px solid #bfdbfe",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <FiCode size={20} color="#3b82f6" />
                </motion.div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: ".9rem", color: "#1e293b", margin: 0 }}>React Developer</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }}
                    />
                    <p style={{ fontSize: ".7rem", color: "#22c55e", margin: 0, fontWeight: 600 }}>Available Now</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: UI/UX Designer - Top Right */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: -30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, type: "spring", stiffness: 200 }}
                className={getCardAnimation(2)}
                style={{
                  position: "absolute", top: 40, right: 20,
                  background: "rgba(255, 255, 255, 0.98)",
                  backdropFilter: "blur(16px)",
                  border: `2px solid ${hoveredCard === 2 ? "#ec4899" : "rgba(255, 255, 255, 0.8)"}`,
                  borderRadius: 20,
                  padding: "12px 18px 12px 12px",
                  boxShadow: hoveredCard === 2 ? "0 20px 40px rgba(236,72,153,0.12)" : "0 12px 28px rgba(0, 0, 0, 0.06)",
                  display: "flex", alignItems: "center", gap: 12,
                  minWidth: 200, zIndex: 12,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={() => setHoveredCard(2)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <motion.div
                  whileHover={{ rotate: -10, scale: 1.05 }}
                  style={{
                    width: 44, height: 44, borderRadius: 14,
                    background: "linear-gradient(135deg, #fdf2f8, #fce7f3)", border: "1.5px solid #fbcfe8",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <FiUser size={20} color="#ec4899" />
                </motion.div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: ".9rem", color: "#1e293b", margin: 0 }}>UI/UX Designer</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                      style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }}
                    />
                    <p style={{ fontSize: ".7rem", color: "#f59e0b", margin: 0, fontWeight: 600 }}>Open to Collab</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Backend Engineer - Bottom Left */}
              <motion.div
                initial={{ opacity: 0, x: -50, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 }}
                className={getCardAnimation(3)}
                style={{
                  position: "absolute", bottom: 50, left: 20,
                  background: "rgba(255, 255, 255, 0.98)",
                  backdropFilter: "blur(16px)",
                  border: `2px solid ${hoveredCard === 3 ? "#10b981" : "rgba(255, 255, 255, 0.8)"}`,
                  borderRadius: 20,
                  padding: "12px 18px 12px 12px",
                  boxShadow: hoveredCard === 3 ? "0 20px 40px rgba(16,185,129,0.12)" : "0 12px 28px rgba(0, 0, 0, 0.06)",
                  display: "flex", alignItems: "center", gap: 12,
                  minWidth: 210, zIndex: 12,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={() => setHoveredCard(3)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.05 }}
                  style={{
                    width: 44, height: 44, borderRadius: 14,
                    background: "linear-gradient(135deg, #f0fdf4, #dcfce7)", border: "1.5px solid #a7f3d0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <FiCpu size={20} color="#10b981" />
                </motion.div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: ".9rem", color: "#1e293b", margin: 0 }}>Backend Engineer</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                      style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }}
                    />
                    <p style={{ fontSize: ".7rem", color: "#22c55e", margin: 0, fontWeight: 600 }}>Available Now</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 4: Project Manager - Bottom Right */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, type: "spring", stiffness: 200 }}
                className={getCardAnimation(4)}
                style={{
                  position: "absolute", bottom: 50, right: 20,
                  background: "rgba(255, 255, 255, 0.98)",
                  backdropFilter: "blur(16px)",
                  border: `2px solid ${hoveredCard === 4 ? "#f59e0b" : "rgba(255, 255, 255, 0.8)"}`,
                  borderRadius: 20,
                  padding: "12px 18px 12px 12px",
                  boxShadow: hoveredCard === 4 ? "0 20px 40px rgba(245,158,11,0.12)" : "0 12px 28px rgba(0, 0, 0, 0.06)",
                  display: "flex", alignItems: "center", gap: 12,
                  minWidth: 200, zIndex: 12,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={() => setHoveredCard(4)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <motion.div
                  whileHover={{ rotate: -10, scale: 1.05 }}
                  style={{
                    width: 44, height: 44, borderRadius: 14,
                    background: "linear-gradient(135deg, #fffbeb, #fef3c7)", border: "1.5px solid #fde68a",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <FiBriefcase size={20} color="#f59e0b" />
                </motion.div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: ".9rem", color: "#1e293b", margin: 0 }}>Project Manager</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
                      style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", display: "inline-block" }}
                    />
                    <p style={{ fontSize: ".7rem", color: "#3b82f6", margin: 0, fontWeight: 600 }}>Actively Looking</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 5: ML Engineer - Extra card floating near top center */}
              <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 300 }}
                className={getCardAnimation(5)}
                style={{
                  position: "absolute", top: 120, left: "50%", transform: "translateX(-50%)",
                  background: "rgba(255, 255, 255, 0.97)",
                  backdropFilter: "blur(12px)",
                  border: `2px solid ${hoveredCard === 5 ? "#7c3aed" : "rgba(255, 255, 255, 0.7)"}`,
                  borderRadius: 16,
                  padding: "8px 16px 8px 10px",
                  boxShadow: hoveredCard === 5 ? "0 12px 28px rgba(124,58,237,0.12)" : "0 8px 20px rgba(0, 0, 0, 0.05)",
                  display: "flex", alignItems: "center", gap: 10,
                  zIndex: 11,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={() => setHoveredCard(5)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  style={{
                    width: 36, height: 36, borderRadius: 12,
                    background: "linear-gradient(135deg, #f3e8ff, #ede9fe)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <FiTarget size={16} color="#7c3aed" />
                </motion.div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: ".8rem", color: "#1e293b", margin: 0 }}>ML Engineer</p>
                  <p style={{ fontSize: ".65rem", color: "#22c55e", margin: 0, fontWeight: 600 }}>Open to Work</p>
                </div>
              </motion.div>

              {/* Recent Activity Panel with staggered entry */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="float-m2"
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 20,
                  transform: "translateY(-50%)",
                  background: "rgba(255, 255, 255, 0.97)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.9)",
                  borderRadius: 20,
                  padding: "16px 20px",
                  boxShadow: "0 16px 32px rgba(0, 0, 0, 0.06)",
                  minWidth: 170,
                  zIndex: 13,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{ width: 4, height: 4, borderRadius: "50%", background: "#7c3aed" }}
                  />
                  <p style={{
                    fontSize: ".65rem", fontWeight: 800, color: "#94a3b8",
                    letterSpacing: ".1em", textTransform: "uppercase", margin: 0,
                  }}>
                    RECENT ACTIVITY
                  </p>
                </div>
                {activities.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.08 }}
                    style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i < 3 ? 10 : 0 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                      style={{ width: 6, height: 6, borderRadius: "50%", background: item.color, flexShrink: 0 }}
                    />
                    <p style={{ fontSize: ".78rem", fontWeight: 500, color: "#475569", margin: 0 }}>{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Animated Connecting Lines */}
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 5, pointerEvents: "none", overflow: "visible" }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.05" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                <motion.line
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  x1="220" y1="82" x2="320" y2="240"
                  stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4,5"
                  filter="url(#glow)"
                />
                <motion.line
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.85 }}
                  x1="580" y1="82" x2="480" y2="240"
                  stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4,5"
                  filter="url(#glow)"
                />
                <motion.line
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  x1="220" y1="500" x2="320" y2="340"
                  stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4,5"
                  filter="url(#glow)"
                />
                <motion.line
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.95 }}
                  x1="580" y1="500" x2="480" y2="340"
                  stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4,5"
                  filter="url(#glow)"
                />
                <motion.line
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  x1="400" y1="155" x2="380" y2="260"
                  stroke="url(#lineGrad)" strokeWidth="1.2" strokeDasharray="3,5"
                  filter="url(#glow)"
                />
                <motion.line
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.05 }}
                  x1="580" y1="280" x2="500" y2="290"
                  stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4,5"
                  filter="url(#glow)"
                />
              </svg>

              {/* Floating decorative dots */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0] }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, repeatDelay: Math.random() * 3 }}
                  style={{
                    position: "absolute",
                    width: 4 + Math.random() * 4,
                    height: 4 + Math.random() * 4,
                    borderRadius: "50%",
                    background: `rgba(124, 58, 237, ${0.3 + Math.random() * 0.4})`,
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    zIndex: 6,
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS
═══════════════════════════════════════════════════════════════════════════ */
function Stats() {
  const stats = [
    { val: 500, suffix: "+", label: "Active Users" },
    { val: 100, suffix: "+", label: "Projects Created" },
    { val: 300, suffix: "+", label: "Applications Sent" },
    { val: 50, suffix: "+", label: "Teams Formed" },
  ];
  const tags = ["Students", "Hackathon Teams", "Open Source Contributors", "Startup Builders"];

  return (
    <section className="tu-section-sm" style={{ background: "#fff" }}>
      <div className="container">
        <FadeIn className="text-center mb-5">
          <p style={{ fontSize: ".78rem", fontWeight: 700, color: "var(--tu-violet)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14 }}>Trusted By</p>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {tags.map(t => (
              <span key={t} style={{
                padding: "8px 20px", borderRadius: 100,
                background: "var(--tu-slate-50)", border: "1.5px solid var(--tu-slate-200)",
                fontSize: ".85rem", fontWeight: 600, color: "var(--tu-slate-600)", cursor: "default",
                transition: "all .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--tu-violet-light)"; e.currentTarget.style.borderColor = "#c4b5fd"; e.currentTarget.style.color = "var(--tu-violet)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--tu-slate-50)"; e.currentTarget.style.borderColor = "var(--tu-slate-200)"; e.currentTarget.style.color = "var(--tu-slate-600)"; }}
              >{t}</span>
            ))}
          </div>
        </FadeIn>

        <div className="row g-4">
          {stats.map((s, i) => (
            <div key={i} className="col-6 col-lg-3">
              <FadeIn delay={i * 0.1}>
                <div className="tu-stat-card">
                  <p className="tu-gradient-text" style={{ fontFamily: "Outfit,sans-serif", fontSize: "3rem", fontWeight: 900, margin: 0 }}>
                    <Counter target={s.val} suffix={s.suffix} />
                  </p>
                  <p style={{ fontSize: ".875rem", fontWeight: 600, color: "var(--tu-slate-500)", margin: 0, marginTop: 6 }}>{s.label}</p>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURES
═══════════════════════════════════════════════════════════════════════════ */
function Features() {
  const features = [
    { icon: FiLayers, title: "Create Projects", desc: "Launch your project idea with a brief, required skills, and team size goals.", iconBg: "#ede9fe", iconColor: "var(--tu-violet)" },
    { icon: FiUsers, title: "Find Team Members", desc: "Browse students filtered by tech stack, role, and availability in seconds.", iconBg: "#e0f2fe", iconColor: "#0284c7" },
    { icon: FiFileText, title: "Project Applications", desc: "Receive and manage applications with a clean dashboard and notifications.", iconBg: "#d1fae5", iconColor: "#059669" },
    { icon: FiShield, title: "Secure Authentication", desc: "Enterprise-grade JWT security keeps your profile and project data safe.", iconBg: "#fce7f3", iconColor: "#db2777" },
    { icon: FiUser, title: "Profile Management", desc: "Showcase your skills, GitHub, and tech stack in a beautiful profile page.", iconBg: "#fef3c7", iconColor: "#d97706" },
    { icon: FiBriefcase, title: "Team Recruitment", desc: "Post open roles, define requirements, and build your dream team effortlessly.", iconBg: "#f3e8ff", iconColor: "#7c3aed" },
  ];

  return (
    <section id="features" className="tu-section" style={{ background: "linear-gradient(180deg, #fff 0%, var(--tu-slate-50) 100%)" }}>
      <div className="container">
        <FadeIn className="text-center mb-5" style={{ maxWidth: 600, margin: "0 auto 56px" }}>
          <span className="tu-pill mb-3">Platform Features</span>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "var(--tu-slate-900)", marginBottom: 16 }}>
            Everything you need to{" "}
            <span className="tu-gradient-text">collaborate</span>
          </h2>
          <p style={{ color: "var(--tu-slate-500)", fontSize: "1.05rem" }}>
            Built for student teams, hackathons, and startup builders.
          </p>
        </FadeIn>

        <div className="row g-4">
          {features.map((f, i) => (
            <div key={i} className="col-md-6 col-lg-4">
              <FadeIn delay={i * 0.08}>
                <div className="tu-feature-card">
                  <div className="tu-feature-icon" style={{ background: f.iconBg }}>
                    <f.icon size={24} color={f.iconColor} />
                  </div>
                  <h5 style={{ fontWeight: 800, color: "var(--tu-slate-800)", marginBottom: 10 }}>{f.title}</h5>
                  <p style={{ fontSize: ".9rem", color: "var(--tu-slate-500)", margin: 0, lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOW IT WORKS
═══════════════════════════════════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { num: "01", icon: FiTarget, title: "Create a Project", desc: "Post your idea with required skills, roles, and timeline.", grad: "135deg, #7c3aed, #4f46e5" },
    { num: "02", icon: FiUsers, title: "Recruit Members", desc: "Your project surfaces to students matching your skill needs.", grad: "135deg, #4f46e5, #06b6d4" },
    { num: "03", icon: FiFileText, title: "Review Applications", desc: "Compare profiles, skills, and GitHub links to pick the best fit.", grad: "135deg, #06b6d4, #10b981" },
    { num: "04", icon: FiZap, title: "Build Together", desc: "Assemble your team and start building with full momentum.", grad: "135deg, #10b981, #059669" },
  ];

  return (
    <section className="tu-section" style={{ background: "var(--tu-slate-50)" }}>
      <div className="container">
        <FadeIn className="text-center mb-5" style={{ maxWidth: 560, margin: "0 auto 56px" }}>
          <span className="tu-pill mb-3">How It Works</span>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "var(--tu-slate-900)" }}>
            From idea to team in{" "}
            <span className="tu-gradient-text">4 steps</span>
          </h2>
        </FadeIn>

        <div className="row g-4 position-relative">
          <div className="d-none d-lg-block" style={{ position: "absolute", top: 36, left: "12.5%", right: "12.5%", height: 2, background: "linear-gradient(90deg,#7c3aed,#06b6d4)", opacity: .15, zIndex: 0 }} />

          {steps.map((s, i) => (
            <div key={i} className="col-sm-6 col-lg-3">
              <FadeIn delay={i * 0.12}>
                <div className="tu-step-card" style={{ position: "relative", zIndex: 1 }}>
                  <div className="tu-step-icon" style={{ background: `linear-gradient(${s.grad})` }}>
                    <s.icon size={28} color="#fff" />
                  </div>
                  <p style={{ fontSize: ".72rem", fontWeight: 800, color: "var(--tu-slate-300)", letterSpacing: ".12em", marginBottom: 8 }}>{s.num}</p>
                  <h5 style={{ fontWeight: 800, color: "var(--tu-slate-800)", marginBottom: 10 }}>{s.title}</h5>
                  <p style={{ fontSize: ".875rem", color: "var(--tu-slate-500)", margin: 0, lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURED PROJECTS
═══════════════════════════════════════════════════════════════════════════ */
function FeaturedProjects() {
  const projects = [
    { title: "AI Resume Analyzer", desc: "ML-powered resume scoring with skill gap analysis and ATS optimization.", skills: ["Python", "React", "TensorFlow"], team: 4, bar: "linear-gradient(90deg,#7c3aed,#4f46e5)", open: true },
    { title: "Hospital Management", desc: "Full-stack system for patient records, appointments, and billing workflows.", skills: ["Node.js", "MongoDB", "React"], team: 5, bar: "linear-gradient(90deg,#06b6d4,#3b82f6)", open: true },
    { title: "Smart Learning Platform", desc: "Adaptive quiz engine with progress tracking and personalized roadmaps.", skills: ["Next.js", "PostgreSQL", "AI"], team: 3, bar: "linear-gradient(90deg,#10b981,#06b6d4)", open: false },
    { title: "Startup Launch Platform", desc: "Landing page builder with built-in waitlist, analytics, and email capture.", skills: ["React", "Stripe", "Firebase"], team: 4, bar: "linear-gradient(90deg,#f59e0b,#ef4444)", open: true },
  ];

  return (
    <section className="tu-section" style={{ background: "#fff" }}>
      <div className="container">
        <FadeIn className="text-center mb-5" style={{ maxWidth: 600, margin: "0 auto 56px" }}>
          <span className="tu-pill mb-3">Featured Projects</span>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "var(--tu-slate-900)", marginBottom: 16 }}>
            Join an exciting{" "}
            <span className="tu-gradient-text">project</span>
          </h2>
          <p style={{ color: "var(--tu-slate-500)", fontSize: "1.05rem" }}>Hand-picked projects actively looking for collaborators.</p>
        </FadeIn>

        <div className="row g-4">
          {projects.map((p, i) => (
            <div key={i} className="col-sm-6 col-lg-3">
              <FadeIn delay={i * 0.1}>
                <div className="tu-project-card">
                  <div style={{ height: 5, background: p.bar }} />
                  <div className="p-4 d-flex flex-column" style={{ height: "calc(100% - 5px)" }}>
                    <div className="d-flex align-items-start justify-content-between mb-3">
                      <h6 style={{ fontWeight: 800, color: "var(--tu-slate-800)", fontSize: ".9rem", margin: 0, lineHeight: 1.3 }}>{p.title}</h6>
                      {p.open && (
                        <span style={{ fontSize: ".68rem", fontWeight: 800, background: "#d1fae5", color: "#065f46", border: "1px solid #a7f3d0", borderRadius: 6, padding: "3px 9px", whiteSpace: "nowrap", marginLeft: 8 }}>OPEN</span>
                      )}
                    </div>
                    <p style={{ fontSize: ".83rem", color: "var(--tu-slate-500)", lineHeight: 1.65, flexGrow: 1, marginBottom: 14 }}>{p.desc}</p>
                    <div className="d-flex flex-wrap gap-1 mb-4">
                      {p.skills.map(s => <span key={s} className="tu-skill-badge">{s}</span>)}
                    </div>
                    <div className="d-flex align-items-center justify-content-between pt-3" style={{ borderTop: "1px solid var(--tu-slate-100)" }}>
                      <div className="d-flex align-items-center gap-1" style={{ fontSize: ".78rem", color: "var(--tu-slate-400)" }}>
                        <FiUsers size={13} /> Team of {p.team}
                      </div>
                      <button
                        className="tu-btn-primary"
                        style={{ padding: "7px 16px", fontSize: ".78rem", borderRadius: 10 }}
                        onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                        onMouseLeave={e => e.currentTarget.style.transform = ""}
                      >
                        Apply →
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   WHY TEAMUP
═══════════════════════════════════════════════════════════════════════════ */
function WhyTeamUp() {
  const benefits = [
    { icon: FiZap, title: "Faster Team Formation", desc: "Find teammates in hours with smart skill-based filtering.", badge: "10× faster" },
    { icon: FiMessageSquare, title: "Better Collaboration", desc: "Unified application system keeps recruitment clean and clear.", badge: "Zero friction" },
    { icon: FiTrendingUp, title: "Organized Recruitment", desc: "Review all applicants in one dashboard. Decide with clarity.", badge: "100% organized" },
    { icon: FiShield, title: "Secure Platform", desc: "JWT-protected routes and privacy-first design baked in.", badge: "Enterprise grade" },
  ];

  const tags = ["MERN Stack", "Fully Responsive", "Open Source Friendly", "Placement Ready"];

  return (
    <section className="tu-section" style={{ background: "linear-gradient(180deg, var(--tu-slate-50) 0%, #fff 100%)" }}>
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-5">
            <FadeIn>
              <span className="tu-pill mb-4" style={{ display: "inline-flex" }}>Why TeamUp</span>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "var(--tu-slate-900)", marginBottom: 20 }}>
                Collaboration, reimagined for{" "}
                <span className="tu-gradient-text">students</span>
              </h2>
              <p style={{ color: "var(--tu-slate-500)", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: 28 }}>
                Stop searching LinkedIn for teammates. TeamUp is purpose-built for student project discovery, skill-based matching, and seamless team formation.
              </p>
              <div className="d-flex flex-wrap gap-2">
                {tags.map(t => (
                  <span key={t} style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: "#fff", border: "1.5px solid var(--tu-slate-200)",
                    borderRadius: 12, padding: "8px 16px",
                    fontSize: ".82rem", fontWeight: 700, color: "var(--tu-slate-700)",
                  }}>
                    <FiCheck size={14} color="var(--tu-violet)" /> {t}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="col-lg-7">
            <div className="row g-4">
              {benefits.map((b, i) => (
                <div key={i} className="col-sm-6">
                  <FadeIn delay={i * 0.1}>
                    <div className="tu-benefit-card">
                      <div className="tu-benefit-icon">
                        <b.icon size={20} color="var(--tu-violet)" className="benefit-icon-svg" />
                      </div>
                      <span style={{ fontSize: ".7rem", fontWeight: 800, color: "var(--tu-violet)", letterSpacing: ".08em", textTransform: "uppercase" }}>{b.badge}</span>
                      <h6 style={{ fontWeight: 800, color: "var(--tu-slate-800)", marginTop: 6, marginBottom: 8 }}>{b.title}</h6>
                      <p style={{ fontSize: ".83rem", color: "var(--tu-slate-500)", margin: 0, lineHeight: 1.65 }}>{b.desc}</p>
                    </div>
                  </FadeIn>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════════════════════════════════════════ */
function Testimonials() {
  const list = [
    { name: "Aryan Sharma", role: "Final Year, IIT Delhi", init: "AS", color: "var(--tu-gradient)", quote: "TeamUp helped me find two amazing developers for my AI project in just 3 days. The application flow is incredibly smooth — we launched our MVP in 6 weeks." },
    { name: "Priya Nair", role: "Full Stack Developer", init: "PN", color: "linear-gradient(135deg,#ec4899,#f43f5e)", quote: "I applied to 3 projects through TeamUp and got accepted into a startup team building a health-tech platform. Best career move I've made as a student." },
    { name: "Kabir Mehta", role: "UI/UX Designer, NIT", init: "KM", color: "linear-gradient(135deg,#10b981,#06b6d4)", quote: "As a designer, I always struggled to find technical co-founders. TeamUp's skill matching changed everything. Now I'm part of a 5-person hackathon team." },
  ];
  const [active, setActive] = useState(0);
  const prev = () => setActive(a => (a - 1 + list.length) % list.length);
  const next = () => setActive(a => (a + 1) % list.length);

  return (
    <section className="tu-section" style={{ background: "#fff" }}>
      <div className="container">
        <FadeIn className="text-center mb-5" style={{ maxWidth: 560, margin: "0 auto 56px" }}>
          <span className="tu-pill mb-3">Testimonials</span>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "var(--tu-slate-900)" }}>
            Loved by{" "}
            <span className="tu-gradient-text">builders</span>
          </h2>
        </FadeIn>

        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.38 }}
              className="tu-testimonial"
            >
              <div className="tu-quote-mark">"</div>
              <div className="d-flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <FiStar key={i} size={18} style={{ fill: "#f59e0b", color: "#f59e0b" }} />)}
              </div>
              <p style={{ fontSize: "clamp(1.05rem,2vw,1.25rem)", color: "var(--tu-slate-700)", fontWeight: 500, lineHeight: 1.75, marginBottom: 32, position: "relative", zIndex: 1 }}>
                {list[active].quote}
              </p>
              <div className="d-flex align-items-center gap-3">
                <div className="tu-avatar" style={{ background: list[active].color, width: 48, height: 48, borderRadius: 14, fontSize: ".85rem" }}>
                  {list[active].init}
                </div>
                <div>
                  <p style={{ fontWeight: 800, color: "var(--tu-slate-800)", margin: 0 }}>{list[active].name}</p>
                  <p style={{ fontSize: ".82rem", color: "var(--tu-slate-500)", margin: 0 }}>{list[active].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="d-flex align-items-center justify-content-center gap-3 mt-5">
            <button onClick={prev} style={{ width: 40, height: 40, borderRadius: 12, border: "1.5px solid var(--tu-slate-200)", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--tu-violet)"; e.currentTarget.style.color = "var(--tu-violet)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tu-slate-200)"; e.currentTarget.style.color = ""; }}>
              <FiChevronLeft size={18} />
            </button>
            {list.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{ height: 8, width: i === active ? 28 : 8, borderRadius: 100, border: "none", background: i === active ? "var(--tu-violet)" : "var(--tu-slate-200)", cursor: "pointer", transition: "all .3s" }} />
            ))}
            <button onClick={next} style={{ width: 40, height: 40, borderRadius: 12, border: "1.5px solid var(--tu-slate-200)", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--tu-violet)"; e.currentTarget.style.color = "var(--tu-violet)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tu-slate-200)"; e.currentTarget.style.color = ""; }}>
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA
═══════════════════════════════════════════════════════════════════════════ */
function CTA() {
  return (
    <section className="tu-section" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #5b21b6 0%, #4338ca 50%, #3730a3 100%)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="cta-orb1" style={{ position: "absolute", top: "-20%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,.5) 0%, transparent 65%)" }} />
      <div className="cta-orb2" style={{ position: "absolute", bottom: "-20%", right: "10%", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,.5) 0%, transparent 65%)" }} />

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <FadeIn className="text-center" style={{ maxWidth: 680, margin: "0 auto" }}>
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)",
              borderRadius: 100, padding: "7px 18px", marginBottom: 28,
            }}
          >
            <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            <span style={{ fontSize: ".78rem", fontWeight: 700, color: "rgba(255,255,255,.85)", letterSpacing: ".06em", textTransform: "uppercase" }}>Open for collaborations</span>
          </motion.div>

          <h2 style={{ fontSize: "clamp(2.2rem,5vw,3.6rem)", fontWeight: 900, color: "#fff", marginBottom: 20, lineHeight: 1.1 }}>
            Ready to Build Your{" "}
            <span style={{ color: "#c4b5fd" }}>Dream Team?</span>
          </h2>
          <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,.72)", marginBottom: 40, lineHeight: 1.7 }}>
            Join 500+ students already building the next generation of tech products together.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <a href="#" className="tu-btn-white">
              Start a Project <FiArrowRight size={16} />
            </a>
            <a href="#" className="tu-btn-ghost">
              Join a Team
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════════════════ */
function Footer() {
  const platformLinks = ["Projects", "Features", "Teams", "Applications"];
  const companyLinks = ["About", "Contact", "Privacy Policy", "Terms of Service"];

  return (
    <footer className="tu-footer" style={{ paddingTop: 64, paddingBottom: 40 }}>
      <div className="container">
        <div className="row g-5 mb-5">
          <div className="col-lg-5">
            <div className="d-flex align-items-center gap-2 mb-4">
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--tu-gradient)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FiLayers size={16} color="#fff" />
              </div>
              <span style={{ fontFamily: "Outfit,sans-serif", fontWeight: 900, fontSize: "1.15rem", color: "#fff" }}>TeamUp</span>
            </div>
            <p style={{ fontSize: ".875rem", lineHeight: 1.75, maxWidth: 320, color: "#64748b", marginBottom: 24 }}>
              The student project collaboration platform for builders, dreamers, and innovators.
            </p>
            <div className="d-flex gap-2">
              {[FiGithub, FiLinkedin, FiTwitter].map((Icon, i) => (
                <a key={i} href="#" className="tu-social-btn"><Icon size={16} /></a>
              ))}
            </div>
          </div>

          <div className="col-6 col-lg-3 offset-lg-1">
            <p style={{ fontWeight: 700, color: "#fff", fontSize: ".875rem", marginBottom: 18, letterSpacing: ".04em" }}>Platform</p>
            {platformLinks.map(l => <a key={l} href="#" className="tu-footer-link">{l}</a>)}
          </div>

          <div className="col-6 col-lg-3">
            <p style={{ fontWeight: 700, color: "#fff", fontSize: ".875rem", marginBottom: 18, letterSpacing: ".04em" }}>Company</p>
            {companyLinks.map(l => <a key={l} href="#" className="tu-footer-link">{l}</a>)}
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between pt-4" style={{ borderTop: "1px solid #1e293b", gap: 12 }}>
          <p style={{ fontSize: ".78rem", color: "#334155", margin: 0 }}>© 2025 TeamUp. Built with ❤️ for student builders.</p>
          <p style={{ fontSize: ".78rem", color: "#334155", margin: 0 }}>React + Vite · Bootstrap 5 · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <FeaturedProjects />
        <WhyTeamUp />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}