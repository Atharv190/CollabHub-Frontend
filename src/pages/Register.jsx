// Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
      const response = await api.post("/auth/register", formData);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
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
                    ✨
                  </div>
                  <h2 className="fw-bold" style={{ color: '#2d1b0e' }}>
                    Create Account
                  </h2>
                  <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                    Join our creative community today
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="shared-form-label">Full Name</Form.Label>
                    <div className="position-relative">
                      <span 
                        className="position-absolute start-0 top-50 translate-middle-y ms-3"
                        style={{ color: '#b8956a', zIndex: 1 }}
                      >
                        👤
                      </span>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shared-textarea"
                        style={{ paddingLeft: '2.8rem' }}
                        required
                      />
                    </div>
                  </Form.Group>

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

                  <Form.Group className="mb-3">
                    <Form.Label className="shared-form-label">Phone Number</Form.Label>
                    <div className="position-relative">
                      <span 
                        className="position-absolute start-0 top-50 translate-middle-y ms-3"
                        style={{ color: '#b8956a', zIndex: 1 }}
                      >
                        📱
                      </span>
                      <Form.Control
                        type="text"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
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
                        placeholder="Create a password"
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
                        Creating account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="fw-semibold text-decoration-none"
                      style={{ color: '#f57c00' }}
                    >
                      Sign in
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

export default Register;