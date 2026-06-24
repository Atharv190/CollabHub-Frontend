import { useEffect, useState } from "react";
import api from "../api/api";
import { Container, Row, Col, Card, Badge, Spinner, Button } from 'react-bootstrap';
import SharedLayout from "../components/SharedLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get("/application/my");
      setApplications(response.data.applications || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "Accepted":
        return "success";
      case "Rejected":
        return "danger";
      default:
        return "warning";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return "✅";
      case "Rejected":
        return "❌";
      default:
        return "⏳";
    }
  };

  const getStatusBadgeStyle = (status) => {
    const styles = {
      Accepted: {
        background: 'linear-gradient(135deg, #28a745, #20c997)',
        color: 'white'
      },
      Rejected: {
        background: 'linear-gradient(135deg, #dc3545, #ff6b6b)',
        color: 'white'
      },
      Pending: {
        background: 'linear-gradient(135deg, #ffc107, #ff9800)',
        color: '#2d1b0e'
      }
    };
    return styles[status] || styles.Pending;
  };

  if (loading) {
    return (
      <div className="shared-loading">
        <div className="text-center">
          <Spinner 
            animation="border" 
            variant="warning" 
            className="shared-spinner"
          />
          <h3 className="mt-4 shared-loading-title">
            Loading Your Applications...
          </h3>
          <p className="text-muted">Fetching your application history</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalApplications = applications.length;
  const acceptedCount = applications.filter(app => app.status === "Accepted").length;
  const rejectedCount = applications.filter(app => app.status === "Rejected").length;
  const pendingCount = applications.filter(app => app.status === "Pending").length;

  return (
    <SharedLayout
      showHero={true}
      heroBadge="📋 Application Tracker"
      heroTitle={
        <>
          My <span className="page-title-gradient">Applications</span>
        </>
      }
      heroSubtitle="Track the status of all your project applications"
    >
      <Container>
        {/* Statistics Cards */}
        <Row className="g-3 mb-4">
          <Col xs={6} md={3}>
            <Card className="border-0 shadow-sm h-100 text-center" style={{
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #fff5f5, #ffe8e8)'
            }}>
              <Card.Body>
                <div className="display-4 mb-2">📊</div>
                <h5 className="fw-bold mb-1">{totalApplications}</h5>
                <small className="text-muted">Total Applications</small>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="border-0 shadow-sm h-100 text-center" style={{
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #f0fff4, #d4edda)'
            }}>
              <Card.Body>
                <div className="display-4 mb-2">✅</div>
                <h5 className="fw-bold mb-1" style={{ color: '#28a745' }}>{acceptedCount}</h5>
                <small className="text-muted">Accepted</small>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="border-0 shadow-sm h-100 text-center" style={{
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #fff8f0, #ffedd5)'
            }}>
              <Card.Body>
                <div className="display-4 mb-2">⏳</div>
                <h5 className="fw-bold mb-1" style={{ color: '#f57c00' }}>{pendingCount}</h5>
                <small className="text-muted">Pending</small>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="border-0 shadow-sm h-100 text-center" style={{
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #fff5f5, #f8d7da)'
            }}>
              <Card.Body>
                <div className="display-4 mb-2">❌</div>
                <h5 className="fw-bold mb-1" style={{ color: '#dc3545' }}>{rejectedCount}</h5>
                <small className="text-muted">Rejected</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {applications.length === 0 ? (
          <div className="text-center py-5">
            <div className="shared-empty-icon">📭</div>
            <h4 className="fw-bold shared-empty-title">No applications yet</h4>
            <p className="text-muted mb-4">
              You haven't applied to any projects. Start exploring opportunities!
            </p>
            <Button 
              className="btn-gold-gradient px-4 py-3 rounded-pill fw-bold"
              onClick={() => window.location.href = '/explore-projects'}
            >
              <span className="me-2">🔍</span>
              Explore Projects
            </Button>
          </div>
        ) : (
          <Row className="g-4">
            {applications.map((app) => (
              <Col key={app._id} xs={12} md={6} lg={4}>
                <Card className="shared-card h-100">
                  {/* Status Stripe */}
                  <div 
                    className="card-stripe" 
                    style={{ 
                      height: '6px', 
                      background: app.status === 'Accepted' ? 'linear-gradient(90deg, #28a745, #20c997)' :
                                 app.status === 'Rejected' ? 'linear-gradient(90deg, #dc3545, #ff6b6b)' :
                                 'linear-gradient(90deg, #ffc107, #ff9800)',
                      borderTopLeftRadius: '24px',
                      borderTopRightRadius: '24px'
                    }}
                  />

                  <Card.Body className="d-flex flex-column">
                    {/* Status Badge */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <Badge 
                        className="px-3 py-2 rounded-pill fw-bold"
                        style={getStatusBadgeStyle(app.status)}
                      >
                        <span className="me-1">{getStatusIcon(app.status)}</span>
                        {app.status}
                      </Badge>
                      <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                        {new Date(app.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </small>
                    </div>

                    {/* Project Title */}
                    <h5 className="shared-card-title mb-2">
                      {app.projectId?.title}
                    </h5>

                    {/* Project Description */}
                    <Card.Text className="text-muted small" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: '1.5',
                      marginBottom: '1rem'
                    }}>
                      {app.projectId?.description}
                    </Card.Text>

                    {/* Project Details */}
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <Badge className="shared-badge-type">
                        📌 {app.projectId?.projectType}
                      </Badge>
                      <Badge className="shared-badge-mode">
                        🌐 {app.projectId?.mode}
                      </Badge>
                    </div>

                    {/* Team Info */}
                    <div className="d-flex align-items-center justify-content-between p-2 rounded-3 mb-3" style={{
                      background: 'rgba(255, 248, 240, 0.5)'
                    }}>
                      <div className="d-flex align-items-center gap-2">
                        <span>👥</span>
                        <span className="fw-semibold">{app.projectId?.currentMembers}</span>
                        <span className="text-muted">/ {app.projectId?.teamSize} members</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <span>📅</span>
                        <small className="text-muted">{app.projectId?.expectedDuration || 'N/A'} months</small>
                      </div>
                    </div>

                    {/* Skills */}
                    {app.projectId?.requiredSkills?.length > 0 && (
                      <div className="mt-auto">
                        <small className="text-muted d-block mb-2">⚡ Required Skills</small>
                        <div className="d-flex flex-wrap gap-1">
                          {app.projectId.requiredSkills.slice(0, 4).map((skill, index) => (
                            <Badge 
                              key={index} 
                              bg="light" 
                              className="shared-badge-skill"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {app.projectId.requiredSkills.length > 4 && (
                            <Badge bg="light" className="shared-badge-skill">
                              +{app.projectId.requiredSkills.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Created By */}
                    <div className="mt-3 pt-3 border-top" style={{ borderColor: 'rgba(255, 193, 7, 0.1)' }}>
                      <div className="d-flex align-items-center gap-2">
                        <div className="shared-creator-avatar" style={{ width: '30px', height: '30px', fontSize: '0.8rem' }}>
                          {app.projectId?.createdBy?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <small className="text-muted d-block" style={{ fontSize: '0.6rem' }}>Project Owner</small>
                          <small className="fw-semibold" style={{ color: '#2d1b0e' }}>
                            {app.projectId?.createdBy?.name}
                          </small>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </SharedLayout>
  );
}

export default MyApplications;