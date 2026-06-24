import { useEffect, useState } from "react";
import api from "../api/api";
import { Container, Row, Col, Card, Form, Button, Spinner, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
    portfolio: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/user/profile");
      const user = response.data.user;

      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        skills: user.skills ? user.skills.join(", ") : "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        portfolio: user.portfolio || ""
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/user/profile", {
        ...formData,
        skills: formData.skills.split(",").map(skill => skill.trim())
      });
      alert("Profile Updated Successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  const getSocialIcon = (platform) => {
    const icons = {
      github: "🐙",
      linkedin: "🔗",
      portfolio: "🌐"
    };
    return icons[platform] || "🔗";
  };

  // ─── Styles ───────────────────────────────────────────────
  const styles = {
    pageContainer: {
      background: 'linear-gradient(135deg, #fef9f0 0%, #fff5e6 100%)',
      minHeight: '100vh',
      paddingBottom: '4rem'
    },
    hero: {
      background: 'linear-gradient(135deg, #fff8f0 0%, #ffedd5 100%)',
      padding: '1.5rem 0 1.5rem',
      borderBottom: '2px solid rgba(255, 193, 7, 0.15)',
      position: 'relative',
      overflow: 'hidden'
    },
    avatar: {
      width: '60px',
      height: '60px',
      margin: '0 auto 0.5rem',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #ffc107, #ff9800)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.8rem',
      fontWeight: '700',
      color: 'white',
      boxShadow: '0 4px 15px rgba(255, 193, 7, 0.25)',
      transition: 'transform 0.3s ease',
      cursor: 'default'
    },
    name: {
      fontFamily: "'Syne', sans-serif",
      fontSize: '1.3rem',
      fontWeight: '700',
      marginBottom: '0.15rem',
      letterSpacing: '-0.02em',
      background: 'linear-gradient(135deg, #2d1b0e, #f57c00)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    email: {
      fontSize: '0.85rem',
      color: '#6c757d',
      marginBottom: '0',
      fontWeight: '500'
    },
    bio: {
      fontSize: '0.85rem',
      color: '#555',
      maxWidth: '400px',
      margin: '0.25rem auto 0',
      lineHeight: '1.4',
      fontWeight: '400'
    },
    sectionIcon: {
      width: '48px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '14px',
      background: 'linear-gradient(135deg, #fff8f0, #ffedd5)',
      fontSize: '1.5rem',
      flexShrink: '0'
    },
    sectionTitle: {
      fontFamily: "'Syne', sans-serif",
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#2d1b0e'
    },
    sectionSubtitle: {
      fontSize: '0.9rem',
      color: '#888'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(10px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 193, 7, 0.15)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      overflow: 'hidden'
    },
    formLabel: {
      fontWeight: '700',
      color: '#2d1b0e'
    },
    formControl: {
      border: '2px solid #f0d5b0',
      background: '#fef9f2',
      transition: 'all 0.3s',
      fontSize: '0.95rem',
      borderRadius: '16px'
    },
    inputGroupText: {
      background: '#fef9f2',
      border: '2px solid #f0d5b0',
      color: '#6c757d',
      borderRadius: '16px 0 0 16px'
    },
    goldButton: {
      background: 'linear-gradient(135deg, #ffc107, #ff9800)',
      color: '#2d1b0e',
      border: 'none',
      boxShadow: '0 4px 15px rgba(255, 193, 7, 0.3)',
      transition: 'all 0.3s'
    },
    loadingContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef9f0 0%, #fff5e6 100%)'
    },
    loadingTitle: {
      color: '#f57c00',
      fontWeight: '700'
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div className="text-center">
          <Spinner 
            animation="border" 
            variant="warning" 
            style={{ width: '60px', height: '60px', borderWidth: '5px' }}
          />
          <h3 className="mt-4" style={styles.loadingTitle}>
            Loading Your Profile...
          </h3>
          <p className="text-muted">Getting your information ready</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      {/* ─── Compact Hero Section ─── */}
      <div style={styles.hero}>
        <Container>
          <Row className="align-items-center">
            <Col lg={10} className="mx-auto text-center">
              {/* Small Avatar */}
              <div 
                style={styles.avatar}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {formData.name.charAt(0) || "U"}
              </div>

              {/* Name - Smaller */}
              <h1 style={styles.name}>
                {formData.name || "Your Name"}
              </h1>
              
              {/* Email - Smaller */}
              <p style={styles.email}>
                {formData.email}
              </p>

              {/* Bio - Smaller */}
              {formData.bio && (
                <p style={styles.bio}>
                  {formData.bio}
                </p>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* ─── Edit Profile Section ─── */}
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col lg={8}>
            {/* Section Header */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <div style={styles.sectionIcon}>✏️</div>
              <div>
                <h4 style={styles.sectionTitle}>Edit Profile</h4>
                <p style={styles.sectionSubtitle}>Update your personal information</p>
              </div>
            </div>

            <Card style={styles.card}>
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  {/* ── Personal Information ── */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3" style={{ color: '#2d1b0e' }}>
                      <span className="me-2">📋</span>
                      Personal Information
                    </h6>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label style={styles.formLabel}>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={styles.formControl}
                            placeholder="John Doe"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label style={styles.formLabel}>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            disabled
                            style={{
                              ...styles.formControl,
                              background: '#f5f5f5',
                              cursor: 'not-allowed'
                            }}
                          />
                          <Form.Text className="text-muted">
                            ℹ️ Email cannot be changed
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label style={styles.formLabel}>
                            <span className="me-2">📱</span>
                            Phone Number
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            style={styles.formControl}
                            placeholder="+1 234 567 8900"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label style={styles.formLabel}>
                        <span className="me-2">📝</span>
                        Bio
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        style={styles.formControl}
                        placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                      />
                      <Form.Text className="text-muted">
                        ℹ️ Share your professional background and interests
                      </Form.Text>
                    </Form.Group>
                  </div>

                  {/* ── Skills ── */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3" style={{ color: '#2d1b0e' }}>
                      <span className="me-2">⚡</span>
                      Skills
                    </h6>
                    
                    <Form.Group className="mb-3">
                      <Form.Label style={styles.formLabel}>
                        Technical Skills
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        style={styles.formControl}
                        placeholder="React, Node.js, MongoDB, Python, AWS"
                      />
                      <Form.Text className="text-muted">
                        ℹ️ Separate skills with commas (e.g., React, Node.js, MongoDB)
                      </Form.Text>
                    </Form.Group>
                  </div>

                  {/* ── Social Links ── */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3" style={{ color: '#2d1b0e' }}>
                      <span className="me-2">🔗</span>
                      Social Links
                    </h6>

                    {['github', 'linkedin', 'portfolio'].map((platform) => (
                      <Form.Group key={platform} className="mb-3">
                        <Form.Label style={styles.formLabel}>
                          <span className="me-2">{getSocialIcon(platform)}</span>
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text style={styles.inputGroupText}>
                            {platform === 'github' && 'https://github.com/'}
                            {platform === 'linkedin' && 'https://linkedin.com/in/'}
                            {platform === 'portfolio' && 'https://'}
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            name={platform}
                            value={formData[platform]}
                            onChange={handleChange}
                            style={{
                              ...styles.formControl,
                              borderTopLeftRadius: '0',
                              borderBottomLeftRadius: '0'
                            }}
                            placeholder={`your-${platform}-username`}
                          />
                        </InputGroup>
                      </Form.Group>
                    ))}
                  </div>

                  {/* ── Action Buttons ── */}
                  <div className="d-flex gap-3 pt-3 border-top" style={{ borderColor: 'rgba(255, 193, 7, 0.1)' }}>
                    <Button 
                      type="submit" 
                      className="px-4 py-3 rounded-pill fw-bold flex-grow-1"
                      style={styles.goldButton}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 6px 25px rgba(255, 193, 7, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 193, 7, 0.3)';
                      }}
                    >
                      <span className="me-2">💾</span>
                      Update Profile
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      className="px-4 py-3 rounded-pill fw-bold"
                      onClick={() => fetchProfile()}
                      style={{ borderWidth: '2px' }}
                    >
                      <span className="me-2">🔄</span>
                      Reset
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;