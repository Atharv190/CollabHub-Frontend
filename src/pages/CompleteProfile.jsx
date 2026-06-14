import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function CompleteProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [formData, setFormData] = useState({
    phone: "",
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
    portfolio: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.phone.match(/^[0-9]{10}$/)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    // Changed from 10 to 50 characters minimum
    if (formData.bio.length < 50) {
      newErrors.bio = "Bio must be at least 50 characters";
    }
    
    if (formData.skills.trim() === "") {
      newErrors.skills = "Please enter at least one skill";
    }
    
    if (formData.github && !formData.github.match(/^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+$/)) {
      newErrors.github = "Please enter a valid GitHub URL";
    }
    
    if (formData.linkedin && !formData.linkedin.match(/^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+$/)) {
      newErrors.linkedin = "Please enter a valid LinkedIn URL";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      await api.put("/user/complete-profile", {
        ...formData,
        skills: formData.skills
          .split(",")
          .map(skill => skill.trim())
          .filter(skill => skill !== "")
      });

      setShowSuccessPopup(true);
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);

    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to save profile");
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 py-5" style={{
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      
      {/* Animated Background Circles */}
      <div className="position-absolute w-100 h-100 overflow-hidden" style={{ zIndex: 0 }}>
        <div className="position-absolute rounded-circle" style={{
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(102,126,234,0.1) 0%, rgba(102,126,234,0) 70%)",
          top: "-150px",
          right: "-100px",
          animation: "float 8s ease-in-out infinite"
        }} />
        <div className="position-absolute rounded-circle" style={{
          width: "250px",
          height: "250px",
          background: "radial-gradient(circle, rgba(118,75,162,0.08) 0%, rgba(118,75,162,0) 70%)",
          bottom: "-100px",
          left: "-80px",
          animation: "float 10s ease-in-out infinite reverse"
        }} />
        <div className="position-absolute rounded-circle" style={{
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(240,147,251,0.08) 0%, rgba(240,147,251,0) 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "pulse 6s ease-in-out infinite"
        }} />
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 1050, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-4 p-4 text-center" style={{ width: "320px", animation: "bounceIn 0.3s ease-out", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <div className="mb-3">
              <div className="mx-auto rounded-circle d-flex justify-content-center align-items-center" style={{ width: "60px", height: "60px", background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
            <h4 className="mb-2 fw-bold" style={{ fontSize: "20px" }}>Profile Complete! 🎉</h4>
            <p className="text-muted mb-3" style={{ fontSize: "13px" }}>Redirecting to dashboard...</p>
            <div className="spinner-border text-primary spinner-border-sm" role="status" />
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="position-fixed top-0 start-50 translate-middle-x mt-3" style={{ zIndex: 1050 }}>
          <div className="text-white rounded-3 p-2 px-3 d-flex align-items-center gap-2 shadow-lg" style={{ background: "#ef4444", fontSize: "13px" }}>
            <span>⚠️</span> {errorMessage}
            <button className="btn-close btn-close-white" style={{ fontSize: "10px" }} onClick={() => setShowErrorPopup(false)} />
          </div>
        </div>
      )}

      <div className="container position-relative" style={{ zIndex: 1, maxWidth: "800px" }}>
        <div className="row justify-content-center">
          <div className="col-12">
            
            {/* Header Section */}
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center gap-2 mb-2">
                <div className="rounded-2 d-flex align-items-center justify-content-center" style={{
                  width: "45px",
                  height: "45px",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  borderRadius: "12px"
                }}>
                  <span style={{ fontSize: "24px" }}>🤝</span>
                </div>
                <div>
                  <h1 style={{ fontSize: "28px", fontWeight: "700", margin: 0, color: "#1f2937" }}>
                    Collab<span style={{ color: "#667eea" }}>Hub</span>
                  </h1>
                  <div style={{ fontSize: "10px", color: "#9ca3af", letterSpacing: "2px" }}>COLLABORATION PLATFORM</div>
                </div>
              </div>
              <p className="text-muted" style={{ fontSize: "14px", marginTop: "8px" }}>Almost there! Complete your profile to unlock amazing opportunities</p>
            </div>

            {/* Progress Steps */}
            <div className="mb-5">
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-center" style={{ flex: 1 }}>
                  <div className="rounded-circle d-inline-flex justify-content-center align-items-center mb-1" style={{ width: "36px", height: "36px", background: "#667eea" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <p className="mb-0 fw-semibold" style={{ fontSize: "11px", color: "#6b7280" }}>Account</p>
                </div>
                <div className="mx-2" style={{ flex: 1, height: "2px", background: "linear-gradient(90deg, #667eea, #764ba2)" }} />
                <div className="text-center" style={{ flex: 1 }}>
                  <div className="rounded-circle d-inline-flex justify-content-center align-items-center mb-1" style={{ width: "36px", height: "36px", background: "linear-gradient(135deg, #667eea, #764ba2)", boxShadow: "0 0 0 3px rgba(102,126,234,0.2)" }}>
                    <span className="text-white fw-bold" style={{ fontSize: "14px" }}>2</span>
                  </div>
                  <p className="mb-0 fw-bold" style={{ fontSize: "11px", color: "#667eea" }}>Profile</p>
                </div>
                <div className="mx-2" style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
                <div className="text-center" style={{ flex: 1 }}>
                  <div className="rounded-circle d-inline-flex justify-content-center align-items-center mb-1" style={{ width: "36px", height: "36px", background: "#f3f4f6" }}>
                    <span className="text-muted fw-bold" style={{ fontSize: "14px" }}>3</span>
                  </div>
                  <p className="mb-0" style={{ fontSize: "11px", color: "#9ca3af" }}>Dashboard</p>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="card shadow-lg border-0" style={{
              borderRadius: "20px",
              background: "white"
            }}>
              <div className="card-body p-4">
                
                {/* Card Header */}
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="rounded-2 p-2" style={{
                    background: "linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1))"
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-0 fw-bold" style={{ fontSize: "20px", color: "#1f2937" }}>Let's get you ready! 🚀</h3>
                    <p className="text-muted mb-0" style={{ fontSize: "12px" }}>Fill in your details to start collaborating</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Phone Field */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold mb-2" style={{ fontSize: "13px", color: "#374151" }}>
                      📱 Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your 10-digit mobile number"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      style={{
                        fontSize: "14px",
                        padding: "10px 14px",
                        borderRadius: "12px",
                        border: "1.5px solid #e5e7eb"
                      }}
                    />
                    {errors.phone && <div className="invalid-feedback" style={{ fontSize: "11px" }}>{errors.phone}</div>}
                  </div>

                  {/* Bio Field - 50 characters minimum */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold mb-2" style={{ fontSize: "13px", color: "#374151" }}>
                      ✍️ Bio <span className="text-danger">*</span>
                    </label>
                    <textarea
                      name="bio"
                      placeholder="Tell us about yourself, your skills, experience, and what you're passionate about..."
                      className={`form-control ${errors.bio ? 'is-invalid' : ''}`}
                      rows="4"
                      value={formData.bio}
                      onChange={handleChange}
                      required
                      style={{
                        fontSize: "13px",
                        padding: "10px 14px",
                        borderRadius: "12px",
                        border: "1.5px solid #e5e7eb",
                        resize: "none"
                      }}
                    />
                    {errors.bio && <div className="invalid-feedback" style={{ fontSize: "11px" }}>{errors.bio}</div>}
                    <div className="form-text mt-1" style={{ fontSize: "11px" }}>
                      <span className={formData.bio.length >= 50 ? 'text-success' : 'text-muted'}>
                        {formData.bio.length}/50 characters minimum
                      </span>
                      {formData.bio.length < 50 && formData.bio.length > 0 && (
                        <span className="text-warning ms-2">
                          Need {50 - formData.bio.length} more characters
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Skills Field */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold mb-2" style={{ fontSize: "13px", color: "#374151" }}>
                      🎯 Skills <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="skills"
                      placeholder="React, Node.js, Python, MongoDB"
                      className={`form-control ${errors.skills ? 'is-invalid' : ''}`}
                      value={formData.skills}
                      onChange={handleChange}
                      required
                      style={{
                        fontSize: "14px",
                        padding: "10px 14px",
                        borderRadius: "12px",
                        border: "1.5px solid #e5e7eb"
                      }}
                    />
                    {errors.skills && <div className="invalid-feedback" style={{ fontSize: "11px" }}>{errors.skills}</div>}
                  </div>

                  {/* Social Links - 2 Column Grid */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold mb-2" style={{ fontSize: "13px", color: "#374151" }}>
                        🐙 GitHub
                      </label>
                      <input
                        type="url"
                        name="github"
                        placeholder="github.com/username"
                        className={`form-control ${errors.github ? 'is-invalid' : ''}`}
                        value={formData.github}
                        onChange={handleChange}
                        style={{
                          fontSize: "13px",
                          padding: "10px 14px",
                          borderRadius: "12px",
                          border: "1.5px solid #e5e7eb"
                        }}
                      />
                      {errors.github && <div className="invalid-feedback" style={{ fontSize: "11px" }}>{errors.github}</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold mb-2" style={{ fontSize: "13px", color: "#374151" }}>
                        🔗 LinkedIn
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        placeholder="linkedin.com/in/username"
                        className={`form-control ${errors.linkedin ? 'is-invalid' : ''}`}
                        value={formData.linkedin}
                        onChange={handleChange}
                        style={{
                          fontSize: "13px",
                          padding: "10px 14px",
                          borderRadius: "12px",
                          border: "1.5px solid #e5e7eb"
                        }}
                      />
                      {errors.linkedin && <div className="invalid-feedback" style={{ fontSize: "11px" }}>{errors.linkedin}</div>}
                    </div>
                  </div>

                  {/* Portfolio Field - Optional */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold mb-2" style={{ fontSize: "13px", color: "#374151" }}>
                      🌐 Portfolio <span className="text-muted">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      placeholder="yourportfolio.com"
                      className="form-control"
                      value={formData.portfolio}
                      onChange={handleChange}
                      style={{
                        fontSize: "13px",
                        padding: "10px 14px",
                        borderRadius: "12px",
                        border: "1.5px solid #e5e7eb"
                      }}
                    />
                  </div>

                  {/* Single Submit Button - No Skip Option */}
                  <button
                    type="submit"
                    className="btn w-100 py-2 text-white"
                    disabled={loading}
                    style={{
                      borderRadius: "12px",
                      fontSize: "15px",
                      fontWeight: "600",
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      border: "none"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-1px)";
                      e.target.style.boxShadow = "0 4px 12px rgba(102,126,234,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm" role="status" />
                    ) : (
                      "✨ Complete Profile & Continue"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Motivational Banner */}
            <div className="mt-4 text-center">
              <div className="p-2" style={{
                background: "linear-gradient(135deg, rgba(102,126,234,0.08), rgba(118,75,162,0.08))",
                borderRadius: "12px"
              }}>
                <p className="mb-0" style={{ fontSize: "11px", color: "#6b7280" }}>
                  ⭐ Join 500+ active collaborators on CollabHub ⭐
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.3; }
        }
        .form-control:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 3px rgba(102,126,234,0.1) !important;
          outline: none;
        }
        .btn {
          transition: all 0.2s ease;
        }
        @media (max-width: 768px) {
          .card-body {
            padding: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default CompleteProfile;