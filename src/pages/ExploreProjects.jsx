import { useEffect, useState } from "react";
import api from "../api/api";

function ExploreProjects() {
  const [projects, setProjects] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProject, setSelectedProject] =
    useState(null);

  const [resume, setResume] =
    useState(null);

  const [coverLetter, setCoverLetter] =
    useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {

      const [
        projectsRes,
        applicationsRes
      ] = await Promise.all([
        api.get("/project"),
        api.get("/application/my")
      ]);

      setProjects(
        projectsRes.data.projects || []
      );

      setMyApplications(
        applicationsRes.data.applications || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const applyProject = async () => {

    try {

      if (!resume) {
        return alert(
          "Please upload your resume"
        );
      }

      const formData =
        new FormData();

      formData.append(
        "resume",
        resume
      );

      formData.append(
        "coverLetter",
        coverLetter
      );

      const response =
        await api.post(
          `/application/${selectedProject}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      alert(response.data.message);

      setSelectedProject(null);
      setResume(null);
      setCoverLetter("");

      fetchProjects();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Application Failed"
      );

    }

  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading Projects...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <h2 className="mb-4">
        Explore Projects
      </h2>

      <div className="row">

        {projects
          .filter(
            (project) =>
              project.createdBy?._id !==
              user?._id
          )
          .map((project) => {

            const myApplication =
              myApplications.find(
                (app) =>
                  app.projectId?._id ===
                  project._id
              );

            return (
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
                      <strong>
                        Created By:
                      </strong>{" "}
                      {project.createdBy?.name}
                    </p>

                    <p>
                      <strong>
                        Team:
                      </strong>{" "}
                      {project.currentMembers}
                      /
                      {project.teamSize}
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

                    {myApplication ? (

                      <button
                        disabled
                        className={`btn ${
                          myApplication.status ===
                          "Accepted"
                            ? "btn-success"
                            : myApplication.status ===
                              "Rejected"
                            ? "btn-danger"
                            : "btn-warning"
                        }`}
                      >
                        {myApplication.status}
                      </button>

                    ) : (

                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          setSelectedProject(
                            project._id
                          )
                        }
                      >
                        Apply Now
                      </button>

                    )}

                  </div>

                </div>

              </div>
            );
          })}

      </div>

      {selectedProject && (
        <div
          className="modal d-block"
          style={{
            background:
              "rgba(0,0,0,0.5)"
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">

                <h5 className="modal-title">
                  Apply To Project
                </h5>

                <button
                  className="btn-close"
                  onClick={() =>
                    setSelectedProject(null)
                  }
                />

              </div>

              <div className="modal-body">

                <label className="form-label">
                  Upload Resume (PDF)
                </label>

                <input
                  type="file"
                  accept=".pdf"
                  className="form-control mb-3"
                  onChange={(e) =>
                    setResume(
                      e.target.files[0]
                    )
                  }
                />

                <label className="form-label">
                  Cover Letter
                </label>

                <textarea
                  rows="5"
                  className="form-control"
                  placeholder="Tell project owner why you're a good fit..."
                  value={coverLetter}
                  onChange={(e) =>
                    setCoverLetter(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setSelectedProject(null)
                  }
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  onClick={applyProject}
                >
                  Submit Application
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ExploreProjects;