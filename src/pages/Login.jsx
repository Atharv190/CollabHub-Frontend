// Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Global.css";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      const user = response.data.user;
      if (!user.profileCompleted) {
        navigate("/complete-profile");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container d-flex align-items-center justify-content-center" style={{ paddingBottom: 0 }}>
      <Container>
        <Row className="justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 4rem)' }}>
          <Col xs={12} sm={10} md={8} lg={5} xl={4}>
            <Card className="shared-card p-3 p-md-4">
              <Card.Body>
                {/* Logo */}
                <div className="text-center mb-4">
                  <div 
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '64px',
                      height: '64px',
                      background: 'var(--gold-gradient)',
                      borderRadius: '18px',
                      fontSize: '2rem',
                      boxShadow: '0 8px 24px rgba(255, 193, 7, 0.3)'
                    }}
                  >
                    🚀
                  </div>
                  <h2 className="fw-bold" style={{ color: '#2d1b0e' }}>
                    Welcome Back
                  </h2>
                  <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                    Sign in to continue to your workspace
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="shared-form-label">Email Address</Form.Label>
                    <div className="position-relative">
                      <span 
                        className="position-absolute start-0 top-50 translate-middle-y ms-3"
                        style={{ color: '#b8956a', zIndex: 1 }}
                      >
                        📧
                      </span>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shared-textarea"
                        style={{ paddingLeft: '2.8rem' }}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="shared-form-label">Password</Form.Label>
                    <div className="position-relative">
                      <span 
                        className="position-absolute start-0 top-50 translate-middle-y ms-3"
                        style={{ color: '#b8956a', zIndex: 1 }}
                      >
                        🔒
                      </span>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="shared-textarea"
                        style={{ paddingLeft: '2.8rem' }}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Button
                    type="submit"
                    className="btn-gold-gradient w-100 py-3 rounded-pill fw-bold"
                    disabled={loading}
                    style={{ fontSize: '1rem' }}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Logging in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                    Don't have an account?{' '}
                    <Link 
                      to="/register" 
                      className="fw-semibold text-decoration-none"
                      style={{ color: '#f57c00' }}
                    >
                      Create one
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;