import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge, Spinner } from "react-bootstrap";
import api from "../api/api";
import SharedLayout from "../components/SharedLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Global.css";

const STRIPE_COLORS = [
  "linear-gradient(90deg,#6C47FF,#A259FF)",
  "linear-gradient(90deg,#FF5C5C,#FF9A5C)",
  "linear-gradient(90deg,#FFD600,#FF9A5C)",
  "linear-gradient(90deg,#1AC8A0,#6C47FF)",
  "linear-gradient(90deg,#A259FF,#FF5C5C)",
  "linear-gradient(90deg,#00BFFF,#6C47FF)",
];

function MyProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/project/my");
      setProjects(response.data.projects || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (projectId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;
    try {
      const response = await api.delete(`/project/${projectId}`);
      alert(response.data.message);
      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="shared-loading">
        <div className="text-center">
          <Spinner 
            animation="border" 
            variant="primary" 
            className="shared-spinner"
          />
          <h3 className="mt-4 shared-loading-title">
            Loading your projects…
          </h3>
        </div>
      </div>
    );
  }

  return (
    <SharedLayout
      showHero={true}
      heroBadge="Workspace"
      heroTitle={
        <>
          My <span className="page-title-gradient">Projects</span>
        </>
      }
      heroSubtitle="Manage and track your projects"
    >
      <Container>
        {projects.length === 0 ? (
          <div className="text-center py-5">
            <div className="shared-empty-icon">🚀</div>
            <h4 className="fw-bold shared-empty-title">No projects yet</h4>
            <p className="text-muted mb-4">
              Start something great — create your first project in seconds.
            </p>
            <Button
              className="btn-gold-gradient px-4 py-3 rounded-pill fw-bold"
              onClick={() => navigate("/create-project")}
            >
              <span className="me-2 fs-4">＋</span>
              Create your first project
            </Button>
          </div>
        ) : (
          <>
            {/* Stats pills */}
            <Row className="g-3 mb-4">
              <Col xs="auto">
                <div className="bg-white px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2 shadow-sm">
                  <span className="d-inline-block rounded-circle bg-primary" style={{ width: '8px', height: '8px' }}></span>
                  {projects.length} Project{projects.length !== 1 ? "s" : ""}
                </div>
              </Col>
              <Col xs="auto">
                <div className="bg-white px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2 shadow-sm">
                  <span className="d-inline-block rounded-circle bg-success" style={{ width: '8px', height: '8px' }}></span>
                  {projects.reduce((a, p) => a + (p.currentMembers || 0), 0)} Total Members
                </div>
              </Col>
              <Col xs="auto">
                <div className="bg-white px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2 shadow-sm">
                  <span className="d-inline-block rounded-circle" style={{ width: '8px', height: '8px', background: '#FFD600' }}></span>
                  {projects.filter(p => p.mode === "Remote" || p.mode === "remote").length} Remote
                </div>
              </Col>
            </Row>

            {/* Cards Grid */}
            <Row className="g-4">
              {projects.map((project, i) => {
                const fillPct = project.teamSize
                  ? Math.round((project.currentMembers / project.teamSize) * 100)
                  : 0;
                return (
                  <Col key={project._id} xs={12} md={6} lg={4}>
                    <Card className="shared-card h-100">
                      <div 
                        className="card-stripe" 
                        style={{ 
                          height: '6px', 
                          background: STRIPE_COLORS[i % STRIPE_COLORS.length],
                          borderTopLeftRadius: '24px',
                          borderTopRightRadius: '24px'
                        }}
                      />
                      <Card.Body className="d-flex flex-column">
                        <div className="d-flex flex-wrap gap-1 mb-2">
                          <Badge className="shared-badge-type">{project.projectType}</Badge>
                          <Badge className="shared-badge-mode">{project.mode}</Badge>
                        </div>

                        <h5 className="shared-card-title">{project.title}</h5>
                        <Card.Text className="text-muted" style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          fontSize: '13.5px',
                          lineHeight: '1.55'
                        }}>
                          {project.description}
                        </Card.Text>

                        {/* Members progress */}
                        <div className="mb-3">
                          <div className="d-flex justify-content-between small text-secondary mb-1">
                            <span>
                              <strong>{project.currentMembers}</strong> / {project.teamSize} members
                            </span>
                            <span>{fillPct}% full</span>
                          </div>
                          <div className="bg-light rounded-pill" style={{ height: '5px', overflow: 'hidden' }}>
                            <div 
                              className="h-100 rounded-pill" 
                              style={{ 
                                width: `${fillPct}%`,
                                background: 'linear-gradient(90deg, #6C47FF, #8B6AFF)',
                                transition: 'width 0.6s ease'
                              }}
                            />
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-3 mb-3 small text-secondary">
                          <span>⏱ <strong>{project.expectedDuration ?? "N/A"}</strong> months</span>
                        </div>

                        {/* Skills */}
                        {project.requiredSkills?.length > 0 && (
                          <div className="d-flex flex-wrap gap-1 mb-3">
                            {project.requiredSkills.map((skill, idx) => (
                              <Badge key={idx} bg="light" className="shared-badge-skill">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="mt-auto d-flex gap-2">
                          <Button
                            variant="outline-primary"
                            className="flex-grow-1 rounded-pill fw-semibold"
                            style={{ borderWidth: '2px' }}
                            onClick={() => navigate(`/manage-applicants/${project._id}`)}
                          >
                            👥 Applicants
                          </Button>
                          <Button
                            variant="outline-danger"
                            className="flex-grow-1 rounded-pill fw-semibold"
                            style={{ borderWidth: '2px' }}
                            onClick={() => deleteProject(project._id)}
                          >
                            🗑 Delete
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </Container>
    </SharedLayout>
  );
}

export default MyProjects;