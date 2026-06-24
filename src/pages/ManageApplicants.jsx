import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import { Container, Row, Col, Card, Badge, Button, Spinner } from 'react-bootstrap';
import SharedLayout from "../components/SharedLayout";
import 'bootstrap/dist/css/bootstrap.min.css';

const handleViewResume = async (applicationId) => {
  try {
    const res = await api.get(`/application/resume/view/${applicationId}`, {
      responseType: "blob"
    });
    const pdfBlob = new Blob([res.data], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  } catch (error) {
    console.log(error);
    alert("Failed to open resume");
  }
};

const handleDownloadResume = async (applicationId) => {
  try {
    const res = await api.get(`/application/resume/download/${applicationId}`, {
      responseType: "blob"
    });
    const pdfBlob = new Blob([res.data], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Resume.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(pdfUrl);
  } catch (error) {
    console.log(error);
  }
};

function ManageApplicants() {
  const { projectId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const response = await api.get(`/application/project/${projectId}`);
      setApplications(response.data.applications || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const acceptApplicant = async (applicationId) => {
    try {
      const response = await api.put(`/application/${applicationId}/accept`);
      alert(response.data.message);
      fetchApplicants();
    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  const rejectApplicant = async (applicationId) => {
    try {
      const response = await api.put(`/application/${applicationId}/reject`);
      alert(response.data.message);
      fetchApplicants();
    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      Accepted: { variant: "success", icon: "✅" },
      Rejected: { variant: "danger", icon: "❌" },
      Pending: { variant: "warning", icon: "⏳" },
    };
    return map[status] || map.Pending;
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
            Loading Applicants...
          </h3>
          <p className="text-muted">Fetching all applicants for this project</p>
        </div>
      </div>
    );
  }

  return (
    <SharedLayout
      showHero={true}
      heroBadge="👥 Manage Applicants"
      heroTitle={
        <>
          Project <span className="page-title-gradient">Applicants</span>
        </>
      }
      heroSubtitle="Review and manage all applications for your project"
    >
      <Container>
        {/* ─── Stats Header ─── */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h5 className="fw-bold mb-0" style={{ color: '#2d1b0e' }}>
              📋 Applications
            </h5>
            <small className="text-muted">Review and manage applicants</small>
          </div>
          <Badge className="px-4 py-2 rounded-pill" style={{
            background: 'linear-gradient(135deg, #ffc107, #ff9800)',
            color: '#2d1b0e',
            fontSize: '1rem',
            fontWeight: 700
          }}>
            {applications.length} {applications.length === 1 ? 'Applicant' : 'Applicants'}
          </Badge>
        </div>

        {/* ─── Applications List ─── */}
        {applications.length === 0 ? (
          <Card className="shared-card text-center py-5">
            <Card.Body>
              <div className="shared-empty-icon">📭</div>
              <h4 className="fw-bold shared-empty-title">No applicants yet</h4>
              <p className="text-muted">Your project hasn't received any applications yet.</p>
              <Link to="/my-projects">
                <Button className="btn-gold-gradient px-4 py-2 rounded-pill fw-bold">
                  ← Back to Projects
                </Button>
              </Link>
            </Card.Body>
          </Card>
        ) : (
          <div className="d-flex flex-column gap-4">
            {applications.map((app) => {
              const status = getStatusBadge(app.status);
              const isPending = app.status === "Pending";

              return (
                <Card key={app._id} className="shared-card">
                  {/* Status Stripe */}
                  <div 
                    className="card-stripe" 
                    style={{ 
                      height: '4px', 
                      background: isPending ? 'linear-gradient(90deg, #ffc107, #ff9800)' :
                                 app.status === 'Accepted' ? 'linear-gradient(90deg, #28a745, #20c997)' :
                                 'linear-gradient(90deg, #dc3545, #ff6b6b)',
                      borderTopLeftRadius: '24px',
                      borderTopRightRadius: '24px'
                    }}
                  />

                  <Card.Body className="p-4">
                    <Row>
                      <Col lg={8}>
                        {/* Applicant Header */}
                        <div className="d-flex align-items-center gap-3 mb-3">
                          <div className="shared-creator-avatar" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>
                            {app.applicantId?.name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <h4 className="fw-bold mb-0" style={{ color: '#2d1b0e' }}>
                              {app.applicantId?.name}
                            </h4>
                            <small className="text-muted">Applicant</small>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="row g-2 mb-3">
                          <div className="col-md-6">
                            <div className="d-flex align-items-center gap-2 p-2 rounded-3" style={{ background: 'rgba(255, 248, 240, 0.3)' }}>
                              <span>📧</span>
                              <div>
                                <small className="text-muted d-block" style={{ fontSize: '0.65rem' }}>Email</small>
                                <span style={{ color: '#2d1b0e', fontSize: '0.9rem' }}>{app.applicantId?.email}</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex align-items-center gap-2 p-2 rounded-3" style={{ background: 'rgba(255, 248, 240, 0.3)' }}>
                              <span>📱</span>
                              <div>
                                <small className="text-muted d-block" style={{ fontSize: '0.65rem' }}>Phone</small>
                                <span style={{ color: '#2d1b0e', fontSize: '0.9rem' }}>{app.applicantId?.phone || 'Not provided'}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bio */}
                        {app.applicantId?.bio && (
                          <div className="mb-3 p-3 rounded-3" style={{ background: 'rgba(255, 248, 240, 0.3)' }}>
                            <small className="text-muted d-block mb-1">📝 Bio</small>
                            <p className="mb-0" style={{ color: '#2d1b0e', fontSize: '0.9rem' }}>{app.applicantId?.bio}</p>
                          </div>
                        )}

                        {/* Skills */}
                        {app.applicantId?.skills?.length > 0 && (
                          <div className="mb-3">
                            <small className="text-muted d-block mb-2">⚡ Skills</small>
                            <div className="d-flex flex-wrap gap-1">
                              {app.applicantId.skills.map((skill, index) => (
                                <Badge 
                                  key={index} 
                                  bg="light" 
                                  className="shared-badge-skill"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Social Links */}
                        <div className="row g-2 mb-3">
                          {app.applicantId?.github && (
                            <div className="col-md-4">
                              <a href={app.applicantId.github} target="_blank" rel="noreferrer" className="text-decoration-none">
                                <div className="d-flex align-items-center gap-2 p-2 rounded-3" style={{ background: 'rgba(255, 248, 240, 0.3)', transition: 'all 0.2s' }}
                                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 193, 7, 0.1)'}
                                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 248, 240, 0.3)'}>
                                  <span>🐙</span>
                                  <div>
                                    <small className="text-muted d-block" style={{ fontSize: '0.65rem' }}>GitHub</small>
                                    <span style={{ color: '#2d1b0e', fontSize: '0.8rem' }}>View Profile</span>
                                  </div>
                                </div>
                              </a>
                            </div>
                          )}
                          {app.applicantId?.linkedin && (
                            <div className="col-md-4">
                              <a href={app.applicantId.linkedin} target="_blank" rel="noreferrer" className="text-decoration-none">
                                <div className="d-flex align-items-center gap-2 p-2 rounded-3" style={{ background: 'rgba(255, 248, 240, 0.3)', transition: 'all 0.2s' }}
                                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 193, 7, 0.1)'}
                                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 248, 240, 0.3)'}>
                                  <span>🔗</span>
                                  <div>
                                    <small className="text-muted d-block" style={{ fontSize: '0.65rem' }}>LinkedIn</small>
                                    <span style={{ color: '#2d1b0e', fontSize: '0.8rem' }}>View Profile</span>
                                  </div>
                                </div>
                              </a>
                            </div>
                          )}
                          {app.applicantId?.portfolio && (
                            <div className="col-md-4">
                              <a href={app.applicantId.portfolio} target="_blank" rel="noreferrer" className="text-decoration-none">
                                <div className="d-flex align-items-center gap-2 p-2 rounded-3" style={{ background: 'rgba(255, 248, 240, 0.3)', transition: 'all 0.2s' }}
                                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 193, 7, 0.1)'}
                                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 248, 240, 0.3)'}>
                                  <span>🌐</span>
                                  <div>
                                    <small className="text-muted d-block" style={{ fontSize: '0.65rem' }}>Portfolio</small>
                                    <span style={{ color: '#2d1b0e', fontSize: '0.8rem' }}>View Site</span>
                                  </div>
                                </div>
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Cover Letter */}
                        {app.coverLetter && (
                          <div className="mb-3">
                            <small className="text-muted d-block mb-2">💬 Cover Letter</small>
                            <div className="p-3 rounded-3" style={{
                              background: 'rgba(255, 248, 240, 0.3)',
                              border: '1px solid rgba(255, 193, 7, 0.1)',
                              borderRadius: '12px'
                            }}>
                              <p className="mb-0" style={{ color: '#2d1b0e', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                {app.coverLetter}
                              </p>
                            </div>
                          </div>
                        )}
                      </Col>

                      <Col lg={4} className="mt-3 mt-lg-0">
                        {/* Status & Actions */}
                        <div className="d-flex flex-column align-items-lg-end">
                          {/* Status Badge */}
                          <Badge 
                            bg={status.variant} 
                            className="px-4 py-2 rounded-pill mb-3 fs-6"
                            style={{ fontWeight: 600 }}
                          >
                            {status.icon} {app.status}
                          </Badge>

                          {/* Resume Actions */}
                          <div className="w-100 mb-3">
                            <small className="text-muted d-block mb-2">📄 Resume</small>
                            <div className="d-flex gap-2 flex-wrap">
                              {app.resumeUrl ? (
                                <>
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="rounded-pill"
                                    onClick={() => handleViewResume(app._id)}
                                  >
                                    👁️ View
                                  </Button>
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    className="rounded-pill"
                                    onClick={() => handleDownloadResume(app._id)}
                                  >
                                    ⬇️ Download
                                  </Button>
                                </>
                              ) : (
                                <span className="text-danger" style={{ fontSize: '0.85rem' }}>
                                  ⚠️ Not uploaded
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="w-100">
                            {isPending ? (
                              <div className="d-flex gap-2 flex-wrap">
                                <Button
                                  className="rounded-pill px-4 fw-bold flex-grow-1"
                                  style={{
                                    background: 'linear-gradient(135deg, #28a745, #20c997)',
                                    color: 'white',
                                    border: 'none'
                                  }}
                                  onClick={() => acceptApplicant(app._id)}
                                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                  ✅ Accept
                                </Button>
                                <Button
                                  variant="danger"
                                  className="rounded-pill px-4 fw-bold flex-grow-1"
                                  onClick={() => rejectApplicant(app._id)}
                                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                  ❌ Reject
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="secondary"
                                className="rounded-pill w-100 fw-bold"
                                disabled
                              >
                                ✓ Action Completed
                              </Button>
                            )}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        )}

        {/* ─── Back Button ─── */}
        <div className="mt-4 text-center">
          <Link to="/my-projects" className="text-decoration-none">
            <Button className="rounded-pill px-4 fw-bold" style={{ borderWidth: '2px' }} variant="outline-secondary">
              ← Back to My Projects
            </Button>
          </Link>
        </div>
      </Container>
    </SharedLayout>
  );
}

export default ManageApplicants;