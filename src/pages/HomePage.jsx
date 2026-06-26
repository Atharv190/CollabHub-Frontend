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

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiCode, FiUsers, FiFileText, FiShield, FiUser, FiBriefcase,
  FiArrowRight, FiStar, FiGithub, FiTwitter, FiLinkedin,
  FiCheck, FiZap, FiTrendingUp, FiMenu, FiX, FiChevronLeft,
  FiChevronRight, FiMessageSquare, FiTarget, FiCpu, FiLayers,
} from "react-icons/fi";

/* ─── Global Styles ────────────────────────────────────────────────────────── */
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

  .tu-gradient-text {
    background: var(--tu-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .tu-dot-grid {
    background-image: radial-gradient(rgba(79,70,229,.07) 1px, transparent 1px);
    background-size: 30px 30px;
  }

  /* Navbar */
  .tu-navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    transition: all .4s ease;
    padding: 14px 0;
  }
  .tu-navbar.scrolled {
    background: rgba(255,255,255,.96) !important;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 1px 32px rgba(0,0,0,.07);
    border-bottom: 1px solid var(--tu-slate-100);
    padding: 10px 0;
  }
  .tu-nav-link {
    font-size: .875rem; font-weight: 600;
    color: var(--tu-slate-600) !important;
    padding: 10px 16px !important;
    border-radius: 10px;
    transition: background .2s, color .2s;
    text-decoration: none;
    display: block;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
  }
  .tu-nav-link:hover,
  .tu-nav-link:active { color: var(--tu-violet) !important; background: var(--tu-violet-light); }

  /* Mobile menu drawer */
  .tu-mobile-menu {
    overflow: hidden;
    background: #fff;
    border-top: 1px solid var(--tu-slate-100);
    margin-top: 8px;
    border-radius: 0 0 16px 16px;
    box-shadow: 0 16px 40px rgba(0,0,0,.08);
  }
  .tu-mobile-nav-link {
    display: block;
    padding: 14px 16px;
    font-size: .95rem;
    font-weight: 600;
    color: var(--tu-slate-700);
    text-decoration: none;
    border-bottom: 1px solid var(--tu-slate-50);
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    transition: background .15s, color .15s;
    min-height: 48px;
    display: flex;
    align-items: center;
  }
  .tu-mobile-nav-link:active { background: var(--tu-violet-light); color: var(--tu-violet); }

  /* Hamburger button */
  .tu-hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    border: 1.5px solid var(--tu-slate-200);
    background: #fff;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    transition: background .15s, border-color .15s;
    padding: 0;
    outline: none;
  }
  .tu-hamburger:active { background: var(--tu-violet-light); border-color: #c4b5fd; }

  /* Buttons — touch-optimized */
  .tu-btn-primary {
    background: var(--tu-gradient);
    color: #fff; font-weight: 700; font-size: .875rem;
    padding: 13px 28px; border-radius: 14px; border: none;
    box-shadow: 0 8px 28px rgba(124,58,237,.30);
    transition: box-shadow .25s, transform .25s;
    cursor: pointer; text-decoration: none;
    display: inline-flex; align-items: center; gap: 8px;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    min-height: 48px;
    user-select: none;
  }
  .tu-btn-primary:hover { box-shadow: 0 14px 36px rgba(124,58,237,.38); color: #fff; }
  .tu-btn-primary:active { transform: scale(0.97); color: #fff; }

  .tu-btn-outline {
    background: transparent;
    color: var(--tu-slate-700); font-weight: 700; font-size: .875rem;
    padding: 12px 28px; border-radius: 14px;
    border: 2px solid var(--tu-slate-200);
    transition: all .25s;
    cursor: pointer; text-decoration: none;
    display: inline-flex; align-items: center; gap: 8px;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    min-height: 48px;
    user-select: none;
  }
  .tu-btn-outline:hover { border-color: var(--tu-violet-mid); color: var(--tu-violet); background: var(--tu-violet-light); }
  .tu-btn-outline:active { transform: scale(0.97); }

  .tu-btn-white {
    background: #fff; color: var(--tu-violet);
    font-weight: 700; font-size: .875rem;
    padding: 13px 32px; border-radius: 14px; border: none;
    box-shadow: 0 8px 32px rgba(0,0,0,.12);
    transition: box-shadow .25s, transform .25s;
    cursor: pointer; text-decoration: none;
    display: inline-flex; align-items: center; gap: 8px;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    min-height: 48px;
    user-select: none;
  }
  .tu-btn-white:hover { box-shadow: 0 14px 40px rgba(0,0,0,.18); color: var(--tu-indigo); }
  .tu-btn-white:active { transform: scale(0.97); color: var(--tu-violet); }

  .tu-btn-ghost {
    background: rgba(255,255,255,.12);
    border: 2px solid rgba(255,255,255,.3);
    color: #fff; font-weight: 700; font-size: .875rem;
    padding: 12px 32px; border-radius: 14px;
    transition: background .25s, transform .25s;
    cursor: pointer; text-decoration: none;
    display: inline-flex; align-items: center; gap: 8px;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    min-height: 48px;
    user-select: none;
  }
  .tu-btn-ghost:hover { background: rgba(255,255,255,.22); color: #fff; }
  .tu-btn-ghost:active { transform: scale(0.97); color: #fff; }

  /* Cards */
  .tu-feature-card {
    background: #fff;
    border: 1.5px solid var(--tu-slate-100);
    border-radius: var(--tu-radius-lg);
    padding: 32px;
    transition: border-color .35s, box-shadow .35s, transform .35s;
    cursor: default; height: 100%;
  }
  @media (hover: hover) {
    .tu-feature-card:hover {
      border-color: #c4b5fd;
      box-shadow: var(--tu-shadow-lg);
      transform: translateY(-8px);
    }
    .tu-feature-card:hover .tu-feature-icon { background: var(--tu-gradient); }
    .tu-feature-card:hover .tu-feature-icon svg { color: #fff !important; }
  }

  .tu-feature-icon {
    width: 52px; height: 52px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px; transition: all .3s;
  }

  .tu-project-card {
    background: #fff;
    border: 1.5px solid var(--tu-slate-100);
    border-radius: var(--tu-radius-lg);
    overflow: hidden;
    transition: border-color .35s, box-shadow .35s, transform .35s;
    height: 100%;
  }
  @media (hover: hover) {
    .tu-project-card:hover {
      border-color: #c4b5fd;
      box-shadow: var(--tu-shadow-lg);
      transform: translateY(-8px);
    }
  }

  /* Apply button inside project cards */
  .tu-apply-btn {
    background: var(--tu-gradient);
    color: #fff;
    font-weight: 700;
    font-size: .78rem;
    padding: 8px 16px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    min-height: 40px;
    min-width: 72px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 14px rgba(124,58,237,.25);
    transition: box-shadow .2s, transform .2s;
  }
  .tu-apply-btn:active { transform: scale(0.96); }

  .tu-skill-badge {
    font-size: 11px; font-weight: 700;
    padding: 4px 12px; border-radius: 8px;
    background: var(--tu-violet-light);
    color: var(--tu-violet);
    border: 1px solid #ddd6fe;
    display: inline-block;
  }

  .tu-benefit-card {
    background: #fff;
    border: 1.5px solid var(--tu-slate-100);
    border-radius: var(--tu-radius);
    padding: 28px;
    transition: all .3s; height: 100%;
  }
  @media (hover: hover) {
    .tu-benefit-card:hover {
      border-color: #c4b5fd;
      box-shadow: var(--tu-shadow);
      transform: translateY(-4px);
    }
    .tu-benefit-card:hover .tu-benefit-icon { background: var(--tu-gradient) !important; }
    .tu-benefit-card:hover .tu-benefit-icon svg { color: #fff !important; }
  }

  .tu-benefit-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: var(--tu-violet-light);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 16px; transition: all .3s;
  }

  .tu-stat-card {
    background: linear-gradient(160deg, #faf5ff 0%, #eff6ff 100%);
    border: 1.5px solid #e9d5ff;
    border-radius: var(--tu-radius-lg);
    padding: 36px 24px; text-align: center; transition: all .3s;
  }
  @media (hover: hover) {
    .tu-stat-card:hover { transform: translateY(-4px); box-shadow: var(--tu-shadow); border-color: #c4b5fd; }
  }

  .tu-step-card { text-align: center; padding: 16px; transition: all .3s; }
  .tu-step-icon {
    width: 72px; height: 72px; border-radius: 22px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px;
    box-shadow: 0 12px 36px rgba(124,58,237,.25);
    transition: transform .3s;
  }
  @media (hover: hover) {
    .tu-step-card:hover .tu-step-icon { transform: translateY(-6px) scale(1.05); }
  }

  .tu-testimonial {
    background: linear-gradient(160deg, #faf5ff 0%, #eef2ff 100%);
    border: 1.5px solid #e9d5ff;
    border-radius: var(--tu-radius-xl);
    padding: 48px; position: relative; overflow: hidden;
  }
  @media (max-width: 576px) {
    .tu-testimonial { padding: 28px 22px; }
  }
  .tu-quote-mark {
    position: absolute; top: 16px; right: 32px;
    font-size: 120px; font-family: Georgia, serif;
    color: #ede9fe; line-height: 1; user-select: none;
    pointer-events: none;
  }

  /* Testimonial nav buttons */
  .tu-testi-nav {
    width: 44px; height: 44px; border-radius: 12px;
    border: 1.5px solid var(--tu-slate-200);
    background: #fff;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    transition: border-color .2s, background .2s;
    outline: none;
    flex-shrink: 0;
  }
  .tu-testi-nav:active { background: var(--tu-violet-light); border-color: #c4b5fd; }
  @media (hover: hover) {
    .tu-testi-nav:hover { border-color: var(--tu-violet); color: var(--tu-violet); }
  }

  /* Testimonial dot */
  .tu-testi-dot {
    height: 8px; border-radius: 100px;
    border: none; background: var(--tu-slate-200);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    transition: all .3s;
    padding: 0;
  }

  .tu-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 18px; border-radius: 100px;
    background: var(--tu-violet-light);
    border: 1px solid #ddd6fe;
    font-size: .8rem; font-weight: 700;
    color: var(--tu-violet); letter-spacing: .04em; text-transform: uppercase;
  }

  .tu-avatar {
    width: 40px; height: 40px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: .8rem; color: #fff; flex-shrink: 0;
  }

  /* Social proof avatars */
  .tu-proof-avatar {
    width: 34px; height: 34px; border-radius: 10px;
    border: 2.5px solid #fff;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-weight: 800; font-size: .65rem;
    box-shadow: 0 2px 8px rgba(0,0,0,.1);
  }

  /* Hero Network Animation */
  @keyframes hubPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.4), 0 24px 64px rgba(109,40,217,0.4); }
    50% { box-shadow: 0 0 0 16px rgba(124,58,237,0), 0 24px 64px rgba(109,40,217,0.5); }
  }
  @keyframes ringExpand {
    0% { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(1.5); opacity: 0; }
  }
  @keyframes dashMove {
    to { stroke-dashoffset: -24; }
  }
  @keyframes glowOrb {
    0%,100% { opacity: 0.35; transform: scale(1); }
    50% { opacity: 0.65; transform: scale(1.08); }
  }

  .hero-hub { animation: hubPulse 3s ease-in-out infinite; }
  .hub-ring-1 { animation: ringExpand 2.5s ease-out infinite; }
  .hub-ring-2 { animation: ringExpand 2.5s ease-out 1.25s infinite; }
  .conn-line { animation: dashMove 1.8s linear infinite; }
  .glow-orb-1 { animation: glowOrb 5s ease-in-out infinite; }
  .glow-orb-2 { animation: glowOrb 6s ease-in-out 2s infinite; }

  /* Role card hover */
  .role-card {
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1.5px solid rgba(226,232,240,0.8);
    border-radius: 18px;
    padding: 12px 16px 12px 12px;
    display: flex; align-items: center; gap: 12px;
    cursor: pointer;
    transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
    box-shadow: 0 8px 32px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
  }
  @media (hover: hover) {
    .role-card:hover {
      border-color: #a78bfa;
      box-shadow: 0 16px 48px rgba(124,58,237,0.18), 0 2px 8px rgba(0,0,0,0.06);
      transform: translateY(-4px) scale(1.025);
    }
  }
  .role-card .card-icon {
    width: 42px; height: 42px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .role-card .card-title { font-weight: 800; font-size: .85rem; color: #1e293b; margin: 0; }
  .role-card .card-status { display: flex; align-items: center; gap: 5px; margin-top: 3px; }
  .role-card .status-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .role-card .status-text { font-size: .7rem; font-weight: 700; margin: 0; }

  /* Floating animations */
  @keyframes float-tl { 0%,100%{transform:translate(0,0) rotate(-1.5deg)} 40%{transform:translate(-8px,-14px) rotate(1deg)} 70%{transform:translate(4px,-6px) rotate(-0.5deg)} }
  @keyframes float-tr { 0%,100%{transform:translate(0,0) rotate(1deg)} 35%{transform:translate(10px,-10px) rotate(-1.5deg)} 65%{transform:translate(2px,8px) rotate(0.5deg)} }
  @keyframes float-bl { 0%,100%{transform:translate(0,0) rotate(0.5deg)} 45%{transform:translate(-6px,12px) rotate(-1deg)} 75%{transform:translate(5px,4px) rotate(1deg)} }
  @keyframes float-br { 0%,100%{transform:translate(0,0) rotate(-0.5deg)} 50%{transform:translate(9px,10px) rotate(1.5deg)} 80%{transform:translate(-3px,2px) rotate(-1deg)} }

  .float-tl { animation: float-tl 4.5s ease-in-out infinite; }
  .float-tr { animation: float-tr 5.0s ease-in-out infinite; }
  .float-bl { animation: float-bl 4.2s ease-in-out 0.6s infinite; }
  .float-br { animation: float-br 5.3s ease-in-out 0.3s infinite; }

  /* Footer */
  .tu-footer { background: var(--tu-slate-900); color: var(--tu-slate-400); }
  .tu-footer-link {
    color: var(--tu-slate-500); text-decoration: none;
    font-size: .875rem; transition: color .2s;
    display: block; margin-bottom: 10px;
    min-height: 36px; display: flex; align-items: center;
    -webkit-tap-highlight-color: transparent;
  }
  .tu-footer-link:hover { color: #a78bfa; }
  .tu-footer-link:active { color: #a78bfa; }
  .tu-social-btn {
    width: 44px; height: 44px; border-radius: 10px;
    background: #1e293b;
    display: flex; align-items: center; justify-content: center;
    color: var(--tu-slate-500); transition: all .2s; text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    cursor: pointer;
  }
  .tu-social-btn:hover { background: var(--tu-violet); color: #fff; }
  .tu-social-btn:active { background: var(--tu-violet); color: #fff; transform: scale(0.95); }

  .tu-section { padding: 96px 0; }
  .tu-section-sm { padding: 64px 0; }

  @media (max-width: 768px) {
    .tu-section { padding: 64px 0; }
    .tu-section-sm { padding: 48px 0; }
  }

  .cta-orb1 { animation: glowOrb 6s ease-in-out infinite; }
  .cta-orb2 { animation: glowOrb 7s ease-in-out 2s infinite; }

  /* Tag hover for Stats */
  .tu-tag {
    padding: 8px 20px; border-radius: 100px;
    background: var(--tu-slate-50); border: 1.5px solid var(--tu-slate-200);
    font-size: .85rem; font-weight: 600; color: var(--tu-slate-600);
    cursor: default; transition: all .2s;
    display: inline-block;
    -webkit-tap-highlight-color: transparent;
  }
  @media (hover: hover) {
    .tu-tag:hover { background: var(--tu-violet-light); border-color: #c4b5fd; color: var(--tu-violet); }
  }
`;

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

function FadeIn({ children, delay = 0, y = 36, className = "", style = {} }) {
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
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   NETWORK ANIMATION — hero right column
══════════════════════════════════════════ */
const ARENA_W = 530;
const ARENA_H = 460;
const HUB_W = 160;
const HUB_H = 160;
const HUB_L = (ARENA_W - HUB_W) / 2;
const HUB_T = (ARENA_H - HUB_H) / 2;
const CARD_W = 215;
const CARD_H = 64;

const CARD_POS = [
  { top: 18,  left: 10  },
  { top: 18,  left: ARENA_W - CARD_W - 10 },
  { top: ARENA_H - CARD_H - 18, left: 10  },
  { top: ARENA_H - CARD_H - 18, left: ARENA_W - CARD_W - 10 },
];

const CARD_FLOAT = ["float-tl","float-tr","float-bl","float-br"];

const CARDS_DATA = [
  { id:"tl", title:"React Developer",  status:"Available Now",    statusColor:"#22c55e", icon:FiCode,      iconBg:"linear-gradient(135deg,#eff6ff,#dbeafe)", iconColor:"#3b82f6" },
  { id:"tr", title:"UI/UX Designer",   status:"Open to Collab",   statusColor:"#f59e0b", icon:FiUser,      iconBg:"linear-gradient(135deg,#fdf2f8,#fce7f3)", iconColor:"#ec4899" },
  { id:"bl", title:"Backend Engineer", status:"Available Now",    statusColor:"#22c55e", icon:FiCpu,       iconBg:"linear-gradient(135deg,#f0fdf4,#dcfce7)", iconColor:"#10b981" },
  { id:"br", title:"Project Manager",  status:"Actively Looking", statusColor:"#3b82f6", icon:FiBriefcase, iconBg:"linear-gradient(135deg,#fffbeb,#fef3c7)", iconColor:"#f59e0b" },
];

function NetworkAnimation() {
  const svgRef  = useRef(null);
  const hubRef  = useRef(null);
  const cardRefs = useRef([null,null,null,null]);
  const rafRef  = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const defs = document.createElementNS("http://www.w3.org/2000/svg","defs");
    CARDS_DATA.forEach((_,i) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg","linearGradient");
      g.id = `lg${i}`;
      g.setAttribute("gradientUnits","userSpaceOnUse");
      [["0%","#7c3aed","0.8"],["100%","#818cf8","0.15"]].forEach(([off,col,op]) => {
        const s = document.createElementNS("http://www.w3.org/2000/svg","stop");
        s.setAttribute("offset",off); s.setAttribute("stop-color",col); s.setAttribute("stop-opacity",op);
        g.appendChild(s);
      });
      defs.appendChild(g);
    });
    svg.appendChild(defs);

    const lines = [];
    CARDS_DATA.forEach((_,i) => {
      const line = document.createElementNS("http://www.w3.org/2000/svg","line");
      line.setAttribute("stroke",`url(#lg${i})`);
      line.setAttribute("stroke-width","1.8");
      line.setAttribute("stroke-dasharray","6 8");
      line.setAttribute("stroke-linecap","round");
      line.classList.add("conn-line");
      svg.appendChild(line);
      lines.push(line);

      const dot = document.createElementNS("http://www.w3.org/2000/svg","circle");
      dot.setAttribute("r","4.5");
      dot.setAttribute("fill","#7c3aed");
      dot.setAttribute("opacity","0");
      svg.appendChild(dot);
      dotsRef.current[i] = { el:dot, t: i * 0.25, speed: 0.0035 + i*0.0006 };
    });

    function getCenterOf(el) {
      const ar = svg.parentElement?.getBoundingClientRect();
      const er = el?.getBoundingClientRect();
      if (!ar || !er) return {x:0,y:0};
      return { x: er.left - ar.left + er.width/2, y: er.top - ar.top + er.height/2 };
    }

    function tick() {
      const hub = hubRef.current;
      if (!hub) { rafRef.current = requestAnimationFrame(tick); return; }
      const hc = getCenterOf(hub);

      cardRefs.current.forEach((card,i) => {
        if (!card) return;
        const cc = getCenterOf(card);
        lines[i].setAttribute("x1",hc.x); lines[i].setAttribute("y1",hc.y);
        lines[i].setAttribute("x2",cc.x); lines[i].setAttribute("y2",cc.y);
        const g = svg.querySelector(`#lg${i}`);
        if (g) {
          g.setAttribute("x1",hc.x); g.setAttribute("y1",hc.y);
          g.setAttribute("x2",cc.x); g.setAttribute("y2",cc.y);
        }
        const d = dotsRef.current[i];
        d.t = (d.t + d.speed) % 1;
        const x = hc.x + (cc.x - hc.x) * d.t;
        const y = hc.y + (cc.y - hc.y) * d.t;
        d.el.setAttribute("cx", x);
        d.el.setAttribute("cy", y);
        const fade = d.t < 0.12 ? d.t/0.12 : d.t > 0.88 ? (1-d.t)/0.12 : 1;
        d.el.setAttribute("opacity", fade * 0.85);
      });

      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div style={{ position:"relative", width:ARENA_W, height:ARENA_H, flexShrink:0 }}>
      <div style={{ position:"absolute", top:"30%", left:"28%", width:240, height:240, borderRadius:"50%", background:"radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", pointerEvents:"none", zIndex:0 }}/>
      <svg ref={svgRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", overflow:"visible", zIndex:2 }}/>
      <div ref={hubRef} className="hero-hub" style={{ position:"absolute", top:HUB_T, left:HUB_L, width:HUB_W, height:HUB_H, borderRadius:26, background:"linear-gradient(145deg,#7c3aed 0%,#5b21b6 55%,#4338ca 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", zIndex:10, textAlign:"center", cursor:"default" }}>
        <div className="hub-ring-1" style={{ position:"absolute", inset:-3, borderRadius:29, border:"2px solid rgba(167,139,250,0.55)", pointerEvents:"none" }}/>
        <div className="hub-ring-2" style={{ position:"absolute", inset:-3, borderRadius:29, border:"2px solid rgba(167,139,250,0.3)", pointerEvents:"none" }}/>
        <div style={{ width:44, height:44, borderRadius:13, background:"rgba(255,255,255,0.13)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:9 }}>
          <FiUsers size={21} color="#fff"/>
        </div>
        <p style={{ fontFamily:"Outfit,sans-serif", fontWeight:900, fontSize:"1.25rem", color:"#fff", margin:0, lineHeight:1 }}>4 Members</p>
        <p style={{ fontSize:".7rem", color:"rgba(255,255,255,0.7)", margin:"5px 0 11px", fontWeight:500 }}>Working Together</p>
        <div style={{ display:"flex", gap:4 }}>
          {[16,28,38].map((w,i) => (
            <div key={i} style={{ width:w, height:3, borderRadius:6, background:`rgba(255,255,255,${0.18+i*0.28})` }}/>
          ))}
        </div>
      </div>
      {CARDS_DATA.map((card,idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            ref={el => (cardRefs.current[idx] = el)}
            className={`role-card ${CARD_FLOAT[idx]}`}
            initial={{ opacity:0, scale:0.72 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:0.55, delay:0.45+idx*0.13, type:"spring", stiffness:140 }}
            style={{ position:"absolute", top:CARD_POS[idx].top, left:CARD_POS[idx].left, width:CARD_W, zIndex:8 }}
          >
            <div className="card-icon" style={{ background:card.iconBg }}>
              <Icon size={17} color={card.iconColor}/>
            </div>
            <div>
              <p className="card-title">{card.title}</p>
              <div className="card-status">
                <span className="status-dot" style={{ background:card.statusColor }}/>
                <p className="status-text" style={{ color:card.statusColor }}>{card.status}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════
   NAVBAR — fully fixed mobile
══════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on outside tap
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (!e.target.closest(".tu-navbar-inner")) setOpen(false);
    };
    document.addEventListener("touchstart", close, { passive: true });
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("touchstart", close);
      document.removeEventListener("mousedown", close);
    };
  }, [open]);

  const navLinks = ["Home", "Projects", "Features", "About"];

  return (
    <motion.nav
      initial={{ y: -72 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`tu-navbar ${scrolled ? "scrolled" : ""}`}
      style={{ background: scrolled ? undefined : "transparent" }}
    >
      <div className="container">
        <div className="tu-navbar-inner" style={{ position: "relative" }}>
          {/* Top bar */}
          <div className="d-flex align-items-center justify-content-between" style={{ minHeight: 44 }}>
            {/* Logo */}
            <a href="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
              <div style={{ width:34, height:34, borderRadius:10, background:"var(--tu-gradient)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 16px rgba(124,58,237,.35)" }}>
                <FiLayers color="#fff" size={17}/>
              </div>
              <span style={{ fontFamily:"Outfit,sans-serif", fontWeight:900, fontSize:"1.25rem", background:"var(--tu-gradient)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                TeamUp
              </span>
            </a>

            {/* Desktop nav links */}
            <div className="d-none d-md-flex align-items-center gap-1">
              {navLinks.map(l => (
                <a key={l} href="#" className="tu-nav-link">{l}</a>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="d-none d-md-flex align-items-center gap-3">
              <a href="/login" className="tu-nav-link">Login</a>
              <a href="/register" className="tu-btn-primary" style={{ padding:"10px 22px", minHeight:40 }}>
                Get Started <FiArrowRight size={14}/>
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="d-md-none tu-hamburger"
              onClick={() => setOpen(o => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              type="button"
            >
              <AnimatePresence mode="wait" initial={false}>
                {open
                  ? <motion.span key="x" initial={{rotate:-45,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:45,opacity:0}} transition={{duration:0.18}}><FiX size={22} color="var(--tu-slate-700)"/></motion.span>
                  : <motion.span key="m" initial={{rotate:45,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-45,opacity:0}} transition={{duration:0.18}}><FiMenu size={22} color="var(--tu-slate-700)"/></motion.span>
                }
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {open && (
              <motion.div
                className="tu-mobile-menu"
                initial={{ opacity:0, height:0 }}
                animate={{ opacity:1, height:"auto" }}
                exit={{ opacity:0, height:0 }}
                transition={{ duration:0.25, ease:[0.22,1,0.36,1] }}
              >
                <div style={{ padding:"8px 8px 16px" }}>
                  {navLinks.map(l => (
                    <a
                      key={l}
                      href="#"
                      className="tu-mobile-nav-link"
                      onClick={() => setOpen(false)}
                    >
                      {l}
                    </a>
                  ))}
                  <div style={{ padding:"12px 8px 0", display:"flex", flexDirection:"column", gap:10 }}>
                    <a href="/login" className="tu-btn-outline" style={{ justifyContent:"center", width:"100%" }}>Login</a>
                    <a href="/register" className="tu-btn-primary" style={{ justifyContent:"center", width:"100%" }}>
                      Get Started <FiArrowRight size={14}/>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
function Hero() {
  return (
    <section style={{
      minHeight:"100vh",
      display:"flex", alignItems:"center",
      background:"radial-gradient(ellipse at 25% 40%, #f5f3ff 0%, #eef2ff 45%, #f8fafc 100%)",
      paddingTop:90, paddingBottom:60,
      overflow:"hidden", position:"relative",
    }}>
      <div style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(79,70,229,.05) 1px, transparent 1px)", backgroundSize:"32px 32px" }}/>
      <div className="container position-relative" style={{ zIndex:2 }}>
        <div className="row align-items-center g-5">
          {/* LEFT — copy */}
          <div className="col-lg-5">
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8 }}>
              {/* Badge */}
              <motion.div
                initial={{ opacity:0, x:-24 }} animate={{ opacity:1, x:0 }}
                transition={{ duration:0.5, delay:0.1 }}
                style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.95)", backdropFilter:"blur(8px)", border:"1px solid rgba(124,58,237,0.2)", borderRadius:100, padding:"6px 18px 6px 10px", marginBottom:24, boxShadow:"0 4px 16px rgba(124,58,237,0.08)" }}
              >
                <motion.span animate={{ scale:[1,1.3,1] }} transition={{ duration:2, repeat:Infinity }} style={{ width:8, height:8, borderRadius:"50%", background:"#7c3aed", display:"inline-block" }}/>
                <span style={{ fontSize:".75rem", fontWeight:700, background:"linear-gradient(135deg,#7c3aed,#4f46e5)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                  ✨ Student Collaboration Platform ✨
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.6, delay:0.2 }}
                style={{ fontSize:"clamp(2.4rem,5vw,3.8rem)", fontWeight:900, lineHeight:1.1, marginBottom:20, color:"#0f172a" }}
              >
                Build{" "}
                <motion.span
                  animate={{ backgroundPosition:["0% 50%","100% 50%","0% 50%"] }}
                  transition={{ duration:5, repeat:Infinity, ease:"linear" }}
                  style={{ background:"linear-gradient(90deg,#7c3aed,#a78bfa,#4f46e5,#7c3aed)", backgroundSize:"300% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", display:"inline-block" }}
                >
                  Amazing
                </motion.span>
                {" "}Projects<br />Together
              </motion.h1>

              <motion.p
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.5, delay:0.35 }}
                style={{ fontSize:"1rem", color:"#475569", lineHeight:1.75, marginBottom:32, maxWidth:480 }}
              >
                Connect with talented developers, designers, and innovators to turn your ideas into successful projects.
              </motion.p>

              {/* CTA buttons — no whileHover/whileTap on anchors, use CSS :active */}
              <motion.div
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.5, delay:0.45 }}
                className="d-flex flex-wrap gap-3 mb-5"
              >
                <a href="#" className="tu-btn-primary">
                  Explore Projects <FiArrowRight size={15}/>
                </a>
                <a href="#" className="tu-btn-outline">
                  Create Project
                </a>
              </motion.div>

              {/* Social proof */}
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5, delay:0.6 }} className="d-flex align-items-center gap-4">
                <div className="d-flex">
                  {["#7c3aed","#4f46e5","#06b6d4","#ec4899","#f59e0b"].map((c,i) => (
                    <div key={i} className="tu-proof-avatar" style={{ background:c, marginLeft:i>0?-10:0 }}>
                      <span>{["A","K","M","R","S"][i]}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="d-flex gap-1 mb-1">
                    {[...Array(5)].map((_,i) => <FiStar key={i} size={13} style={{ fill:"#f59e0b", color:"#f59e0b" }}/>)}
                  </div>
                  <p style={{ fontSize:".75rem", color:"#64748b", margin:0 }}>
                    <strong style={{ color:"#1e293b" }}>500+</strong> students building together
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — network animation (desktop only) */}
          <div className="col-lg-7 d-none d-lg-flex align-items-center justify-content-center" style={{ overflow:"visible" }}>
            <NetworkAnimation/>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   STATS
══════════════════════════════════════════ */
function Stats() {
  const stats = [
    { val:500, suffix:"+", label:"Active Users" },
    { val:100, suffix:"+", label:"Projects Created" },
    { val:300, suffix:"+", label:"Applications Sent" },
    { val:50,  suffix:"+", label:"Teams Formed" },
  ];
  const tags = ["Students","Hackathon Teams","Open Source Contributors","Startup Builders"];

  return (
    <section className="tu-section-sm" style={{ background:"#fff" }}>
      <div className="container">
        <FadeIn className="text-center mb-5">
          <p style={{ fontSize:".78rem", fontWeight:700, color:"var(--tu-violet)", letterSpacing:".1em", textTransform:"uppercase", marginBottom:14 }}>Trusted By</p>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {tags.map(t => <span key={t} className="tu-tag">{t}</span>)}
          </div>
        </FadeIn>
        <div className="row g-4">
          {stats.map((s,i) => (
            <div key={i} className="col-6 col-lg-3">
              <FadeIn delay={i*0.1}>
                <div className="tu-stat-card">
                  <p className="tu-gradient-text" style={{ fontFamily:"Outfit,sans-serif", fontSize:"3rem", fontWeight:900, margin:0 }}>
                    <Counter target={s.val} suffix={s.suffix}/>
                  </p>
                  <p style={{ fontSize:".875rem", fontWeight:600, color:"var(--tu-slate-500)", margin:0, marginTop:6 }}>{s.label}</p>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FEATURES
══════════════════════════════════════════ */
function Features() {
  const features = [
    { icon:FiLayers,   title:"Create Projects",      desc:"Launch your project idea with a brief, required skills, and team size goals.", iconBg:"#ede9fe", iconColor:"var(--tu-violet)" },
    { icon:FiUsers,    title:"Find Team Members",     desc:"Browse students filtered by tech stack, role, and availability in seconds.", iconBg:"#e0f2fe", iconColor:"#0284c7" },
    { icon:FiFileText, title:"Project Applications",  desc:"Receive and manage applications with a clean dashboard and notifications.", iconBg:"#d1fae5", iconColor:"#059669" },
    { icon:FiShield,   title:"Secure Authentication", desc:"Enterprise-grade JWT security keeps your profile and project data safe.", iconBg:"#fce7f3", iconColor:"#db2777" },
    { icon:FiUser,     title:"Profile Management",    desc:"Showcase your skills, GitHub, and tech stack in a beautiful profile page.", iconBg:"#fef3c7", iconColor:"#d97706" },
    { icon:FiBriefcase,title:"Team Recruitment",      desc:"Post open roles, define requirements, and build your dream team effortlessly.", iconBg:"#f3e8ff", iconColor:"#7c3aed" },
  ];

  return (
    <section id="features" className="tu-section" style={{ background:"linear-gradient(180deg, #fff 0%, var(--tu-slate-50) 100%)" }}>
      <div className="container">
        <FadeIn style={{ maxWidth:600, margin:"0 auto 56px" }} className="text-center mb-5">
          <span className="tu-pill mb-3">Platform Features</span>
          <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", color:"var(--tu-slate-900)", marginBottom:16 }}>
            Everything you need to <span className="tu-gradient-text">collaborate</span>
          </h2>
          <p style={{ color:"var(--tu-slate-500)", fontSize:"1.05rem" }}>Built for student teams, hackathons, and startup builders.</p>
        </FadeIn>
        <div className="row g-4">
          {features.map((f,i) => (
            <div key={i} className="col-md-6 col-lg-4">
              <FadeIn delay={i*0.08}>
                <div className="tu-feature-card">
                  <div className="tu-feature-icon" style={{ background:f.iconBg }}>
                    <f.icon size={24} color={f.iconColor}/>
                  </div>
                  <h5 style={{ fontWeight:800, color:"var(--tu-slate-800)", marginBottom:10 }}>{f.title}</h5>
                  <p style={{ fontSize:".9rem", color:"var(--tu-slate-500)", margin:0, lineHeight:1.7 }}>{f.desc}</p>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   HOW IT WORKS
══════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { num:"01", icon:FiTarget,   title:"Create a Project",  desc:"Post your idea with required skills, roles, and timeline.",              grad:"135deg, #7c3aed, #4f46e5" },
    { num:"02", icon:FiUsers,    title:"Recruit Members",   desc:"Your project surfaces to students matching your skill needs.",            grad:"135deg, #4f46e5, #06b6d4" },
    { num:"03", icon:FiFileText, title:"Review Applications",desc:"Compare profiles, skills, and GitHub links to pick the best fit.",      grad:"135deg, #06b6d4, #10b981" },
    { num:"04", icon:FiZap,      title:"Build Together",    desc:"Assemble your team and start building with full momentum.",              grad:"135deg, #10b981, #059669" },
  ];

  return (
    <section className="tu-section" style={{ background:"var(--tu-slate-50)" }}>
      <div className="container">
        <FadeIn style={{ maxWidth:560, margin:"0 auto 56px" }} className="text-center mb-5">
          <span className="tu-pill mb-3">How It Works</span>
          <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", color:"var(--tu-slate-900)" }}>
            From idea to team in <span className="tu-gradient-text">4 steps</span>
          </h2>
        </FadeIn>
        <div className="row g-4 position-relative">
          <div className="d-none d-lg-block" style={{ position:"absolute", top:36, left:"12.5%", right:"12.5%", height:2, background:"linear-gradient(90deg,#7c3aed,#06b6d4)", opacity:.15, zIndex:0 }}/>
          {steps.map((s,i) => (
            <div key={i} className="col-sm-6 col-lg-3">
              <FadeIn delay={i*0.12}>
                <div className="tu-step-card" style={{ position:"relative", zIndex:1 }}>
                  <div className="tu-step-icon" style={{ background:`linear-gradient(${s.grad})` }}>
                    <s.icon size={28} color="#fff"/>
                  </div>
                  <p style={{ fontSize:".72rem", fontWeight:800, color:"var(--tu-slate-300)", letterSpacing:".12em", marginBottom:8 }}>{s.num}</p>
                  <h5 style={{ fontWeight:800, color:"var(--tu-slate-800)", marginBottom:10 }}>{s.title}</h5>
                  <p style={{ fontSize:".875rem", color:"var(--tu-slate-500)", margin:0, lineHeight:1.65 }}>{s.desc}</p>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FEATURED PROJECTS
══════════════════════════════════════════ */
function FeaturedProjects() {
  const projects = [
    { title:"AI Resume Analyzer",    desc:"ML-powered resume scoring with skill gap analysis and ATS optimization.", skills:["Python","React","TensorFlow"], team:4, bar:"linear-gradient(90deg,#7c3aed,#4f46e5)", open:true },
    { title:"Hospital Management",   desc:"Full-stack system for patient records, appointments, and billing workflows.", skills:["Node.js","MongoDB","React"], team:5, bar:"linear-gradient(90deg,#06b6d4,#3b82f6)", open:true },
    { title:"Smart Learning Platform",desc:"Adaptive quiz engine with progress tracking and personalized roadmaps.", skills:["Next.js","PostgreSQL","AI"], team:3, bar:"linear-gradient(90deg,#10b981,#06b6d4)", open:false },
    { title:"Startup Launch Platform",desc:"Landing page builder with built-in waitlist, analytics, and email capture.", skills:["React","Stripe","Firebase"], team:4, bar:"linear-gradient(90deg,#f59e0b,#ef4444)", open:true },
  ];

  return (
    <section className="tu-section" style={{ background:"#fff" }}>
      <div className="container">
        <FadeIn style={{ maxWidth:600, margin:"0 auto 56px" }} className="text-center mb-5">
          <span className="tu-pill mb-3">Featured Projects</span>
          <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", color:"var(--tu-slate-900)", marginBottom:16 }}>
            Join an exciting <span className="tu-gradient-text">project</span>
          </h2>
          <p style={{ color:"var(--tu-slate-500)", fontSize:"1.05rem" }}>Hand-picked projects actively looking for collaborators.</p>
        </FadeIn>
        <div className="row g-4">
          {projects.map((p,i) => (
            <div key={i} className="col-sm-6 col-lg-3">
              <FadeIn delay={i*0.1}>
                <div className="tu-project-card">
                  <div style={{ height:5, background:p.bar }}/>
                  <div className="p-4 d-flex flex-column" style={{ height:"calc(100% - 5px)" }}>
                    <div className="d-flex align-items-start justify-content-between mb-3">
                      <h6 style={{ fontWeight:800, color:"var(--tu-slate-800)", fontSize:".9rem", margin:0, lineHeight:1.3 }}>{p.title}</h6>
                      {p.open && <span style={{ fontSize:".68rem", fontWeight:800, background:"#d1fae5", color:"#065f46", border:"1px solid #a7f3d0", borderRadius:6, padding:"3px 9px", whiteSpace:"nowrap", marginLeft:8, flexShrink:0 }}>OPEN</span>}
                    </div>
                    <p style={{ fontSize:".83rem", color:"var(--tu-slate-500)", lineHeight:1.65, flexGrow:1, marginBottom:14 }}>{p.desc}</p>
                    <div className="d-flex flex-wrap gap-1 mb-4">
                      {p.skills.map(s => <span key={s} className="tu-skill-badge">{s}</span>)}
                    </div>
                    <div className="d-flex align-items-center justify-content-between pt-3" style={{ borderTop:"1px solid var(--tu-slate-100)" }}>
                      <div className="d-flex align-items-center gap-1" style={{ fontSize:".78rem", color:"var(--tu-slate-400)" }}>
                        <FiUsers size={13}/> Team of {p.team}
                      </div>
                      {/* Plain button — no JS hover hacks, all CSS */}
                      <button className="tu-apply-btn">Apply →</button>
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

/* ══════════════════════════════════════════
   WHY TEAMUP
══════════════════════════════════════════ */
function WhyTeamUp() {
  const benefits = [
    { icon:FiZap,          title:"Faster Team Formation",   desc:"Find teammates in hours with smart skill-based filtering.",              badge:"10× faster" },
    { icon:FiMessageSquare,title:"Better Collaboration",    desc:"Unified application system keeps recruitment clean and clear.",          badge:"Zero friction" },
    { icon:FiTrendingUp,   title:"Organized Recruitment",   desc:"Review all applicants in one dashboard. Decide with clarity.",          badge:"100% organized" },
    { icon:FiShield,       title:"Secure Platform",         desc:"JWT-protected routes and privacy-first design baked in.",              badge:"Enterprise grade" },
  ];
  const tags = ["MERN Stack","Fully Responsive","Open Source Friendly","Placement Ready"];

  return (
    <section className="tu-section" style={{ background:"linear-gradient(180deg, var(--tu-slate-50) 0%, #fff 100%)" }}>
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-5">
            <FadeIn>
              <span className="tu-pill mb-4" style={{ display:"inline-flex" }}>Why TeamUp</span>
              <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", color:"var(--tu-slate-900)", marginBottom:20 }}>
                Collaboration, reimagined for <span className="tu-gradient-text">students</span>
              </h2>
              <p style={{ color:"var(--tu-slate-500)", fontSize:"1.05rem", lineHeight:1.75, marginBottom:28 }}>
                Stop searching LinkedIn for teammates. TeamUp is purpose-built for student project discovery, skill-based matching, and seamless team formation.
              </p>
              <div className="d-flex flex-wrap gap-2">
                {tags.map(t => (
                  <span key={t} style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#fff", border:"1.5px solid var(--tu-slate-200)", borderRadius:12, padding:"8px 16px", fontSize:".82rem", fontWeight:700, color:"var(--tu-slate-700)" }}>
                    <FiCheck size={14} color="var(--tu-violet)"/> {t}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
          <div className="col-lg-7">
            <div className="row g-4">
              {benefits.map((b,i) => (
                <div key={i} className="col-sm-6">
                  <FadeIn delay={i*0.1}>
                    <div className="tu-benefit-card">
                      <div className="tu-benefit-icon">
                        <b.icon size={20} color="var(--tu-violet)"/>
                      </div>
                      <span style={{ fontSize:".7rem", fontWeight:800, color:"var(--tu-violet)", letterSpacing:".08em", textTransform:"uppercase" }}>{b.badge}</span>
                      <h6 style={{ fontWeight:800, color:"var(--tu-slate-800)", marginTop:6, marginBottom:8 }}>{b.title}</h6>
                      <p style={{ fontSize:".83rem", color:"var(--tu-slate-500)", margin:0, lineHeight:1.65 }}>{b.desc}</p>
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

/* ══════════════════════════════════════════
   TESTIMONIALS — touch-friendly nav
══════════════════════════════════════════ */
function Testimonials() {
  const list = [
    { name:"Aryan Sharma", role:"Final Year, IIT Delhi",       init:"AS", color:"var(--tu-gradient)",                        quote:"TeamUp helped me find two amazing developers for my AI project in just 3 days. The application flow is incredibly smooth — we launched our MVP in 6 weeks." },
    { name:"Priya Nair",   role:"Full Stack Developer",         init:"PN", color:"linear-gradient(135deg,#ec4899,#f43f5e)", quote:"I applied to 3 projects through TeamUp and got accepted into a startup team building a health-tech platform. Best career move I've made as a student." },
    { name:"Kabir Mehta",  role:"UI/UX Designer, NIT",          init:"KM", color:"linear-gradient(135deg,#10b981,#06b6d4)", quote:"As a designer, I always struggled to find technical co-founders. TeamUp's skill matching changed everything. Now I'm part of a 5-person hackathon team." },
  ];
  const [active, setActive] = useState(0);
  const prev = () => setActive(a => (a - 1 + list.length) % list.length);
  const next = () => setActive(a => (a + 1) % list.length);

  return (
    <section className="tu-section" style={{ background:"#fff" }}>
      <div className="container">
        <FadeIn style={{ maxWidth:560, margin:"0 auto 56px" }} className="text-center mb-5">
          <span className="tu-pill mb-3">Testimonials</span>
          <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", color:"var(--tu-slate-900)" }}>
            Loved by <span className="tu-gradient-text">builders</span>
          </h2>
        </FadeIn>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-24 }} transition={{ duration:0.38 }} className="tu-testimonial">
              <div className="tu-quote-mark">"</div>
              <div className="d-flex gap-1 mb-4">
                {[...Array(5)].map((_,i) => <FiStar key={i} size={18} style={{ fill:"#f59e0b", color:"#f59e0b" }}/>)}
              </div>
              <p style={{ fontSize:"clamp(1rem,2vw,1.2rem)", color:"var(--tu-slate-700)", fontWeight:500, lineHeight:1.75, marginBottom:32, position:"relative", zIndex:1 }}>
                {list[active].quote}
              </p>
              <div className="d-flex align-items-center gap-3">
                <div className="tu-avatar" style={{ background:list[active].color, width:48, height:48, borderRadius:14, fontSize:".85rem" }}>
                  {list[active].init}
                </div>
                <div>
                  <p style={{ fontWeight:800, color:"var(--tu-slate-800)", margin:0 }}>{list[active].name}</p>
                  <p style={{ fontSize:".82rem", color:"var(--tu-slate-500)", margin:0 }}>{list[active].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Touch-friendly nav row */}
          <div className="d-flex align-items-center justify-content-center gap-3 mt-5">
            <button className="tu-testi-nav" onClick={prev} type="button" aria-label="Previous testimonial">
              <FiChevronLeft size={20}/>
            </button>
            {list.map((_,i) => (
              <button
                key={i}
                className="tu-testi-dot"
                onClick={() => setActive(i)}
                type="button"
                aria-label={`Testimonial ${i+1}`}
                style={{ width: i===active ? 28 : 8, background: i===active ? "var(--tu-violet)" : "var(--tu-slate-200)" }}
              />
            ))}
            <button className="tu-testi-nav" onClick={next} type="button" aria-label="Next testimonial">
              <FiChevronRight size={20}/>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   CTA
══════════════════════════════════════════ */
function CTA() {
  return (
    <section className="tu-section" style={{ position:"relative", overflow:"hidden", background:"linear-gradient(135deg, #5b21b6 0%, #4338ca 50%, #3730a3 100%)" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px)", backgroundSize:"28px 28px" }}/>
      <div className="cta-orb1" style={{ position:"absolute", top:"-20%", left:"10%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(139,92,246,.45) 0%, transparent 65%)" }}/>
      <div className="cta-orb2" style={{ position:"absolute", bottom:"-20%", right:"10%", width:440, height:440, borderRadius:"50%", background:"radial-gradient(circle, rgba(99,102,241,.45) 0%, transparent 65%)" }}/>
      <div className="container position-relative" style={{ zIndex:2 }}>
        <FadeIn style={{ maxWidth:680, margin:"0 auto" }} className="text-center">
          <motion.div
            animate={{ scale:[1,1.04,1] }} transition={{ duration:3, repeat:Infinity }}
            style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.2)", borderRadius:100, padding:"7px 18px", marginBottom:28 }}
          >
            <motion.span animate={{ scale:[1,1.4,1] }} transition={{ duration:1.8, repeat:Infinity }} style={{ width:8, height:8, borderRadius:"50%", background:"#4ade80", display:"inline-block" }}/>
            <span style={{ fontSize:".78rem", fontWeight:700, color:"rgba(255,255,255,.85)", letterSpacing:".06em", textTransform:"uppercase" }}>Open for collaborations</span>
          </motion.div>
          <h2 style={{ fontSize:"clamp(2.2rem,5vw,3.6rem)", fontWeight:900, color:"#fff", marginBottom:20, lineHeight:1.1 }}>
            Ready to Build Your <span style={{ color:"#c4b5fd" }}>Dream Team?</span>
          </h2>
          <p style={{ fontSize:"1.1rem", color:"rgba(255,255,255,.72)", marginBottom:40, lineHeight:1.7 }}>
            Join 500+ students already building the next generation of tech products together.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <a href="#" className="tu-btn-white">Start a Project <FiArrowRight size={16}/></a>
            <a href="#" className="tu-btn-ghost">Join a Team</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function Footer() {
  const platformLinks = ["Projects","Features","Teams","Applications"];
  const companyLinks  = ["About","Contact","Privacy Policy","Terms of Service"];

  return (
    <footer className="tu-footer" style={{ paddingTop:64, paddingBottom:40 }}>
      <div className="container">
        <div className="row g-5 mb-5">
          <div className="col-lg-5">
            <div className="d-flex align-items-center gap-2 mb-4">
              <div style={{ width:32, height:32, borderRadius:9, background:"var(--tu-gradient)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <FiLayers size={16} color="#fff"/>
              </div>
              <span style={{ fontFamily:"Outfit,sans-serif", fontWeight:900, fontSize:"1.15rem", color:"#fff" }}>TeamUp</span>
            </div>
            <p style={{ fontSize:".875rem", lineHeight:1.75, maxWidth:320, color:"#64748b", marginBottom:24 }}>
              The student project collaboration platform for builders, dreamers, and innovators.
            </p>
            <div className="d-flex gap-2">
              {[FiGithub,FiLinkedin,FiTwitter].map((Icon,i) => (
                <a key={i} href="#" className="tu-social-btn"><Icon size={16}/></a>
              ))}
            </div>
          </div>
          <div className="col-6 col-lg-3 offset-lg-1">
            <p style={{ fontWeight:700, color:"#fff", fontSize:".875rem", marginBottom:18, letterSpacing:".04em" }}>Platform</p>
            {platformLinks.map(l => <a key={l} href="#" className="tu-footer-link">{l}</a>)}
          </div>
          <div className="col-6 col-lg-3">
            <p style={{ fontWeight:700, color:"#fff", fontSize:".875rem", marginBottom:18, letterSpacing:".04em" }}>Company</p>
            {companyLinks.map(l => <a key={l} href="#" className="tu-footer-link">{l}</a>)}
          </div>
        </div>
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between pt-4" style={{ borderTop:"1px solid #1e293b", gap:12 }}>
          <p style={{ fontSize:".78rem", color:"#334155", margin:0 }}>© 2025 TeamUp. Built with ❤️ for student builders.</p>
          <p style={{ fontSize:".78rem", color:"#334155", margin:0 }}>React + Vite · Bootstrap 5 · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════
   ROOT
══════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <GlobalStyles/>
      <Navbar/>
      <main>
        <Hero/>
        <Stats/>
        <Features/>
        <HowItWorks/>
        <FeaturedProjects/>
        <WhyTeamUp/>
        <Testimonials/>
        <CTA/>
      </main>
      <Footer/>
    </>
  );
}