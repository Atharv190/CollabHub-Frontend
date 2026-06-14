import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function MyProjects() {

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {

    try {

      const response = await api.get(
        "/project/my"
      );

      setProjects(
        response.data.projects || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const deleteProject = async (projectId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {

      const response = await api.delete(
        `/project/${projectId}`
      );

      alert(response.data.message);

      fetchProjects();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Delete Failed"
      );

    }

  };

  if (loading) {
    return (
      <div className="container py-5">
        <h3>Loading Projects...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>My Projects</h2>

        <button
          className="btn btn-primary"
          onClick={() =>
            navigate("/create-project")
          }
        >
          + Create Project
        </button>

      </div>

      {projects.length === 0 ? (

        <div className="alert alert-info">
          You haven't created any project yet.
        </div>

      ) : (

        <div className="row">

          {projects.map((project) => (

            <div
              key={project._id}
              className="col-md-6 mb-4"
            >

              <div className="card shadow-sm border-0 h-100">

                <div className="card-body">

                  <h4>
                    {project.title}
                  </h4>

                  <p className="text-muted">
                    {project.description}
                  </p>

                  <div className="mb-2">

                    <span className="badge bg-primary me-2">
                      {project.projectType}
                    </span>

                    <span className="badge bg-success">
                      {project.mode}
                    </span>

                  </div>

                  <p>
                    <strong>Members:</strong>{" "}
                    {project.currentMembers}
                    /
                    {project.teamSize}
                  </p>

                  <p>
                    <strong>Duration:</strong>{" "}
                    {project.expectedDuration || "N/A"} Months
                  </p>

                  <div className="mb-3">

                    {project.requiredSkills?.map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="badge bg-secondary me-2"
                        >
                          {skill}
                        </span>
                      )
                    )}

                  </div>

                  <div className="d-flex gap-2">

                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        navigate(
                          `/manage-applicants/${project._id}`
                        )
                      }
                    >
                      Applicants
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        deleteProject(project._id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyProjects;