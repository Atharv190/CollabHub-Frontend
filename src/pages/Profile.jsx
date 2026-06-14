import { useEffect, useState } from "react";
import api from "../api/api";

function Profile() {

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
    portfolio: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const response = await api.get(
        "/user/profile"
      );

      const user = response.data.user;

      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        skills: user.skills
          ? user.skills.join(", ")
          : "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        portfolio: user.portfolio || ""
      });

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.put(
        "/user/profile",
        {
          ...formData,
          skills: formData.skills
            .split(",")
            .map(skill => skill.trim())
        }
      );

      alert("Profile Updated Successfully");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Update Failed"
      );

    }

  };

  if (loading) {
    return (
      <div className="container py-5">
        <h3>Loading Profile...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow border-0">

            <div className="card-body p-4">

              <h2 className="mb-4">
                My Profile
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="form-control"
                    />

                  </div>

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Bio
                  </label>

                  <textarea
                    rows="4"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="form-control"
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Skills
                  </label>

                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="React, Node, MongoDB"
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    GitHub
                  </label>

                  <input
                    type="text"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="form-control"
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    LinkedIn
                  </label>

                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="form-control"
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label">
                    Portfolio
                  </label>

                  <input
                    type="text"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="form-control"
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Update Profile
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;