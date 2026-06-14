import { useEffect, useState } from "react";
import api from "../api/api";

function MyApplications() {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {

    try {

      const response = await api.get(
        "/application/my"
      );

      setApplications(
        response.data.applications || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const getBadgeClass = (status) => {

    switch (status) {

      case "Accepted":
        return "bg-success";

      case "Rejected":
        return "bg-danger";

      default:
        return "bg-warning text-dark";
    }

  };

  if (loading) {
    return (
      <div className="container py-5">
        <h3>Loading Applications...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <h2 className="mb-4">
        My Applications
      </h2>

      {applications.length === 0 ? (

        <div className="alert alert-info">
          You have not applied to any projects yet.
        </div>

      ) : (

        <div className="row">

          {applications.map((app) => (

            <div
              key={app._id}
              className="col-md-6 mb-4"
            >

              <div className="card shadow-sm border-0 h-100">

                <div className="card-body">

                  <h4>
                    {app.projectId?.title}
                  </h4>

                  <div className="mb-3">

                    <span
                      className={`badge ${getBadgeClass(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>

                  </div>

                  <p>
                    <strong>
                      Project Type:
                    </strong>{" "}
                    {app.projectId?.projectType}
                  </p>

                  <p>
                    <strong>
                      Mode:
                    </strong>{" "}
                    {app.projectId?.mode}
                  </p>

                  <p>
                    <strong>
                      Team:
                    </strong>{" "}
                    {app.projectId?.currentMembers}
                    /
                    {app.projectId?.teamSize}
                  </p>

                  <small className="text-muted">
                    Applied On:{" "}
                    {new Date(
                      app.createdAt
                    ).toLocaleDateString()}
                  </small>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyApplications;