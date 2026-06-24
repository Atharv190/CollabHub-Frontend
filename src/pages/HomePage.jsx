/**
 * TeamUp — HomePage.jsx (Fully Responsive + Touch-Friendly)
 * Stack: React + Vite + Bootstrap 5 + Framer Motion + React Icons
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiCode, FiUsers, FiFileText, FiShield, FiUser, FiBriefcase,
  FiArrowRight, FiStar, FiGithub, FiTwitter, FiLinkedin,
  FiCheck, FiZap, FiTrendingUp, FiMenu, FiX, FiChevronLeft,
  FiChevronRight, FiMessageSquare, FiTarget, FiCpu, FiLayers,
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
    --tu-shadow: 0 4px 24px rgba(124,58,237,.10);
    --tu-shadow-lg: 0 12px 48px rgba(124,58,237,.18);
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
    -webkit-tap-highlight-color: transparent;
  }
  h1,h2,h3,h4,h5,h6 { font-family: 'Outfit', sans-serif; font-weight: 800; }

  .tu-gradient-text {
    background: var(--tu-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ─── Navbar (touch-friendly) ─── */
  .tu-navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    transition: all .3s ease;
    padding: 12px 0;
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }
  .tu-navbar.scrolled {
    background: rgba(255,255,255,.98);
    box-shadow: 0 1px 24px rgba(0,0,0,.06);
    padding: 8px 0;
  }
  .tu-nav-link {
    font-size: .875rem; font-weight: 600;
    color: var(--tu-slate-600) !important;
    padding: 8px 16px !important;
    border-radius: 10px;
    transition: all .2s;
    text-decoration: none;
    cursor: pointer;
    touch-action: manipulation;
  }
  .tu-nav-link:hover, .tu-nav-link:focus { 
    color: var(--tu-violet) !important; 
    background: var(--tu-violet-light); 
  }
  .tu-nav-link-mobile {
    display: block;
    padding: 14px 16px;
    font-size: 1rem;
    font-weight: 600;
    color: var(--tu-slate-600) !important;
    text-decoration: none;
    border-bottom: 1px solid var(--tu-slate-100);
    transition: all .2s;
    cursor: pointer;
    touch-action: manipulation;
  }
  .tu-nav-link-mobile:hover, .tu-nav-link-mobile:active {
    color: var(--tu-violet) !important;
    background: var(--tu-violet-light);
    padding-left: 24px;
  }

  /* ─── Buttons (touch-optimized) ─── */
  .tu-btn-primary, .tu-btn-outline, .tu-btn-white, .tu-btn-ghost {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    cursor: pointer;
    min-height: 44px;
    min-width: 44px;
  }
  .tu-btn-primary {
    background: var(--tu-gradient);
    color: #fff; font-weight: 700; font-size: .875rem;
    padding: 12px 28px; border-radius: 14px; border: none;
    box-shadow: 0 8px 28px rgba(124,58,237,.30);
    transition: all .25s;
    text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  }
  .tu-btn-primary:active { transform: scale(0.96); }
  .tu-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(124,58,237,.38); color: #fff; }

  .tu-btn-outline {
    background: transparent;
    color: var(--tu-slate-700); font-weight: 700; font-size: .875rem;
    padding: 11px 28px; border-radius: 14px;
    border: 2px solid var(--tu-slate-200);
    transition: all .25s;
    text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  }
  .tu-btn-outline:active { transform: scale(0.96); }
  .tu-btn-outline:hover { border-color: var(--tu-violet-mid); color: var(--tu-violet); background: var(--tu-violet-light); transform: translateY(-2px); }

  .tu-btn-white {
    background: #fff; color: var(--tu-violet);
    font-weight: 700; font-size: .875rem;
    padding: 13px 32px; border-radius: 14px; border: none;
    box-shadow: 0 8px 32px rgba(0,0,0,.12);
    transition: all .25s;
    text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  }
  .tu-btn-white:active { transform: scale(0.96); }
  .tu-btn-white:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(0,0,0,.18); color: var(--tu-indigo); }

  .tu-btn-ghost {
    background: rgba(255,255,255,.12);
    border: 2px solid rgba(255,255,255,.3);
    color: #fff; font-weight: 700; font-size: .875rem;
    padding: 12px 32px; border-radius: 14px;
    transition: all .25s;
    text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  }
  .tu-btn-ghost:active { transform: scale(0.96); }
  .tu-btn-ghost:hover { background: rgba(255,255,255,.22); transform: translateY(-2px); color: #fff; }

  /* ─── Feature Card ─── */
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

  /* ─── Project Card ─── */
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

  /* ─── Skill Badge ─── */
  .tu-skill-badge {
    font-size: 11px; font-weight: 700;
    padding: 4px 12px; border-radius: 8px;
    background: var(--tu-violet-light);
    color: var(--tu-violet);
    border: 1px solid #ddd6fe;
    display: inline-block;
  }

  /* ─── Benefit Card ─── */
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

  /* ─── Stat Card ─── */
  .tu-stat-card {
    background: linear-gradient(160deg, #faf5ff 0%, #eff6ff 100%);
    border: 1.5px solid #e9d5ff;
    border-radius: var(--tu-radius-lg);
    padding: 36px 24px;
    text-align: center;
    transition: all .3s;
  }
  .tu-stat-card:hover { transform: translateY(-4px); box-shadow: var(--tu-shadow); border-color: #c4b5fd; }

  /* ─── Step Card ─── */
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

  /* ─── Testimonial ─── */
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

  /* ─── Pill Tag ─── */
  .tu-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 18px; border-radius: 100px;
    background: var(--tu-violet-light);
    border: 1px solid #ddd6fe;
    font-size: .8rem; font-weight: 700;
    color: var(--tu-violet); letter-spacing: .04em; text-transform: uppercase;
  }

  /* ─── Avatar ─── */
  .tu-avatar {
    width: 40px; height: 40px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: .8rem; color: #fff;
    flex-shrink: 0;
  }

  /* ─── Animations ─── */
  @keyframes floatModern1 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-15px) rotate(2deg)} }
  @keyframes floatModern2 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(12px) rotate(-1.5deg)} }
  @keyframes glowPulse { 0%,100%{opacity:0.4;filter:blur(20px)} 50%{opacity:0.8;filter:blur(35px)} }
  @keyframes pulseRing { 0%{transform:scale(0.8);opacity:0.6} 100%{transform:scale(1.3);opacity:0} }

  .float-m1 { animation: floatModern1 4s ease-in-out infinite; }
  .float-m2 { animation: floatModern2 4.5s ease-in-out infinite; }
  .glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
  .pulse-ring { animation: pulseRing 2s ease-out infinite; }

  .cta-orb1 { animation: floatModern1 6s ease-in-out infinite; }
  .cta-orb2 { animation: floatModern2 7s ease-in-out infinite; }

  /* ─── Footer ─── */
  .tu-footer { background: var(--tu-slate-900); color: var(--tu-slate-400); }
  .tu-footer-link {
    color: var(--tu-slate-500); text-decoration: none;
    font-size: .875rem; transition: color .2s;
    display: block; margin-bottom: 10px;
    cursor: pointer;
    touch-action: manipulation;
  }
  .tu-footer-link:hover { color: #a78bfa; }
  .tu-social-btn {
    width: 42px; height: 42px; border-radius: 10px;
    background: #1e293b;
    display: flex; align-items: center; justify-content: center;
    color: var(--tu-slate-500); transition: all .2s; text-decoration: none;
    cursor: pointer;
    touch-action: manipulation;
  }
  .tu-social-btn:hover, .tu-social-btn:active { background: var(--tu-violet); color: #fff; transform: translateY(-2px); }

  /* ─── Section Spacing ─── */
  .tu-section { padding: 96px 0; }
  .tu-section-sm { padding: 64px 0; }

  /* ─── Mobile Nav Toggle ─── */
  .tu-nav-toggle {
    border: 1.5px solid var(--tu-slate-200);
    border-radius: 10px;
    background: #fff;
    padding: 8px 12px;
    cursor: pointer;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .2s;
    min-width: 44px;
    min-height: 44px;
  }
  .tu-nav-toggle:hover, .tu-nav-toggle:active { border-color: var(--tu-violet); }

  /* ─── Mobile Responsive ─── */
  @media (max-width: 768px) {
    .tu-section { padding: 48px 0; }
    .tu-section-sm { padding: 32px 0; }
    .tu-testimonial { padding: 28px 20px; }
    .tu-quote-mark { font-size: 72px; top: 8px; right: 16px; }
    .tu-feature-card { padding: 24px; }
    .tu-stat-card { padding: 24px 16px; }
    .tu-btn-primary, .tu-btn-outline, .tu-btn-white, .tu-btn-ghost {
      padding: 12px 20px;
      font-size: .875rem;
      min-height: 48px;
      width: 100%;
      justify-content: center;
    }
    .tu-navbar { padding: 8px 0; }
    .tu-nav-link { padding: 6px 12px !important; font-size: .8rem; }
  }
  @media (max-width: 576px) {
    .tu-benefit-card { padding: 20px; }
    .tu-step-card { padding: 8px; }
    .tu-step-icon { width: 56px; height: 56px; }
  }
`;

/* ─── Inject CSS ──────────────────────────────────────────────────────────── */
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

/* ─── Scroll helper ────────────────────────────────────────────────────────── */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/* ─── Navigation handler ──────────────────────────────────────────────────── */
function handleNavigation(e, sectionId) {
  e.preventDefault();
  e.stopPropagation();
  scrollToSection(sectionId);
}

/* ─── Button handler ──────────────────────────────────────────────────────── */
function handleButtonClick(e, action) {
  e.preventDefault();
  e.stopPropagation();
  alert(action);
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAVBAR - Fully Responsive with Touch Support
═══════════════════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const closeMenu = () => setOpen(false);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Projects", id: "projects" },
    { label: "Features", id: "features" },
    { label: "About", id: "about" },
  ];

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
          <a 
            href="#home" 
            onClick={(e) => handleNavigation(e, 'home')}
            className="d-flex align-items-center gap-2 text-decoration-none"
            style={{ cursor: 'pointer' }}
          >
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
          </a>

          {/* Desktop links */}
          <div className="d-none d-md-flex align-items-center gap-1">
            {navItems.map(item => (
              <a 
                key={item.label} 
                href={`#${item.id}`}
                onClick={(e) => handleNavigation(e, item.id)}
                className="tu-nav-link"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="d-none d-md-flex align-items-center gap-3">
            <a 
              href="#login" 
              onClick={(e) => handleButtonClick(e, 'Login page would open')} 
              className="tu-nav-link"
            >
              Login
            </a>
            <a 
              href="#register" 
              onClick={(e) => handleButtonClick(e, 'Register page would open')} 
              className="tu-btn-primary" 
              style={{ padding: "10px 22px" }}
            >
              Get Started <FiArrowRight size={14} />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="d-md-none tu-nav-toggle"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={22} color="var(--tu-slate-700)" /> : <FiMenu size={22} color="var(--tu-slate-700)" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: "hidden", borderTop: "1px solid var(--tu-slate-100)", marginTop: 12 }}
            >
              <div className="py-2">
                {navItems.map(item => (
                  <a 
                    key={item.label} 
                    href={`#${item.id}`}
                    onClick={(e) => { handleNavigation(e, item.id); closeMenu(); }}
                    className="tu-nav-link-mobile"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="d-flex flex-column gap-3 mt-3 px-2">
                  <a 
                    href="#login" 
                    onClick={(e) => { handleButtonClick(e, 'Login page would open'); closeMenu(); }} 
                    className="tu-btn-outline w-100 justify-content-center"
                  >
                    Login
                  </a>
                  <a 
                    href="#register" 
                    onClick={(e) => { handleButtonClick(e, 'Register page would open'); closeMenu(); }} 
                    className="tu-btn-primary w-100 justify-content-center"
                  >
                    Get Started <FiArrowRight size={14} />
                  </a>
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
   HERO
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    { id: 1, title: "React Developer", status: "Available Now", statusColor: "#22c55e", icon: FiCode, gradient: "linear-gradient(135deg, #eff6ff, #dbeafe)", iconColor: "#3b82f6", className: "position-absolute top-0 start-0 translate-middle-md" },
    { id: 2, title: "UI/UX Designer", status: "Open to Collab", statusColor: "#f59e0b", icon: FiUser, gradient: "linear-gradient(135deg, #fdf2f8, #fce7f3)", iconColor: "#ec4899", className: "position-absolute top-0 end-0 translate-middle-md" },
    { id: 3, title: "Backend Engineer", status: "Available Now", statusColor: "#22c55e", icon: FiCpu, gradient: "linear-gradient(135deg, #f0fdf4, #dcfce7)", iconColor: "#10b981", className: "position-absolute bottom-0 start-0 translate-middle-md" },
    { id: 4, title: "Project Manager", status: "Actively Looking", statusColor: "#3b82f6", icon: FiBriefcase, gradient: "linear-gradient(135deg, #fffbeb, #fef3c7)", iconColor: "#f59e0b", className: "position-absolute bottom-0 end-0 translate-middle-md" },
    { id: 5, title: "ML Engineer", status: "Open to Work", statusColor: "#22c55e", icon: FiTarget, gradient: "linear-gradient(135deg, #f3e8ff, #ede9fe)", iconColor: "#7c3aed", className: "position-absolute top-0 start-50 translate-middle" },
  ];

  const floatVariants = {
    animate: (i) => ({
      y: i % 2 === 0 ? [-10, 10, -10] : [10, -10, 10],
      x: i % 3 === 0 ? [-5, 5, -5] : [5, -5, 5],
      rotate: i % 2 === 0 ? [-1, 1, -1] : [1, -1, 1],
      transition: {
        duration: 4 + (i % 3),
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  return (
    <section id="home"
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
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div className="glow-pulse" style={{ position: "absolute", top: "-10%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)" }} />
        <div className="glow-pulse" style={{ position: "absolute", bottom: "-10%", right: "-5%", width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)", animationDelay: "1.5s" }} />
      </div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center g-4 g-lg-5">

          <div className="col-lg-5">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
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

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, color: "#0f172a" }}
              >
                Build{" "}
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{
                    background: "linear-gradient(90deg, #7c3aed, #a78bfa, #4f46e5, #7c3aed)",
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

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                style={{ fontSize: "1rem", color: "#475569", lineHeight: 1.7, marginBottom: 32, maxWidth: 500 }}
              >
                Connect with talented developers, designers, and innovators to turn your ideas into successful projects.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="d-flex flex-wrap gap-3 mb-5"
              >
                <motion.a 
                  href="#projects" 
                  onClick={(e) => handleNavigation(e, 'projects')} 
                  className="tu-btn-primary" 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.96 }}
                >
                  Explore Projects <FiArrowRight size={15} />
                </motion.a>
                <motion.a 
                  href="#features" 
                  onClick={(e) => handleNavigation(e, 'features')} 
                  className="tu-btn-outline" 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.96 }}
                >
                  Create Project
                </motion.a>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="d-flex align-items-center gap-4 flex-wrap">
                <div className="d-flex">
                  {["#7c3aed", "#4f46e5", "#06b6d4", "#ec4899", "#f59e0b"].map((c, i) => (
                    <div
                      key={i}
                      style={{
                        width: 34, height: 34, borderRadius: 10, background: c, border: "2.5px solid #fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontWeight: 800, fontSize: ".65rem", marginLeft: i > 0 ? -10 : 0,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    >
                      {["A", "K", "M", "R", "S"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="d-flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => <FiStar key={i} size={13} style={{ fill: "#f59e0b", color: "#f59e0b" }} />)}
                  </div>
                  <p style={{ fontSize: ".75rem", color: "#64748b", margin: 0 }}>
                    <strong style={{ color: "#1e293b" }}>500+</strong> students building together
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="col-lg-7 d-none d-lg-block">
            <div className="d-flex justify-content-center align-items-center" style={{ width: "100%", height: 550, position: "relative" }}>
              <div style={{ position: "relative", width: 450, height: 320 }}>
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none", overflow: "visible" }}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="0" x2="225" y2="160" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="5,6" />
                  <line x1="450" y1="0" x2="225" y2="160" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="5,6" />
                  <line x1="0" y1="320" x2="225" y2="160" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="5,6" />
                  <line x1="450" y1="320" x2="225" y2="160" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="5,6" />
                  <line x1="225" y1="0" x2="225" y2="160" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="5,6" />
                </svg>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)", width: 190, height: 190,
                    borderRadius: 32, background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 60%, #4338ca 100%)",
                    boxShadow: "0 32px 64px rgba(109, 40, 217, 0.35), 0 0 0 2px rgba(255, 255, 255, 0.1) inset",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    zIndex: 10, textAlign: "center"
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <div className="pulse-ring" style={{ position: "absolute", width: "100%", height: "100%", borderRadius: 32, border: "2px solid rgba(255,255,255,0.25)" }} />
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255, 255, 255, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                    <FiUsers size={22} color="#fff" />
                  </div>
                  <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.35rem", color: "#fff", margin: 0 }}>4 Members</p>
                  <p style={{ fontSize: ".75rem", color: "rgba(255, 255, 255, 0.75)", margin: "2px 0 12px", fontWeight: 500 }}>Working Together</p>
                  <div style={{ display: "flex", gap: 5 }}>
                    {[20, 36, 44].map((w, i) => (
                      <div key={i} style={{ width: w, height: 4, borderRadius: 10, background: `rgba(255, 255, 255, ${0.2 + i * 0.25})` }} />
                    ))}
                  </div>
                </motion.div>

                {cards.map((card, idx) => {
                  const IconComponent = card.icon;
                  return (
                    <motion.div
                      key={card.id}
                      custom={idx}
                      variants={floatVariants}
                      animate="animate"
                      className={card.className}
                      style={{
                        background: "rgba(255, 255, 255, 0.98)",
                        backdropFilter: "blur(12px)",
                        border: `2px solid ${hoveredCard === card.id ? "var(--tu-violet)" : "rgba(255, 255, 255, 0.8)"}`,
                        borderRadius: 18,
                        padding: "10px 16px 10px 10px",
                        boxShadow: hoveredCard === card.id ? "0 20px 40px rgba(124,58,237,0.12)" : "0 10px 25px rgba(0, 0, 0, 0.05)",
                        display: "flex", alignItems: "center", gap: 10,
                        minWidth: 190, zIndex: 12, cursor: "pointer",
                        transition: "border-color 0.2s, box-shadow 0.2s",
                      }}
                      onMouseEnter={() => setHoveredCard(card.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      whileHover={{ scale: 1.05, zIndex: 20 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: card.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IconComponent size={18} color={card.iconColor} />
                      </div>
                      <div>
                        <p style={{ fontWeight: 800, fontSize: ".85rem", color: "#1e293b", margin: 0, whiteSpace: "nowrap" }}>{card.title}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 1 }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: card.statusColor, display: "inline-block" }} />
                          <p style={{ fontSize: ".65rem", color: card.statusColor, margin: 0, fontWeight: 700 }}>{card.status}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
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
                  <p className="tu-gradient-text" style={{ fontFamily: "Outfit,sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, margin: 0 }}>
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
    <section id="projects" className="tu-section" style={{ background: "#fff" }}>
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
                        onClick={(e) => { e.preventDefault(); alert(`Applied to ${p.title}`); }}
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
    <section id="about" className="tu-section" style={{ background: "linear-gradient(180deg, var(--tu-slate-50) 0%, #fff 100%)" }}>
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
                        <b.icon size={20} color="var(--tu-violet)" />
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
            <button 
              onClick={prev} 
              style={{ width: 44, height: 44, borderRadius: 12, border: "1.5px solid var(--tu-slate-200)", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--tu-violet)"; e.currentTarget.style.color = "var(--tu-violet)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tu-slate-200)"; e.currentTarget.style.color = ""; }}
            >
              <FiChevronLeft size={20} />
            </button>
            {list.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{ height: 8, width: i === active ? 28 : 8, borderRadius: 100, border: "none", background: i === active ? "var(--tu-violet)" : "var(--tu-slate-200)", cursor: "pointer", transition: "all .3s" }} />
            ))}
            <button 
              onClick={next} 
              style={{ width: 44, height: 44, borderRadius: 12, border: "1.5px solid var(--tu-slate-200)", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--tu-violet)"; e.currentTarget.style.color = "var(--tu-violet)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tu-slate-200)"; e.currentTarget.style.color = ""; }}
            >
              <FiChevronRight size={20} />
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
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
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
            <a 
              href="#projects" 
              onClick={(e) => handleNavigation(e, 'projects')} 
              className="tu-btn-white"
            >
              Start a Project <FiArrowRight size={16} />
            </a>
            <a 
              href="#features" 
              onClick={(e) => handleNavigation(e, 'features')} 
              className="tu-btn-ghost"
            >
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
  const platformLinks = [
    { label: "Projects", id: "projects" },
    { label: "Features", id: "features" },
    { label: "About", id: "about" },
    { label: "Home", id: "home" },
  ];
  const companyLinks = [
    { label: "About", id: "about" },
    { label: "Contact", id: "home" },
    { label: "Privacy Policy", id: "home" },
    { label: "Terms of Service", id: "home" },
  ];

  return (
    <footer className="tu-footer" style={{ paddingTop: 64, paddingBottom: 40 }}>
      <div className="container">
        <div className="row g-5 mb-5">
          <div className="col-lg-5">
            <a 
              href="#home" 
              onClick={(e) => handleNavigation(e, 'home')} 
              className="d-flex align-items-center gap-2 mb-4 text-decoration-none"
            >
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--tu-gradient)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FiLayers size={16} color="#fff" />
              </div>
              <span style={{ fontFamily: "Outfit,sans-serif", fontWeight: 900, fontSize: "1.15rem", color: "#fff" }}>TeamUp</span>
            </a>
            <p style={{ fontSize: ".875rem", lineHeight: 1.75, maxWidth: 320, color: "#64748b", marginBottom: 24 }}>
              The student project collaboration platform for builders, dreamers, and innovators.
            </p>
            <div className="d-flex gap-2">
              <a href="#" onClick={(e) => handleButtonClick(e, 'GitHub link')} className="tu-social-btn"><FiGithub size={16} /></a>
              <a href="#" onClick={(e) => handleButtonClick(e, 'LinkedIn link')} className="tu-social-btn"><FiLinkedin size={16} /></a>
              <a href="#" onClick={(e) => handleButtonClick(e, 'Twitter link')} className="tu-social-btn"><FiTwitter size={16} /></a>
            </div>
          </div>

          <div className="col-6 col-lg-3 offset-lg-1">
            <p style={{ fontWeight: 700, color: "#fff", fontSize: ".875rem", marginBottom: 18, letterSpacing: ".04em" }}>Platform</p>
            {platformLinks.map(l => (
              <a 
                key={l.label} 
                href={`#${l.id}`} 
                onClick={(e) => handleNavigation(e, l.id)} 
                className="tu-footer-link"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="col-6 col-lg-3">
            <p style={{ fontWeight: 700, color: "#fff", fontSize: ".875rem", marginBottom: 18, letterSpacing: ".04em" }}>Company</p>
            {companyLinks.map(l => (
              <a 
                key={l.label} 
                href={`#${l.id}`} 
                onClick={(e) => handleNavigation(e, l.id)} 
                className="tu-footer-link"
              >
                {l.label}
              </a>
            ))}
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