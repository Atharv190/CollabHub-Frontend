// Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
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
      const response = await api.post("/auth/login", formData);

localStorage.setItem("token", response.data.token);
localStorage.setItem("user", JSON.stringify(response.data.user));

const user = response.data.user;

// First time login
if (!user.profileCompleted) {
  navigate("/complete-profile");
} else {
  navigate("/dashboard");
}
      
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg border-0" style={{ width: "450px", borderRadius: "15px" }}>
        <div className="card-body p-4">
          <h2 className="text-center mb-4">Welcome Back 👋</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Don't have an account?
            <Link to="/register" className="text-decoration-none ms-1">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;