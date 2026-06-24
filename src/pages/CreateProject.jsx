import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

/* ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
   Palette: bright white base, vivid violet primary, coral accent, amber pop
   Signature: animated gradient border that traces the card on mount
──────────────────────────────────────────────────────────────────────────────── */

const C = {
  violet:     "#7c3aed",
  violetLight:"#ede9fe",
  violetMid:  "#ddd6fe",
  coral:      "#f97316",
  coralLight: "#fff7ed",
  amber:      "#f59e0b",
  amberLight: "#fffbeb",
  rose:       "#f43f5e",
  sky:        "#0ea5e9",
  teal:       "#14b8a6",
  white:      "#ffffff",
  offWhite:   "#fafafa",
  surface:    "#f8f7ff",
  text:       "#1e1b4b",
  muted:      "#6b7280",
  border:     "#e5e7eb",
};

const STEP_META = [
  { icon: "📋", label: "Basics",     color: C.violet },
  { icon: "🛠️", label: "Skills",     color: C.coral  },
  { icon: "✅", label: "Confirm",    color: C.teal   },
];

const PROJECT_TYPES = [
  { value: "College Project", icon: "🎓", color: "#7c3aed", bg: "#ede9fe" },
  { value: "Hackathon",       icon: "⚡", color: "#f59e0b", bg: "#fffbeb" },
  { value: "Startup Idea",    icon: "🚀", color: "#f97316", bg: "#fff7ed" },
  { value: "Open Source",     icon: "🌐", color: "#0ea5e9", bg: "#e0f2fe" },
  { value: "Freelance",       icon: "💼", color: "#14b8a6", bg: "#f0fdfa" },
];

const MODES = [
  { value: "Online",  icon: "💻", color: "#7c3aed" },
  { value: "Offline", icon: "🏢", color: "#f97316" },
  { value: "Hybrid",  icon: "🔀", color: "#14b8a6" },
];

const SKILL_CHIPS = ["React","Node.js","MongoDB","Python","TypeScript",
  "Flutter","Django","Vue","PostgreSQL","Docker","Figma","Next.js","GraphQL","AWS"];

/* ─── SUB COMPONENTS ─────────────────────────────────────────────────────────── */

function css(obj){ return obj; }

function StepBar({ step }) {
  return (
    <div style={{ display:"flex", alignItems:"center", marginBottom:36 }}>
      {STEP_META.map((s, i) => (
        <div key={s.label} style={{ display:"flex", alignItems:"center", flex: i<2 ? 1 : "unset" }}>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <div style={{
              width:44, height:44, borderRadius:"50%",
              background: i < step  ? "linear-gradient(135deg,"+C.violet+","+C.teal+")"
                        : i === step ? s.color
                        : C.border,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize: i<step ? 18 : 20,
              boxShadow: i===step ? "0 0 0 4px "+s.color+"33, 0 4px 14px "+s.color+"55" : "none",
              transition:"all 0.35s",
              color: i<=step ? C.white : C.muted,
              fontWeight:700,
            }}>
              {i < step ? "✓" : s.icon}
            </div>
            <span style={{
              fontSize:11, fontWeight:600, letterSpacing:0.5,
              color: i===step ? s.color : C.muted,
              transition:"color 0.3s",
            }}>{s.label}</span>
          </div>
          {i < 2 && (
            <div style={{
              flex:1, height:3, margin:"0 8px", marginBottom:18, borderRadius:99,
              background: i < step
                ? "linear-gradient(90deg,"+C.violet+","+C.teal+")"
                : C.border,
              transition:"background 0.5s",
            }}/>
          )}
        </div>
      ))}
    </div>
  );
}

function InputField({ label, required, error, hint, children }) {
  return (
    <div style={{ marginBottom:20 }}>
      {label && (
        <label style={{ display:"block", fontSize:13, fontWeight:600,
          color: error ? C.rose : C.text, marginBottom:7, letterSpacing:0.2 }}>
          {label}{required && <span style={{ color:C.coral, marginLeft:3 }}>*</span>}
        </label>
      )}
      {children}
      {error && (
        <div style={{ marginTop:5, fontSize:12, color:C.rose, display:"flex", alignItems:"center", gap:4 }}>
          <span>⚠</span> {error}
        </div>
      )}
      {hint && !error && (
        <div style={{ marginTop:5, fontSize:12, color:C.muted }}>{hint}</div>
      )}
    </div>
  );
}

function TextInput({ value, onChange, name, placeholder, type="text", min, error, onFocus, onBlur, focused }) {
  return (
    <input
      type={type} name={name} value={value} min={min}
      onChange={onChange} onFocus={onFocus} onBlur={onBlur}
      placeholder={placeholder}
      style={{
        width:"100%", boxSizing:"border-box",
        padding:"12px 16px", fontSize:15,
        background: C.white,
        border: `2px solid ${error ? C.rose : focused ? C.violet : C.border}`,
        borderRadius:12, outline:"none", color:C.text,
        boxShadow: focused && !error ? "0 0 0 4px "+C.violetMid : "none",
        transition:"border 0.2s, box-shadow 0.2s",
        fontFamily:"inherit",
      }}
    />
  );
}

function FocusInput({ name, value, onChange, placeholder, type="text", min, error }) {
  const [f,setF] = useState(false);
  return <TextInput name={name} value={value} onChange={onChange}
    placeholder={placeholder} type={type} min={min} error={error}
    focused={f} onFocus={()=>setF(true)} onBlur={()=>setF(false)} />;
}

function FocusTextarea({ name, value, onChange, placeholder, error }) {
  const [f,setF] = useState(false);
  return (
    <textarea name={name} value={value} onChange={onChange}
      placeholder={placeholder} rows={4}
      onFocus={()=>setF(true)} onBlur={()=>setF(false)}
      style={{
        width:"100%", boxSizing:"border-box",
        padding:"12px 16px", fontSize:15,
        background:C.white,
        border:`2px solid ${error ? C.rose : f ? C.violet : C.border}`,
        borderRadius:12, outline:"none", color:C.text, resize:"vertical",
        boxShadow: f && !error ? "0 0 0 4px "+C.violetMid : "none",
        transition:"border 0.2s, box-shadow 0.2s",
        fontFamily:"inherit", minHeight:110,
      }}
    />
  );
}

function SuccessOverlay({ onDone }) {
  return (
    <div style={{
      position:"fixed", inset:0, zIndex:9999,
      background:"rgba(255,255,255,0.85)",
      backdropFilter:"blur(8px)",
      display:"flex", alignItems:"center", justifyContent:"center",
    }}>
      <div style={{
        background:C.white,
        border:"2px solid "+C.violetMid,
        borderRadius:28, padding:"52px 48px",
        textAlign:"center", maxWidth:400, width:"90%",
        boxShadow:"0 32px 80px rgba(124,58,237,0.18)",
        animation:"popUp 0.45s cubic-bezier(.34,1.56,.64,1)",
      }}>
        <div style={{ fontSize:72, lineHeight:1, marginBottom:20 }}>🎉</div>
        <h2 style={{ fontSize:26, fontWeight:800, color:C.text, margin:"0 0 10px" }}>
          Project Created!
        </h2>
        <p style={{ color:C.muted, margin:"0 0 28px", lineHeight:1.6, fontSize:15 }}>
          Your project is live and ready for collaborators to find and join.
        </p>
        <button onClick={onDone} style={{
          padding:"14px 36px", borderRadius:14, border:"none",
          background:"linear-gradient(135deg,"+C.violet+","+C.sky+")",
          color:C.white, fontWeight:800, fontSize:15, cursor:"pointer",
          boxShadow:"0 6px 24px rgba(124,58,237,0.35)",
        }}>View My Projects →</button>
      </div>
    </div>
  );
}

function ErrorToast({ message, onClose }) {
  return (
    <div style={{
      position:"fixed", top:24, right:24, zIndex:9999,
      background:C.white, border:"2px solid "+C.rose,
      borderRadius:16, padding:"16px 20px",
      display:"flex", gap:12, alignItems:"flex-start",
      maxWidth:360, boxShadow:"0 8px 32px rgba(244,63,94,0.18)",
      animation:"slideInRight 0.4s cubic-bezier(.34,1.56,.64,1)",
    }}>
      <span style={{ fontSize:22 }}>❌</span>
      <div style={{ flex:1 }}>
        <div style={{ fontWeight:700, color:C.rose, fontSize:14, marginBottom:3 }}>
          Couldn't create project
        </div>
        <div style={{ color:C.muted, fontSize:13 }}>{message}</div>
      </div>
      <button onClick={onClose}
        style={{ background:"none",border:"none",cursor:"pointer",fontSize:20,color:C.muted,padding:0 }}>×</button>
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────────────────────── */

export default function CreateProject() {
  const navigate = useNavigate();

  const [step, setStep]       = useState(0);
  const [success, setSuccess] = useState(false);
  const [toast, setToast]     = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]   = useState({});
  const [skillInput, setSkillInput] = useState("");
  const [showSug, setShowSug] = useState(false);

  const [form, setForm] = useState({
    title:"", description:"", projectType:"College Project",
    requiredSkills:[], teamSize:"", mode:"Online", expectedDuration:"",
  });

  const set = (name, value) => {
    setForm(f => ({ ...f, [name]: value }));
    setErrors(e => ({ ...e, [name]:"" }));
  };
  const fieldChange = e => set(e.target.name, e.target.value);

  const addSkill = (s) => {
    const sk = s.trim();
    if (sk && !form.requiredSkills.includes(sk))
      setForm(f => ({ ...f, requiredSkills:[...f.requiredSkills, sk] }));
    setSkillInput(""); setShowSug(false);
  };
  const removeSkill = sk =>
    setForm(f => ({ ...f, requiredSkills: f.requiredSkills.filter(x=>x!==sk) }));

  const suggestions = SKILL_CHIPS.filter(s =>
    s.toLowerCase().includes(skillInput.toLowerCase()) &&
    !form.requiredSkills.includes(s)
  );

  const validateStep = (s) => {
    const e = {};
    if (s===0) {
      if (!form.title.trim())       e.title = "Project title is required";
      if (!form.description.trim()) e.description = "Description is required";
    }
    if (s===1) {
      if (!form.requiredSkills.length) e.requiredSkills = "Add at least one skill";
      if (!form.teamSize || +form.teamSize < 1) e.teamSize = "Enter a valid team size";
    }
    return e;
  };

  const next = () => {
    const e = validateStep(step);
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStep(s => s+1);
  };

  const submit = async () => {
    setLoading(true);
    try {
      await api.post("/project", {
        ...form,
        requiredSkills: form.requiredSkills,
      });
      setSuccess(true);
    } catch(err) {
      setToast(err.response?.data?.message || "Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedType = PROJECT_TYPES.find(t => t.value === form.projectType);

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes stepIn {
          from { opacity:0; transform:translateX(20px); }
          to   { opacity:1; transform:translateX(0);    }
        }
        @keyframes popUp {
          from { opacity:0; transform:scale(0.75); }
          to   { opacity:1; transform:scale(1);    }
        }
        @keyframes slideInRight {
          from { opacity:0; transform:translateX(80px); }
          to   { opacity:1; transform:translateX(0);    }
        }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes pulseRing {
          0%   { box-shadow:0 0 0 0 rgba(124,58,237,0.45); }
          70%  { box-shadow:0 0 0 14px rgba(124,58,237,0);  }
          100% { box-shadow:0 0 0 0 rgba(124,58,237,0);     }
        }
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:#f5f3ff !important; }
        ::placeholder { color:#c4b5fd; }
        select option { background:#fff; color:#1e1b4b; }
        input[type=number]::-webkit-inner-spin-button { opacity:0.4; }
      `}</style>

      {/* ── PAGE BG ── */}
      <div style={{
        minHeight:"100vh",
        background:"linear-gradient(160deg,#f5f3ff 0%,#fef3c7 45%,#fdf2f8 100%)",
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:"48px 16px", position:"relative", overflow:"hidden",
        fontFamily:"'Segoe UI',system-ui,sans-serif",
      }}>

        {/* decorative blobs */}
        <div style={{ position:"absolute", width:480, height:480, borderRadius:"50%",
          background:"rgba(124,58,237,0.06)", top:-140, left:-140, pointerEvents:"none" }} />
        <div style={{ position:"absolute", width:360, height:360, borderRadius:"50%",
          background:"rgba(249,115,22,0.07)", bottom:-100, right:-80, pointerEvents:"none" }} />
        <div style={{ position:"absolute", width:260, height:260, borderRadius:"50%",
          background:"rgba(20,184,166,0.06)", top:"35%", right:"8%", pointerEvents:"none" }} />

        <div style={{ width:"100%", maxWidth:620, animation:"fadeInUp 0.55s ease" }}>

          {/* ── HEADER ── */}
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{
              display:"inline-flex", alignItems:"center", gap:6,
              background:C.violetLight, border:"1.5px solid "+C.violetMid,
              borderRadius:99, padding:"6px 18px", marginBottom:14,
            }}>
              <span style={{ fontSize:13, fontWeight:700, color:C.violet, letterSpacing:1 }}>
                ✦ NEW PROJECT
              </span>
            </div>
            <h1 style={{ fontSize:"clamp(26px,5vw,38px)", fontWeight:900,
              color:C.text, lineHeight:1.15, marginBottom:8 }}>
              Launch Your Next{" "}
              <span style={{
                background:"linear-gradient(135deg,"+C.violet+","+C.coral+")",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              }}>Big Idea</span>
            </h1>
            <p style={{ color:C.muted, fontSize:15 }}>
              Tell us about your project and we'll help you find the perfect team.
            </p>
          </div>

          {/* ── CARD ── */}
          <div style={{
            background:C.white,
            borderRadius:28,
            border:"1.5px solid "+C.violetMid,
            padding:"clamp(24px,5vw,44px)",
            boxShadow:"0 20px 60px rgba(124,58,237,0.1), 0 4px 16px rgba(0,0,0,0.06)",
          }}>
            <StepBar step={step} />

            {/* ── STEP 0 : BASICS ── */}
            {step===0 && (
              <div style={{ animation:"stepIn 0.35s ease" }}>
                <InputField label="Project Title" required error={errors.title}>
                  <FocusInput name="title" value={form.title} onChange={fieldChange}
                    placeholder="e.g. AI Resume Builder" error={errors.title} />
                </InputField>

                <InputField label="Description" required error={errors.description}>
                  <FocusTextarea name="description" value={form.description}
                    onChange={fieldChange} error={errors.description}
                    placeholder="What are you building? What problem does it solve?" />
                </InputField>

                <InputField label="Project Type" required>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginTop:4 }}>
                    {PROJECT_TYPES.map(t => (
                      <button key={t.value} type="button"
                        onClick={() => set("projectType", t.value)}
                        style={{
                          display:"flex", alignItems:"center", gap:7,
                          padding:"10px 16px", borderRadius:12, cursor:"pointer",
                          border:`2px solid ${form.projectType===t.value ? t.color : C.border}`,
                          background: form.projectType===t.value ? t.bg : C.offWhite,
                          color: form.projectType===t.value ? t.color : C.muted,
                          fontWeight:600, fontSize:13,
                          boxShadow: form.projectType===t.value
                            ? "0 2px 12px "+t.color+"44" : "none",
                          transition:"all 0.2s",
                        }}>
                        <span style={{ fontSize:16 }}>{t.icon}</span> {t.value}
                      </button>
                    ))}
                  </div>
                </InputField>
              </div>
            )}

            {/* ── STEP 1 : SKILLS & TEAM ── */}
            {step===1 && (
              <div style={{ animation:"stepIn 0.35s ease" }}>

                {/* skill autocomplete */}
                <InputField label="Required Skills" required error={errors.requiredSkills}
                  hint="Type a skill and press Enter, or pick from suggestions below.">
                  <div style={{
                    border:`2px solid ${errors.requiredSkills ? C.rose : C.border}`,
                    borderRadius:12, padding:"10px 12px",
                    background:C.white, display:"flex", flexWrap:"wrap", gap:8,
                    minHeight:52,
                  }}>
                    {form.requiredSkills.map(sk => (
                      <span key={sk} style={{
                        display:"inline-flex", alignItems:"center", gap:5,
                        background:C.violetLight, color:C.violet,
                        border:"1.5px solid "+C.violetMid,
                        borderRadius:99, padding:"4px 12px",
                        fontSize:13, fontWeight:600,
                        animation:"stepIn 0.2s ease",
                      }}>
                        {sk}
                        <span onClick={()=>removeSkill(sk)}
                          style={{ cursor:"pointer", fontWeight:800, fontSize:15, opacity:0.7 }}>×</span>
                      </span>
                    ))}
                    <input value={skillInput}
                      onChange={e=>{setSkillInput(e.target.value);setShowSug(true);}}
                      onFocus={()=>setShowSug(true)}
                      onBlur={()=>setTimeout(()=>setShowSug(false),160)}
                      onKeyDown={e=>{
                        if(e.key==="Enter"){e.preventDefault();addSkill(skillInput);}
                        if(e.key===","||e.key==="Tab"){e.preventDefault();addSkill(skillInput);}
                      }}
                      placeholder={form.requiredSkills.length ? "Add more…" : "React, Node.js…"}
                      style={{ border:"none", outline:"none", fontSize:14,
                        color:C.text, minWidth:140, background:"transparent", flexGrow:1 }}
                    />
                  </div>

                  {/* quick-add chips */}
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:10 }}>
                    {SKILL_CHIPS.filter(s=>!form.requiredSkills.includes(s)).slice(0,8).map(s=>(
                      <button key={s} type="button" onClick={()=>addSkill(s)}
                        style={{
                          padding:"4px 12px", borderRadius:99, fontSize:12, fontWeight:600,
                          border:"1.5px solid "+C.border, background:C.offWhite,
                          color:C.muted, cursor:"pointer", transition:"all 0.15s",
                        }}
                        onMouseEnter={e=>{e.target.style.borderColor=C.violet;e.target.style.color=C.violet;e.target.style.background=C.violetLight;}}
                        onMouseLeave={e=>{e.target.style.borderColor=C.border;e.target.style.color=C.muted;e.target.style.background=C.offWhite;}}
                      >+ {s}</button>
                    ))}
                  </div>

                  {/* dropdown suggestions */}
                  {showSug && skillInput && suggestions.length>0 && (
                    <div style={{
                      background:C.white, border:"1.5px solid "+C.violetMid,
                      borderRadius:12, marginTop:4, overflow:"hidden",
                      boxShadow:"0 8px 24px rgba(124,58,237,0.12)",
                    }}>
                      {suggestions.slice(0,5).map(s=>(
                        <div key={s} onMouseDown={()=>addSkill(s)}
                          style={{ padding:"10px 16px", cursor:"pointer", fontSize:14,
                            color:C.muted, transition:"all 0.15s",
                            display:"flex", alignItems:"center", gap:8 }}
                          onMouseEnter={e=>{e.currentTarget.style.background=C.violetLight;e.currentTarget.style.color=C.violet;}}
                          onMouseLeave={e=>{e.currentTarget.style.background="";e.currentTarget.style.color=C.muted;}}
                        >
                          <span style={{ color:C.violet, fontSize:10 }}>◆</span> {s}
                        </div>
                      ))}
                    </div>
                  )}
                </InputField>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <InputField label="Team Size" required error={errors.teamSize}>
                    <FocusInput name="teamSize" value={form.teamSize} type="number"
                      onChange={fieldChange} placeholder="e.g. 4" min="1" error={errors.teamSize} />
                  </InputField>
                  <InputField label="Duration (months)">
                    <FocusInput name="expectedDuration" value={form.expectedDuration}
                      type="number" onChange={fieldChange} placeholder="e.g. 3" min="1" />
                  </InputField>
                </div>

                <InputField label="Work Mode">
                  <div style={{ display:"flex", gap:12 }}>
                    {MODES.map(m=>(
                      <button key={m.value} type="button" onClick={()=>set("mode",m.value)}
                        style={{
                          flex:1, padding:"14px 8px", borderRadius:14, cursor:"pointer",
                          border:`2px solid ${form.mode===m.value ? m.color : C.border}`,
                          background: form.mode===m.value ? m.color+"14" : C.offWhite,
                          color: form.mode===m.value ? m.color : C.muted,
                          fontWeight:700, fontSize:13, textAlign:"center",
                          boxShadow: form.mode===m.value ? "0 4px 16px "+m.color+"33" : "none",
                          transition:"all 0.2s",
                        }}>
                        <div style={{ fontSize:22, marginBottom:4 }}>{m.icon}</div>
                        {m.value}
                      </button>
                    ))}
                  </div>
                </InputField>
              </div>
            )}

            {/* ── STEP 2 : CONFIRM ── */}
            {step===2 && (
              <div style={{ animation:"stepIn 0.35s ease" }}>
                <div style={{
                  background:"linear-gradient(135deg,"+C.violetLight+",#fef9c3)",
                  border:"1.5px solid "+C.violetMid,
                  borderRadius:20, padding:28, marginBottom:8,
                }}>
                  {/* type badge */}
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
                    <div style={{
                      width:52, height:52, borderRadius:14, fontSize:26,
                      background: selectedType?.bg||C.violetLight,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      border:"2px solid "+C.violetMid,
                    }}>{selectedType?.icon}</div>
                    <div>
                      <div style={{ fontSize:20, fontWeight:800, color:C.text }}>{form.title}</div>
                      <div style={{ fontSize:13, color:selectedType?.color||C.violet, fontWeight:600 }}>
                        {form.projectType}
                      </div>
                    </div>
                  </div>

                  <div style={{ height:1, background:C.violetMid, margin:"16px 0" }} />

                  {[
                    { label:"📝 Description",    value: form.description       },
                    { label:"🛠 Skills",          value: form.requiredSkills.join(", ")||"—" },
                    { label:"👥 Team Size",       value: form.teamSize ? form.teamSize+" members" : "—" },
                    { label:"💻 Mode",            value: form.mode              },
                    { label:"⏱ Duration",         value: form.expectedDuration ? form.expectedDuration+" months":"Not specified" },
                  ].map(({ label, value }) => (
                    <div key={label} style={{
                      display:"flex", gap:12, alignItems:"flex-start",
                      marginBottom:12, fontSize:14,
                    }}>
                      <div style={{ color:C.muted, minWidth:120, flexShrink:0, paddingTop:1 }}>{label}</div>
                      <div style={{ color:C.text, fontWeight:500, wordBreak:"break-word" }}>{value}</div>
                    </div>
                  ))}
                </div>
                <p style={{ textAlign:"center", color:C.muted, fontSize:13, marginTop:12 }}>
                  Everything look right? Hit the button below to go live ✨
                </p>
              </div>
            )}

            {/* ── NAV BUTTONS ── */}
            <div style={{ display:"flex", gap:12, marginTop:32 }}>
              {step>0 && (
                <button type="button" onClick={()=>setStep(s=>s-1)}
                  style={{
                    flex:1, padding:"14px 20px", borderRadius:14, cursor:"pointer",
                    background:C.offWhite, border:"2px solid "+C.border,
                    color:C.muted, fontWeight:700, fontSize:15, transition:"all 0.2s",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C.violet;e.currentTarget.style.color=C.violet;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.muted;}}
                >← Back</button>
              )}

              {step < 2 ? (
                <button type="button" onClick={next}
                  style={{
                    flex:1, padding:"14px 20px", borderRadius:14, cursor:"pointer",
                    background:"linear-gradient(135deg,"+C.violet+","+C.sky+")",
                    border:"none", color:C.white, fontWeight:800, fontSize:15,
                    boxShadow:"0 6px 24px rgba(124,58,237,0.35)",
                    transition:"transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 10px 32px rgba(124,58,237,0.45)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 6px 24px rgba(124,58,237,0.35)";}}
                >Continue →</button>
              ) : (
                <button type="button" onClick={submit} disabled={loading}
                  style={{
                    flex:1, padding:"16px 20px", borderRadius:14, cursor: loading?"wait":"pointer",
                    background: loading
                      ? C.violetMid
                      : "linear-gradient(135deg,"+C.violet+","+C.coral+")",
                    border:"none", color:C.white, fontWeight:800, fontSize:16,
                    boxShadow: loading ? "none" : "0 6px 28px rgba(124,58,237,0.4)",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                    transition:"all 0.2s",
                    animation: !loading ? "pulseRing 2.5s infinite" : "none",
                  }}
                  onMouseEnter={e=>{ if(!loading){ e.currentTarget.style.transform="translateY(-2px)"; }}}
                  onMouseLeave={e=>{ e.currentTarget.style.transform=""; }}
                >
                  {loading ? (
                    <>
                      <span style={{
                        width:18, height:18, border:"2.5px solid rgba(255,255,255,0.4)",
                        borderTopColor:C.white, borderRadius:"50%",
                        display:"inline-block", animation:"spin 0.7s linear infinite",
                      }}/>
                      Creating…
                    </>
                  ) : "🚀 Launch Project"}
                </button>
              )}
            </div>
          </div>

          {/* step hint */}
          <p style={{ textAlign:"center", color:C.muted, fontSize:12, marginTop:16 }}>
            Step {step+1} of 3 · {step===0?"Basic info":""}
            {step===1?"Skills & team details":""}
            {step===2?"Final review":""}
          </p>
        </div>
      </div>

      {success && (
        <SuccessOverlay onDone={()=>{ setSuccess(false); navigate("/my-projects"); }} />
      )}
      {toast && <ErrorToast message={toast} onClose={()=>setToast(null)} />}
    </>
  );
}