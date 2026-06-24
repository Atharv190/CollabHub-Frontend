import { useEffect, useState } from "react";
import api from "../api/api";
import { Container, Row, Col, Card, Badge, Button, Modal, Form, Spinner } from 'react-bootstrap';
import SharedLayout from "../components/SharedLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Global.css"; // Import global styles

function ExploreProjects() {
  const [projects, setProjects] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const [projectsRes, applicationsRes] = await Promise.all([
        api.get("/project"),
        api.get("/application/my")
      ]);

      setProjects(projectsRes.data.projects || []);
      setMyApplications(applicationsRes.data.applications || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const applyProject = async () => {
    try {
      if (!resume) {
        return alert("Please upload your resume");
      }

      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("coverLetter", coverLetter);

      const response = await api.post(
        `/application/${selectedProject}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);
      setSelectedProject(null);
      setShowModal(false);
      setResume(null);
      setCoverLetter("");
      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || "Application Failed");
    }
  };

  const getStatusVariant = (status) => {
    switch(status) {
      case "Accepted":
        return "success";
      case "Rejected":
        return "danger";
      default:
        return "warning";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Accepted":
        return "✅";
      case "Rejected":
        return "❌";
      default:
        return "⏳";
    }
  };

  const handleApplyClick = (projectId) => {
    setSelectedProject(projectId);
    setShowModal(true);
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
            Discovering Amazing Projects...
          </h3>
          <p className="text-muted">Finding the perfect opportunity for you</p>
        </div>
      </div>
    );
  }

  const filteredProjects = projects.filter(
    (project) => project.createdBy?._id !== user?._id
  );

  return (
    <SharedLayout
      showHero={true}
      heroBadge="✨ Discover Opportunities"
      heroTitle={
        <>
          Explore <span className="page-title-gradient">Projects</span>
        </>
      }
      heroSubtitle="Find your next collaboration and grow your network"
    >
      {/* Projects Grid */}
      <Container>
        {filteredProjects.length === 0 ? (
          <div className="text-center py-5">
            <div className="shared-empty-icon">📭</div>
            <h4 className="fw-bold shared-empty-title">No projects available</h4>
            <p className="text-muted">Check back later for new opportunities</p>
          </div>
        ) : (
          <Row className="g-4">
            {filteredProjects.map((project) => {
              const myApplication = myApplications.find(
                (app) => app.projectId?._id === project._id
              );

              return (
                <Col key={project._id} xs={12} md={6} lg={4}>
                  <Card className="shared-card h-100">
                    {/* Card Header */}
                    <Card.Header className="shared-card-header">
                      <div className="d-flex justify-content-between align-items-start">
                        <h5 className="shared-card-title mb-0">
                          {project.title}
                        </h5>
                        <Badge bg="light" className="px-3 py-2 rounded-pill text-dark">
                          <span className="me-1">👥</span>
                          {project.currentMembers}/{project.teamSize}
                        </Badge>
                      </div>
                    </Card.Header>

                    {/* Card Body */}
                    <Card.Body className="d-flex flex-column">
                      <Card.Text className="text-muted" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: '1.6'
                      }}>
                        {project.description}
                      </Card.Text>

                      <div className="d-flex gap-2 flex-wrap mb-3">
                        <Badge className="shared-badge-type">
                          📌 {project.projectType}
                        </Badge>
                        <Badge className="shared-badge-mode">
                          🌐 {project.mode}
                        </Badge>
                      </div>

                      <div className="shared-creator-info">
                        <div className="shared-creator-avatar">
                          {project.createdBy?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <small className="text-muted d-block shared-creator-label">Created by</small>
                          <strong className="shared-creator-name">
                            {project.createdBy?.name}
                          </strong>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <small className="text-muted d-block mb-2">⚡ Required Skills</small>
                        <div className="d-flex flex-wrap gap-1">
                          {project.requiredSkills?.map((skill, index) => (
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
                    </Card.Body>

                    {/* Card Footer */}
                    <Card.Footer className="border-0 bg-transparent p-3" style={{
                      borderTop: '1px solid rgba(255, 193, 7, 0.1)'
                    }}>
                      {myApplication ? (
                        <Button 
                          variant={getStatusVariant(myApplication.status)}
                          className="w-100 rounded-pill fw-bold"
                          disabled
                          style={{ padding: '0.7rem' }}
                        >
                          <span className="me-2">{getStatusIcon(myApplication.status)}</span>
                          {myApplication.status}
                        </Button>
                      ) : (
                        <Button 
                          className="w-100 rounded-pill fw-bold btn-gold-gradient"
                          onClick={() => handleApplyClick(project._id)}
                          style={{ padding: '0.7rem' }}
                        >
                          <span className="me-2">📤</span>
                          Apply Now
                        </Button>
                      )}
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>

      {/* Application Modal */}
      <Modal 
        show={showModal} 
        onHide={() => {
          setShowModal(false);
          setSelectedProject(null);
          setResume(null);
          setCoverLetter("");
        }}
        centered
        size="lg"
        className="shared-modal"
      >
        <Modal.Header className="shared-modal-header">
          <Modal.Title className="fw-bold" style={{ color: '#2d1b0e' }}>
            <span className="me-2">📤</span>
            Submit Application
          </Modal.Title>
          <button 
            className="btn-close" 
            onClick={() => {
              setShowModal(false);
              setSelectedProject(null);
              setResume(null);
              setCoverLetter("");
            }}
          />
        </Modal.Header>

        <Modal.Body className="shared-modal-body">
          <Form>
            <Form.Group className="mb-4">
              <Form.Label className="shared-form-label">
                <span className="me-2">📄</span>
                Upload Resume (PDF)
              </Form.Label>
              <div className="position-relative">
                <Form.Control
                  type="file"
                  accept=".pdf"
                  id="resume-upload"
                  className="shared-file-input"
                  onChange={(e) => setResume(e.target.files[0])}
                />
                <label 
                  htmlFor="resume-upload"
                  className="shared-file-label"
                >
                  <span className="me-2">☁️</span>
                  {resume ? resume.name : "Choose PDF file"}
                </label>
              </div>
              {resume && (
                <small className="text-success mt-2 d-block">
                  ✅ {resume.name} uploaded successfully
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label className="shared-form-label">
                <span className="me-2">💬</span>
                Cover Letter
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                className="shared-textarea"
                placeholder="Tell the project owner why you're a perfect fit..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
              <Form.Text className="text-muted">
                ℹ️ Be specific about your skills and experience
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="shared-modal-footer">
          <Button 
            variant="outline-secondary"
            className="rounded-pill px-4 fw-bold"
            onClick={() => {
              setShowModal(false);
              setSelectedProject(null);
              setResume(null);
              setCoverLetter("");
            }}
            style={{ borderWidth: '2px' }}
          >
            Cancel
          </Button>
          <Button 
            className="rounded-pill px-4 fw-bold btn-gold-gradient"
            onClick={applyProject}
          >
            <span className="me-2">🚀</span>
            Submit Application
          </Button>
        </Modal.Footer>
      </Modal>
    </SharedLayout>
  );
}

export default ExploreProjects;