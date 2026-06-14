import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard";
import CompleteProfile from "./pages/CompleteProfile";
import CreateProject from "./pages/CreateProject";
import MyProjects from "./pages/MyProjects";
import ExploreProjects from "./pages/ExploreProjects";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";
import ManageApplicants from "./pages/ManageApplicants";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/complete-profile" element={<CompleteProfile />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/create-project" element={<CreateProject />} />

        <Route path="/my-projects" element={<MyProjects />} />

        <Route path="/explore-projects" element={<ExploreProjects />} />

        <Route path="/my-applications" element={<MyApplications />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/manage-applicants/:projectId" element={<ManageApplicants />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;