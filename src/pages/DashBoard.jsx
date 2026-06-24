import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../api/api";
import {
  FiPlusCircle, FiFolder, FiCompass, FiFileText, FiUser,
  FiLogOut, FiHome, FiTrendingUp, FiUsers, FiChevronRight,
  FiBell, FiSearch, FiX, FiMenu, FiLayers, FiArrowUpRight,
  FiZap, FiStar, FiClock, FiCheck, FiBarChart2, FiAward,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Design Tokens ──────────────────────────── */
const T = {
  bg:       "#f5f3ff",
  surface:  "#ffffff",
  border:   "#e8e5f0",
  primary:  "#7c3aed",
  primaryL: "#ede9fe",
  primaryD: "#5b21b6",
  accent:   "#8b5cf6",
  accentL:  "#e9d5ff",
  success:  "#10b981",
  successL: "#d1fae5",
  warning:  "#f59e0b",
  warningL: "#fef3c7",
  danger:   "#ef4444",
  dangerL:  "#fee2e2",
  text:     "#1e1b2e",
  muted:    "#6d6b7a",
  subtle:   "#a8a6b5",
  white:    "#ffffff",
  purple1:  "#7c3aed",
  purple2:  "#6d28d9",
  purple3:  "#5b21b6",
  purple4:  "#4c1d95",
};

const shadow = {
  sm: "0 1px 3px rgba(124,58,237,0.07), 0 1px 2px rgba(0,0,0,0.04)",
  md: "0 4px 16px rgba(124,58,237,0.10), 0 2px 6px rgba(0,0,0,0.05)",
  lg: "0 10px 32px rgba(124,58,237,0.13), 0 4px 12px rgba(0,0,0,0.06)",
};

/* ─── Helpers ────────────────────────────────── */
function avatar(name) {
  return (name || "?").split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

function timeAgo(date) {
  if (!date) return "";
  const diff = (Date.now() - new Date(date)) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Rise and shine";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Night owl";
}

/* ─── Micro Components ───────────────────────── */
function Badge({ children, color = T.primary, bg = T.primaryL }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      background: bg, color, fontSize: "11px", fontWeight: 600,
      letterSpacing: "0.04em", padding: "2px 9px",
      borderRadius: "999px",
    }}>{children}</span>
  );
}

function Pill({ children, color, bg }) {
  return <Badge color={color} bg={bg}>{children}</Badge>;
}

function Avatar({ name, size = 36 }) {
  const colors = [
    [T.primary, T.primaryL],
    [T.accent, T.accentL],
    [T.success, T.successL],
    [T.warning, T.warningL],
  ];
  const idx = (name || "").charCodeAt(0) % 4;
  const [fg, bg] = colors[idx];
  return (
    <div style={{
      width: size, height: size, borderRadius: "10px",
      background: bg, color: fg, fontSize: size * 0.35,
      fontWeight: 700, display: "flex", alignItems: "center",
      justifyContent: "center", flexShrink: 0, letterSpacing: "-0.5px",
    }}>
      {avatar(name)}
    </div>
  );
}

function Stat({ label, value, icon: Icon, color, bg, trend, sub }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: shadow.lg }}
      transition={{ duration: 0.2 }}
      style={{
        background: T.surface, borderRadius: "20px", padding: "24px",
        boxShadow: shadow.sm, border: `1px solid ${T.border}`,
        display: "flex", flexDirection: "column", gap: "12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute",
        top: -40,
        right: -40,
        width: 100,
        height: 100,
        background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
        borderRadius: "50%",
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
        <div style={{ background: bg, borderRadius: "12px", padding: "10px" }}>
          <Icon size={20} color={color} />
        </div>
        {trend && (
          <span style={{
            display: "flex", alignItems: "center", gap: "3px",
            background: T.successL, color: T.success,
            fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "999px",
          }}>
            <FiTrendingUp size={10} /> {trend}
          </span>
        )}
      </div>
      <div style={{ position: "relative" }}>
        <p style={{ fontSize: "32px", fontWeight: 800, color: T.text, margin: 0, lineHeight: 1, letterSpacing: "-1px" }}>
          {value}
        </p>
        <p style={{ fontSize: "13px", color: T.muted, margin: "4px 0 0", fontWeight: 500 }}>{label}</p>
        {sub && <p style={{ fontSize: "11px", color: T.subtle, margin: "2px 0 0" }}>{sub}</p>}
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }) {
  const accentColors = [
    [T.primary, T.primaryL],
    [T.accent, T.accentL],
    [T.success, T.successL],
    [T.warning, T.warningL],
  ];
  const [col, bg] = accentColors[index % accentColors.length];
  const fill = Math.round(((project.currentMembers || 0) / Math.max(project.teamSize || 1, 1)) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -4, boxShadow: shadow.lg }}
      style={{
        background: T.surface, borderRadius: "20px", padding: "22px",
        boxShadow: shadow.sm, border: `1px solid ${T.border}`,
        display: "flex", flexDirection: "column", gap: "14px",
        cursor: "pointer", transition: "box-shadow 0.2s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
        <div style={{ background: bg, borderRadius: "10px", padding: "8px", flexShrink: 0 }}>
          <FiFolder size={18} color={col} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {project.title}
          </h4>
          <p style={{ margin: "2px 0 0", fontSize: "11px", color: T.subtle }}>{project.projectType}</p>
        </div>
        <Pill color={project.mode === "Remote" ? T.success : T.warning} bg={project.mode === "Remote" ? T.successL : T.warningL}>
          {project.mode}
        </Pill>
      </div>

      <p style={{ margin: 0, fontSize: "13px", color: T.muted, lineHeight: "1.55", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {project.description || "No description provided."}
      </p>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
          <span style={{ fontSize: "11px", color: T.muted, display: "flex", alignItems: "center", gap: "4px" }}>
            <FiUsers size={11} /> Team
          </span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: T.text }}>
            {project.currentMembers || 0} / {project.teamSize}
          </span>
        </div>
        <div style={{ height: "5px", background: T.border, borderRadius: "99px", overflow: "hidden" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${fill}%` }}
            transition={{ duration: 0.7, delay: 0.2 + index * 0.07 }}
            style={{ height: "100%", background: col, borderRadius: "99px" }}
          />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px", borderTop: `1px solid ${T.border}` }}>
        <span style={{ fontSize: "11px", color: T.subtle, display: "flex", alignItems: "center", gap: "4px" }}>
          <FiClock size={11} /> {timeAgo(project.createdAt)}
        </span>
        <Link to={`/project/${project._id}`} style={{
          fontSize: "12px", fontWeight: 600, color: col,
          textDecoration: "none", display: "flex", alignItems: "center", gap: "3px",
        }}>
          View <FiArrowUpRight size={12} />
        </Link>
      </div>
    </motion.div>
  );
}

function AppCard({ app, index }) {
  const statusMap = {
    pending:  { color: T.warning,  bg: T.warningL,  label: "Pending" },
    accepted: { color: T.success,  bg: T.successL,  label: "Accepted" },
    rejected: { color: T.danger,   bg: T.dangerL,   label: "Rejected" },
  };
  const s = statusMap[app.status] || statusMap.pending;
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      style={{
        display: "flex", alignItems: "center", gap: "12px",
        padding: "14px 16px", background: T.surface,
        borderRadius: "14px", border: `1px solid ${T.border}`,
        boxShadow: shadow.sm,
      }}
    >
      <Avatar name={app.project?.title || "P"} size={38} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {app.project?.title || "Project"}
        </p>
        <p style={{ margin: "2px 0 0", fontSize: "11px", color: T.subtle }}>{timeAgo(app.createdAt)}</p>
      </div>
      <Pill color={s.color} bg={s.bg}>{s.label}</Pill>
    </motion.div>
  );
}

/* ─── Sidebar ────────────────────────────────── */
function Sidebar({ open, onClose }) {
  const location = useLocation();

  const nav = [
    { to: "/dashboard",          icon: FiHome,       label: "Home" },
    { to: "/create-project",     icon: FiPlusCircle, label: "New project" },
    { to: "/my-projects",        icon: FiFolder,     label: "My projects" },
    { to: "/explore-projects",   icon: FiCompass,    label: "Explore" },
    { to: "/my-applications",    icon: FiFileText,   label: "Applications" },
    { to: "/profile",            icon: FiUser,       label: "Profile" },
  ];

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const inner = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "24px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px", padding: "0 8px" }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "12px",
          background: `linear-gradient(135deg, ${T.primary} 0%, ${T.accent} 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 12px ${T.primary}40`,
        }}>
          <FiLayers size={18} color="#fff" />
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 800, fontSize: "16px", color: T.text, letterSpacing: "-0.4px" }}>CollabHub</p>
          <p style={{ margin: 0, fontSize: "10px", color: T.muted }}>Creative workspace</p>
        </div>
        <button onClick={onClose} style={{ marginLeft: "auto", display: "none", background: "none", border: "none", cursor: "pointer" }} className="sidebar-close">
          <FiX size={20} color={T.muted} />
        </button>
      </div>

      <nav style={{ flex: 1 }}>
        <p style={{ fontSize: "10px", fontWeight: 700, color: T.subtle, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 10px", marginBottom: "6px" }}>Navigation</p>
        {nav.map(item => {
          const active = location.pathname === item.to;
          return (
            <motion.div key={item.to} whileHover={{ x: 2 }} transition={{ duration: 0.15 }}>
              <Link
                to={item.to}
                onClick={onClose}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 12px", borderRadius: "12px", marginBottom: "2px",
                  color: active ? T.primary : T.muted,
                  background: active ? T.primaryL : "transparent",
                  textDecoration: "none", fontSize: "14px",
                  fontWeight: active ? 600 : 400,
                  transition: "all 0.15s",
                }}
              >
                <item.icon size={16} />
                {item.label}
                {active && (
                  <div style={{ marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", background: T.primary }} />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 10px", borderRadius: "12px", marginBottom: "8px", background: T.bg }}>
          <Avatar name={user.name} size={34} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name || "User"}</p>
            <p style={{ margin: 0, fontSize: "11px", color: T.subtle, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email || "member"}</p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={logout}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            width: "100%", padding: "10px 12px", borderRadius: "12px",
            background: "transparent", border: `1px solid ${T.border}`,
            color: T.muted, fontSize: "13px", fontWeight: 500, cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = T.dangerL; e.currentTarget.style.color = T.danger; e.currentTarget.style.borderColor = T.danger + "44"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.muted; e.currentTarget.style.borderColor = T.border; }}
        >
          <FiLogOut size={15} /> Sign out
        </motion.button>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .sidebar-close { display: flex !important; }
          .sidebar-overlay { display: flex !important; }
        }
        @media (min-width: 769px) {
          .sidebar-mobile-drawer { display: none !important; }
        }
      `}</style>

      <aside className="sidebar-desktop" style={{
        width: "240px", minWidth: "240px", background: T.surface,
        borderRight: `1px solid ${T.border}`, position: "sticky",
        top: 0, height: "100vh", overflowY: "auto", flexShrink: 0,
      }}>
        {inner}
      </aside>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="sidebar-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={onClose}
              style={{
                display: "none", position: "fixed", inset: 0,
                background: "rgba(0,0,0,0.35)", zIndex: 40,
              }}
            />
            <motion.aside
              className="sidebar-mobile-drawer"
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                position: "fixed", left: 0, top: 0, bottom: 0, width: "260px",
                background: T.surface, zIndex: 50, overflowY: "auto",
                borderRight: `1px solid ${T.border}`,
              }}
            >
              {inner}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Main Dashboard ─────────────────────────── */
export default function Dashboard() {
  const [myProjects,    setMyProjects]    = useState([]);
  const [allProjects,   setAllProjects]   = useState([]);
  const [applications,  setApplications]  = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [searchTerm,    setSearchTerm]    = useState("");
  const [sidebarOpen,   setSidebarOpen]   = useState(false);
  const [activeTab,     setActiveTab]     = useState("projects");
  const [notifOpen,     setNotifOpen]     = useState(false);
  const notifRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchData();
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const fetchData = async () => {
    try {
      const [a, b, c] = await Promise.all([
        api.get("/project/my"),
        api.get("/project"),
        api.get("/application/my"),
      ]);
      setMyProjects(a.data.projects   || []);
      setAllProjects(b.data.projects  || []);
      setApplications(c.data.applications || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = myProjects.filter(p =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const totalProjects = myProjects.length;
  const totalOpen = allProjects.length;
  const totalApps = applications.length;
  const acceptedApps = applications.filter(a => a.status === "accepted").length;
  const pendingApps = applications.filter(a => a.status === "pending").length;
  const rejectedApps = applications.filter(a => a.status === "rejected").length;
  const completionRate = totalApps > 0 ? Math.round((acceptedApps / totalApps) * 100) : 0;
  const teamMembers = myProjects.reduce((sum, p) => sum + (p.currentMembers || 0), 0);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "14px",
          background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 8px 24px ${T.primary}40`,
        }}>
          <FiLayers size={22} color="#fff" />
        </div>
        <div>
          <motion.div
            animate={{ width: ["0%", "100%"] }}
            transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
            style={{ height: "3px", background: `linear-gradient(90deg, ${T.primary}, ${T.accent})`, borderRadius: "99px", width: "120px" }}
          />
        </div>
        <p style={{ color: T.muted, fontSize: "14px", margin: 0 }}>Loading your workspace…</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.bg, fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 99px; }
        input::placeholder { color: ${T.subtle}; }
        @media (max-width: 1024px) {
          .main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .project-grid { grid-template-columns: 1fr !important; }
          .hero-actions { flex-direction: column !important; gap: 8px !important; }
          .topbar-search { display: none !important; }
          .topbar-title { font-size: 20px !important; }
        }
        @media (min-width: 641px) and (max-width: 1023px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .project-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        .tab-btn:hover { background: ${T.primaryL} !important; color: ${T.primary} !important; }
        .quick-action:hover { background: ${T.primaryL} !important; border-color: ${T.primary}44 !important; }
        .notif-item:hover { background: ${T.bg} !important; }
      `}</style>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, maxHeight: "100vh", overflowY: "auto" }}>

        {/* Top bar */}
        <header style={{
          position: "sticky", top: 0, zIndex: 30,
          background: "rgba(245,243,255,0.85)", backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${T.border}`,
          padding: "14px 24px", display: "flex", alignItems: "center", gap: "12px",
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "4px" }}
            className="hamburger"
          >
            <FiMenu size={22} color={T.text} />
          </button>
          <style>{`@media (max-width: 768px) { .hamburger { display: flex !important; } }`}</style>

          <div style={{ flex: 1 }}>
            <h1 className="topbar-title" style={{ margin: 0, fontSize: "22px", fontWeight: 800, color: T.text, letterSpacing: "-0.5px" }}>
              {getGreeting()}, {user.name?.split(" ")[0] || "there"} ✨
            </h1>
            <p style={{ margin: 0, fontSize: "12px", color: T.muted }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          <div className="topbar-search" style={{ position: "relative" }}>
            <FiSearch size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: T.subtle }} />
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search projects…"
              style={{
                paddingLeft: "36px", paddingRight: "14px", paddingTop: "9px", paddingBottom: "9px",
                width: "220px", borderRadius: "12px",
                border: `1px solid ${T.border}`, background: T.surface,
                fontSize: "13px", color: T.text, outline: "none",
                boxShadow: shadow.sm, transition: "border-color 0.15s",
              }}
              onFocus={e => e.target.style.borderColor = T.primary}
              onBlur={e => e.target.style.borderColor = T.border}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                <FiX size={13} color={T.subtle} />
              </button>
            )}
          </div>

          <div ref={notifRef} style={{ position: "relative" }}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              style={{
                position: "relative", width: "38px", height: "38px", borderRadius: "11px",
                background: T.surface, border: `1px solid ${T.border}`, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", boxShadow: shadow.sm,
              }}
            >
              <FiBell size={16} color={T.muted} />
              {applications.filter(a => a.status === "pending").length > 0 && (
                <span style={{
                  position: "absolute", top: "7px", right: "7px",
                  width: "8px", height: "8px", background: T.danger,
                  borderRadius: "50%", border: `2px solid ${T.surface}`,
                  animation: "pulse 2s infinite",
                }} />
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: "absolute", right: 0, top: "calc(100% + 8px)",
                    width: "300px", background: T.surface, borderRadius: "16px",
                    border: `1px solid ${T.border}`, boxShadow: shadow.lg,
                    zIndex: 100, overflow: "hidden",
                  }}
                >
                  <div style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: "14px", color: T.text }}>🔔 Notifications</p>
                    <Badge color={T.danger} bg={T.dangerL}>{applications.filter(a => a.status === "pending").length} pending</Badge>
                  </div>
                  <div style={{ maxHeight: "280px", overflowY: "auto" }}>
                    {applications.length === 0 ? (
                      <p style={{ margin: 0, padding: "20px 16px", color: T.subtle, fontSize: "13px", textAlign: "center" }}>No notifications</p>
                    ) : applications.slice(0, 5).map((app, i) => (
                      <div key={i} className="notif-item" style={{ padding: "12px 16px", borderBottom: `1px solid ${T.border}`, cursor: "pointer", transition: "background 0.15s" }}>
                        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                          <Avatar name={app.project?.title || "P"} size={32} />
                          <div>
                            <p style={{ margin: 0, fontSize: "13px", color: T.text, fontWeight: 500 }}>Application {app.status}</p>
                            <p style={{ margin: "2px 0 0", fontSize: "11px", color: T.subtle }}>{app.project?.title} · {timeAgo(app.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "10px 16px" }}>
                    <Link to="/my-applications" onClick={() => setNotifOpen(false)} style={{ fontSize: "13px", color: T.primary, textDecoration: "none", fontWeight: 600 }}>
                      View all applications →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/profile" style={{ textDecoration: "none", flexShrink: 0 }}>
            <Avatar name={user.name} size={38} />
          </Link>
        </header>

        {/* Page body */}
        <div style={{ flex: 1, padding: "28px 24px 40px", maxWidth: "1280px", width: "100%", margin: "0 auto" }}>

          {/* Hero - Purple Gradient Theme */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              background: `linear-gradient(135deg, #7c3aed 0%, #8b5cf6 30%, #a78bfa 60%, #c4b5fd 100%)`,
              borderRadius: "24px", padding: "32px 36px",
              marginBottom: "28px", position: "relative", overflow: "hidden",
              boxShadow: `0 12px 40px rgba(124,58,237,0.35)`,
            }}
          >
            <div style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 300,
              height: 300,
              background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
              borderRadius: "50%",
            }} />
            <div style={{
              position: "absolute",
              bottom: -60,
              left: -60,
              width: 200,
              height: 200,
              background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
              borderRadius: "50%",
            }} />
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              height: 400,
              background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
              borderRadius: "50%",
            }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", position: "relative" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: "8px", padding: "4px 12px", display: "flex", alignItems: "center", gap: "5px" }}>
                    <FiZap size={12} color="#fff" />
                    <span style={{ color: "#fff", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em" }}>WORKSPACE</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "8px", padding: "4px 12px" }}>
                    <span style={{ color: "#fff", fontSize: "11px", fontWeight: 600 }}>🎯 {new Date().getFullYear()}</span>
                  </div>
                </div>
                <h2 style={{ color: "#fff", fontSize: "26px", fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.5px" }}>
                  Your creative hub is ready ✨
                </h2>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", margin: 0 }}>
                  {allProjects.length} projects available · {applications.length} applications sent · {teamMembers} team members
                </p>
              </div>
              <div className="hero-actions" style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/create-project" style={{
                    background: "#fff", color: T.primary,
                    padding: "12px 24px", borderRadius: "40px",
                    fontSize: "14px", fontWeight: 700, textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: "7px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  }}>
                    <FiPlusCircle size={16} /> New project
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/explore-projects" style={{
                    background: "rgba(255,255,255,0.2)", color: "#fff",
                    padding: "12px 24px", borderRadius: "40px",
                    fontSize: "14px", fontWeight: 600, textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: "7px",
                    border: "1px solid rgba(255,255,255,0.3)",
                    backdropFilter: "blur(10px)",
                  }}>
                    Explore <FiCompass size={14} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Stats - 4 columns with more info */}
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
            {[
              { label: "My Projects", value: totalProjects, icon: FiFolder, color: T.primary, bg: T.primaryL, trend: "+12%", sub: `${teamMembers} members` },
              { label: "Open Projects", value: totalOpen, icon: FiCompass, color: T.accent, bg: T.accentL, trend: "+8%", sub: "Available" },
              { label: "Applications", value: totalApps, icon: FiFileText, color: T.success, bg: T.successL, trend: "+5%", sub: `${acceptedApps} accepted` },
              { label: "Success Rate", value: `${completionRate}%`, icon: FiAward, color: T.warning, bg: T.warningL, trend: `${completionRate > 50 ? '📈' : '📉'}`, sub: `${pendingApps} pending` },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}>
                <Stat {...s} />
              </motion.div>
            ))}
          </div>

          {/* Quick actions */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ marginBottom: "28px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: T.subtle, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 12px" }}>⚡ Quick actions</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" }}>
              {[
                { to: "/create-project",   label: "New project",   icon: FiPlusCircle, color: T.primary, bg: T.primaryL },
                { to: "/explore-projects", label: "Explore",       icon: FiCompass,    color: T.accent,  bg: T.accentL },
                { to: "/my-applications",  label: "Applications",  icon: FiFileText,   color: T.success, bg: T.successL },
                { to: "/profile",          label: "Profile",       icon: FiUser,       color: T.warning, bg: T.warningL },
              ].map(a => (
                <motion.div key={a.to} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                  <Link to={a.to} className="quick-action" style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    gap: "10px", padding: "18px 12px", borderRadius: "16px",
                    background: T.surface, border: `1px solid ${T.border}`,
                    textDecoration: "none", transition: "all 0.15s",
                    boxShadow: shadow.sm,
                  }}>
                    <div style={{ background: a.bg, borderRadius: "12px", padding: "10px" }}>
                      <a.icon size={20} color={a.color} />
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: T.text, textAlign: "center" }}>{a.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main grid */}
          <div className="main-grid" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" }}>

            {/* Left: Tabs → Projects / Applications */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                <div style={{ display: "flex", gap: "4px", background: T.surface, padding: "4px", borderRadius: "14px", border: `1px solid ${T.border}`, boxShadow: shadow.sm }}>
                  {[
                    { key: "projects",     label: "📁 My projects",   count: myProjects.length },
                    { key: "applications", label: "📄 Applications",  count: applications.length },
                  ].map(tab => (
                    <button key={tab.key} className="tab-btn" onClick={() => setActiveTab(tab.key)} style={{
                      padding: "8px 16px", borderRadius: "10px", border: "none",
                      background: activeTab === tab.key ? T.primary : "transparent",
                      color: activeTab === tab.key ? "#fff" : T.muted,
                      fontSize: "13px", fontWeight: activeTab === tab.key ? 600 : 400,
                      cursor: "pointer", transition: "all 0.2s",
                      display: "flex", alignItems: "center", gap: "6px",
                    }}>
                      {tab.label}
                      <span style={{
                        background: activeTab === tab.key ? "rgba(255,255,255,0.25)" : T.border,
                        color: activeTab === tab.key ? "#fff" : T.muted,
                        borderRadius: "99px", padding: "1px 7px", fontSize: "11px", fontWeight: 700,
                      }}>{tab.count}</span>
                    </button>
                  ))}
                </div>
                {activeTab === "projects" && myProjects.length > 0 && (
                  <Link to="/my-projects" style={{ color: T.primary, fontSize: "13px", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
                    View all <FiChevronRight size={14} />
                  </Link>
                )}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "projects" && (
                  <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    {filtered.length === 0 ? (
                      <div style={{
                        background: T.surface, borderRadius: "20px", padding: "48px 24px",
                        textAlign: "center", border: `1px dashed ${T.border}`, boxShadow: shadow.sm,
                      }}>
                        <div style={{ background: T.primaryL, borderRadius: "16px", padding: "16px", display: "inline-flex", marginBottom: "16px" }}>
                          <FiFolder size={32} color={T.primary} />
                        </div>
                        <h3 style={{ color: T.text, margin: "0 0 8px", fontSize: "18px" }}>
                          {searchTerm ? "No matching projects" : "No projects yet"}
                        </h3>
                        <p style={{ color: T.muted, margin: "0 0 20px", fontSize: "14px" }}>
                          {searchTerm ? `No projects match "${searchTerm}"` : "Start building something great with your team."}
                        </p>
                        {!searchTerm && (
                          <Link to="/create-project" style={{
                            background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
                            color: "#fff", padding: "11px 24px", borderRadius: "40px",
                            textDecoration: "none", fontSize: "14px", fontWeight: 600,
                            display: "inline-flex", alignItems: "center", gap: "7px",
                            boxShadow: `0 6px 18px ${T.primary}40`,
                          }}>
                            <FiPlusCircle size={16} /> Create first project
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div className="project-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                        {filtered.slice(0, 6).map((p, i) => (
                          <ProjectCard key={p._id} project={p} index={i} />
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "applications" && (
                  <motion.div key="apps" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    {applications.length === 0 ? (
                      <div style={{ background: T.surface, borderRadius: "20px", padding: "48px 24px", textAlign: "center", border: `1px dashed ${T.border}` }}>
                        <div style={{ background: T.accentL, borderRadius: "16px", padding: "16px", display: "inline-flex", marginBottom: "16px" }}>
                          <FiFileText size={32} color={T.accent} />
                        </div>
                        <h3 style={{ color: T.text, margin: "0 0 8px" }}>No applications yet</h3>
                        <p style={{ color: T.muted, margin: "0 0 20px", fontSize: "14px" }}>Browse open projects and apply to join a team.</p>
                        <Link to="/explore-projects" style={{
                          background: `linear-gradient(135deg, ${T.accent}, ${T.primary})`,
                          color: "#fff", padding: "11px 24px", borderRadius: "40px",
                          textDecoration: "none", fontSize: "14px", fontWeight: 600,
                          display: "inline-flex", alignItems: "center", gap: "7px",
                        }}>
                          <FiCompass size={16} /> Explore projects
                        </Link>
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {applications.map((a, i) => <AppCard key={a._id || i} app={a} index={i} />)}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right panel - Filled with data */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Available projects highlight */}
              <div style={{ background: T.surface, borderRadius: "20px", border: `1px solid ${T.border}`, overflow: "hidden", boxShadow: shadow.sm }}>
                <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: "14px", color: T.text }}>🌍 Open projects</p>
                  <Link to="/explore-projects" style={{ color: T.primary, fontSize: "12px", fontWeight: 600, textDecoration: "none" }}>See all</Link>
                </div>
                <div style={{ padding: "12px" }}>
                  {allProjects.length === 0 ? (
                    <p style={{ margin: "8px", color: T.subtle, fontSize: "13px", textAlign: "center" }}>No open projects</p>
                  ) : allProjects.slice(0, 5).map((p, i) => (
                    <motion.div key={p._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                      <Link to={`/project/${p._id}`} style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        padding: "10px", borderRadius: "12px", textDecoration: "none",
                        transition: "background 0.15s",
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = T.bg}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <Avatar name={p.title} size={36} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</p>
                          <p style={{ margin: "2px 0 0", fontSize: "11px", color: T.subtle }}>{p.projectType} · {p.mode}</p>
                        </div>
                        <FiChevronRight size={14} color={T.subtle} />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats Overview - Filled with real data */}
              <div style={{ background: T.surface, borderRadius: "20px", border: `1px solid ${T.border}`, padding: "20px", boxShadow: shadow.sm }}>
                <p style={{ margin: "0 0 16px", fontWeight: 700, fontSize: "14px", color: T.text, display: "flex", alignItems: "center", gap: "6px" }}>
                  <FiBarChart2 size={16} /> Your stats
                </p>
                {[
                  { label: "Projects owned",  val: totalProjects, max: Math.max(totalOpen + totalProjects, 1), color: T.primary },
                  { label: "Apps accepted",   val: acceptedApps, max: Math.max(totalApps, 1), color: T.success },
                  { label: "Apps pending",    val: pendingApps, max: Math.max(totalApps, 1), color: T.warning },
                  { label: "Apps rejected",   val: rejectedApps, max: Math.max(totalApps, 1), color: T.danger },
                ].map((row, i) => (
                  <div key={i} style={{ marginBottom: i < 3 ? "14px" : 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                      <span style={{ fontSize: "12px", color: T.muted }}>{row.label}</span>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: T.text }}>{row.val}</span>
                    </div>
                    <div style={{ height: "6px", background: T.border, borderRadius: "99px", overflow: "hidden" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((row.val / row.max) * 100, 100)}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                        style={{ height: "100%", background: row.color, borderRadius: "99px" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA - Purple theme */}
              <motion.div whileHover={{ scale: 1.02 }} style={{
                background: `linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)`,
                borderRadius: "20px", padding: "28px 24px", textAlign: "center",
                boxShadow: `0 12px 40px rgba(124,58,237,0.35)`,
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 150,
                  height: 150,
                  background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                  borderRadius: "50%",
                }} />
                <div style={{
                  position: "absolute",
                  bottom: -40,
                  left: -40,
                  width: 120,
                  height: 120,
                  background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
                  borderRadius: "50%",
                }} />
                <div style={{ position: "relative" }}>
                  <FiStar size={32} color="rgba(255,255,255,0.9)" style={{ marginBottom: "12px" }} />
                  <p style={{ color: "#fff", fontWeight: 800, fontSize: "18px", margin: "0 0 6px", letterSpacing: "-0.3px" }}>
                    Find your next team
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", margin: "0 0 18px" }}>
                    {allProjects.length} projects looking for collaborators
                  </p>
                  <Link to="/explore-projects" style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    background: "#fff", color: "#6d28d9",
                    padding: "10px 28px", borderRadius: "50px",
                    fontSize: "14px", fontWeight: 700, textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'; }}>
                    Explore now <FiArrowUpRight size={16} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
        .quick-action:hover {
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  );
}