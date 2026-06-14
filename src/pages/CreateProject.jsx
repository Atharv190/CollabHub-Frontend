import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function CreateProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectType: "College Project",
    requiredSkills: "",
    teamSize: "",
    mode: "Online",
    expectedDuration: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/project", {
        ...formData,
        requiredSkills: formData.requiredSkills
          .split(",")
          .map(skill => skill.trim())
      });

      alert("Project Created Successfully");

      navigate("/my-projects");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to Create Project"
      );
    }
  };

  return (
    <div className="container py-5">

      <div className="card shadow border-0">
        <div className="card-body p-4">

          <h2 className="mb-4">
            Create New Project
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                Project Title
              </label>

              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Description
              </label>

              <textarea
                name="description"
                className="form-control"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Project Type
                </label>

                <select
                  name="projectType"
                  className="form-select"
                  value={formData.projectType}
                  onChange={handleChange}
                >
                  <option>College Project</option>
                  <option>Hackathon</option>
                  <option>Startup Idea</option>
                  <option>Open Source</option>
                  <option>Freelance</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Team Size
                </label>

                <input
                  type="number"
                  name="teamSize"
                  className="form-control"
                  value={formData.teamSize}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="mb-3">
              <label className="form-label">
                Required Skills
              </label>

              <input
                type="text"
                name="requiredSkills"
                className="form-control"
                placeholder="React, Node, MongoDB"
                value={formData.requiredSkills}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Mode
                </label>

                <select
                  name="mode"
                  className="form-select"
                  value={formData.mode}
                  onChange={handleChange}
                >
                  <option>Online</option>
                  <option>Offline</option>
                  <option>Hybrid</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Expected Duration (Months)
                </label>

                <input
                  type="number"
                  name="expectedDuration"
                  className="form-control"
                  value={formData.expectedDuration}
                  onChange={handleChange}
                />
              </div>

            </div>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Create Project
            </button>

          </form>

        </div>
      </div>

    </div>
  );
}

export default CreateProject;