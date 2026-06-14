import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

function Dashboard() {
  const [myProjects, setMyProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
  try {
    const [myProjectsRes, allProjectsRes, applicationsRes] =
      await Promise.all([
        api.get("/project/my"),
        api.get("/project"),
        api.get("/application/my"),
      ]);

    console.log("My Projects:", myProjectsRes.data);
    console.log("All Projects:", allProjectsRes.data);

    setMyProjects(myProjectsRes.data.projects || []);
    setAllProjects(allProjectsRes.data.projects || []);
    setApplications(applicationsRes.data.applications || []);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading Dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row">

        <div
          className="col-md-2 bg-dark text-white p-4"
          style={{ minHeight: "100vh" }}
        >
          <h3 className="fw-bold text-center mb-4">
            CollabHub
          </h3>

          <div className="d-grid gap-2">

            <Link to="/dashboard" className="btn btn-outline-light text-start">
              Dashboard
            </Link>

            <Link to="/create-project" className="btn btn-outline-light text-start">
              Create Project
            </Link>

            <Link to="/my-projects" className="btn btn-outline-light text-start">
              My Projects
            </Link>

            <Link to="/explore-projects" className="btn btn-outline-light text-start">
              Explore Projects
            </Link>

            <Link to="/my-applications" className="btn btn-outline-light text-start">
              Applications
            </Link>

            <Link to="/profile" className="btn btn-outline-light text-start">
              Profile
            </Link>

            <button
              onClick={logout}
              className="btn btn-danger mt-4"
            >
              Logout
            </button>

          </div>
        </div>

        <div className="col-md-10 p-4">

          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body d-flex justify-content-between align-items-center">

              <div>
                <h2 className="fw-bold">
                  Welcome Back, {user?.name} 👋
                </h2>

                <p className="text-muted mb-0">
                  Manage projects and collaborate with talented students.
                </p>
              </div>

              <Link
                to="/create-project"
                className="btn btn-primary"
              >
                + Create Project
              </Link>

            </div>
          </div>

          <div className="row g-4 mb-5">

            <div className="col-md-4">
              <div className="card border-0 shadow rounded-4">
                <div className="card-body text-center py-4">
                  <h6 className="text-muted">My Projects</h6>
                  <h1 className="fw-bold text-primary">
                    {myProjects.length}
                  </h1>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow rounded-4">
                <div className="card-body text-center py-4">
                  <h6 className="text-muted">Available Projects</h6>
                  <h1 className="fw-bold text-success">
                    {allProjects.length}
                  </h1>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow rounded-4">
                <div className="card-body text-center py-4">
                  <h6 className="text-muted">Applications</h6>
                  <h1 className="fw-bold text-warning">
                    {applications.length}
                  </h1>
                </div>
              </div>
            </div>

          </div>

          <h4 className="mb-3">Quick Actions</h4>

          <div className="row g-3 mb-5">

            <div className="col-md-3">
              <Link to="/create-project" className="btn btn-primary w-100 p-3">
                Create Project
              </Link>
            </div>

            <div className="col-md-3">
              <Link to="/my-projects" className="btn btn-success w-100 p-3">
                My Projects
              </Link>
            </div>

            <div className="col-md-3">
              <Link to="/explore-projects" className="btn btn-warning w-100 p-3">
                Explore Projects
              </Link>
            </div>

            <div className="col-md-3">
              <Link to="/profile" className="btn btn-dark w-100 p-3">
                Profile
              </Link>
            </div>

          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Recent Projects</h4>

            <Link
              to="/my-projects"
              className="btn btn-outline-primary"
            >
              View All
            </Link>
          </div>

          {myProjects.length === 0 ? (
            <div className="alert alert-info">
              No projects created yet.
            </div>
          ) : (
            <div className="row">

              {myProjects.slice(0, 3).map((project) => (
                <div
                  key={project._id}
                  className="col-md-4 mb-4"
                >
                  <div className="card border-0 shadow h-100">

                    <div className="card-body">

                      <h5 className="fw-bold">
                        {project.title}
                      </h5>

                      <p className="text-muted">
                        {project.description}
                      </p>

                      <div className="mb-3">

                        <span className="badge bg-primary me-2">
                          {project.projectType}
                        </span>

                        <span className="badge bg-success">
                          {project.mode}
                        </span>

                      </div>

                      <p>
                        Team:
                        {" "}
                        <strong>
                          {project.currentMembers}/{project.teamSize}
                        </strong>
                      </p>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}

          <div className="text-center mt-4">

            <Link
              to="/explore-projects"
              className="btn btn-outline-primary me-2"
            >
              Explore Projects
            </Link>

            <Link
              to="/my-applications"
              className="btn btn-outline-success"
            >
              View Applications
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
