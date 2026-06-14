import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

const handleViewResume = async (
  applicationId
) => {
  try {

    const res = await api.get(
      `/application/resume/view/${applicationId}`,
      {
        responseType: "blob"
      }
    );

    const pdfBlob = new Blob(
      [res.data],
      {
        type: "application/pdf"
      }
    );

    const pdfUrl =
      URL.createObjectURL(pdfBlob);

    window.open(
      pdfUrl,
      "_blank"
    );

  } catch (error) {

    console.log(error);
    alert("Failed to open resume");

  }
};

const handleDownloadResume = async (
  applicationId
) => {

  try {

    const res = await api.get(
      `/application/resume/download/${applicationId}`,
      {
        responseType: "blob"
      }
    );

    const pdfBlob =
      new Blob(
        [res.data],
        {
          type: "application/pdf"
        }
      );

    const pdfUrl =
      URL.createObjectURL(pdfBlob);

    const link =
      document.createElement("a");

    link.href = pdfUrl;

    link.download =
      "Resume.pdf";

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    URL.revokeObjectURL(pdfUrl);

  } catch (error) {

    console.log(error);

  }

};

function ManageApplicants() {
const { projectId } = useParams();

const [applications, setApplications] =
useState([]);

const [loading, setLoading] =
useState(true);

useEffect(() => {
fetchApplicants();
}, []);

const fetchApplicants = async () => {
try {
const response =
await api.get(
`/application/project/${projectId}`
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

const acceptApplicant = async (
applicationId
) => {
try {
const response =
await api.put(
`/application/${applicationId}/accept`
);

  alert(response.data.message);

  fetchApplicants();

} catch (error) {
  alert(
    error.response?.data?.message ||
      "Failed"
  );
}

};

const rejectApplicant = async (
applicationId
) => {
try {
const response =
await api.put(
`/application/${applicationId}/reject`);

  alert(response.data.message);

  fetchApplicants();

} catch (error) {
  alert(
    error.response?.data?.message ||
      "Failed"
  );
}

};

if (loading) {
return ( <div className="container py-5 text-center"> <h3>
Loading Applicants... </h3> </div>
);
}

return ( <div className="container py-5">

  <div className="d-flex justify-content-between align-items-center mb-4">
    <h2>
      Project Applicants
    </h2>

    <span className="badge bg-primary fs-6">
      {applications.length} Applicants
    </span>
  </div>

  {applications.length === 0 ? (
    <div className="alert alert-info">
      No applicants yet.
    </div>
  ) : (
    applications.map((app) => (
      <div
        key={app._id}
        className="card shadow border-0 mb-4"
      >
        <div className="card-body">

          <div className="row">

            <div className="col-md-8">

  <h4 className="fw-bold mb-3">
    {app.applicantId?.name}
  </h4>

  <p>
    <strong>Email:</strong>{" "}
    {app.applicantId?.email}
  </p>

  <p>
    <strong>Phone:</strong>{" "}
    {app.applicantId?.phone}
  </p>

  <p>
    <strong>Bio:</strong>{" "}
    {app.applicantId?.bio}
  </p>

  <div className="mb-3">
    <strong>Skills:</strong>

    <div className="mt-2">

      {app.applicantId?.skills?.map(
        (skill, index) => (
          <span
            key={index}
            className="badge bg-primary me-2 mb-2"
          >
            {skill}
          </span>
        )
      )}

    </div>
  </div>

  <p>
    <strong>GitHub:</strong>{" "}
    <a
      href={app.applicantId?.github}
      target="_blank"
      rel="noreferrer"
    >
      {app.applicantId?.github}
    </a>
  </p>

  <p>
    <strong>LinkedIn:</strong>{" "}
    <a
      href={app.applicantId?.linkedin}
      target="_blank"
      rel="noreferrer"
    >
      {app.applicantId?.linkedin}
    </a>
  </p>

  <p>
    <strong>Portfolio:</strong>{" "}
    <a
      href={app.applicantId?.portfolio}
      target="_blank"
      rel="noreferrer"
    >
      {app.applicantId?.portfolio}
    </a>
  </p>

  <div className="mb-3">
    <strong>Cover Letter:</strong>

    <div className="border rounded p-3 mt-2 bg-light">
      {app.coverLetter}
    </div>
  </div>

</div>

            <div className="col-md-4 text-end">

              <span
                className={`badge fs-6 mb-3 ${
                  app.status ===
                  "Accepted"
                    ? "bg-success"
                    : app.status ===
                      "Rejected"
                    ? "bg-danger"
                    : "bg-warning text-dark"
                }`}
              >
                {app.status}
              </span>

              <div className="mb-3">

                {app.resumeUrl ? (
                  <>
                    <button
  className="btn btn-primary me-2"
  onClick={() =>
    handleViewResume(app._id)
  }
>
  View Resume
</button>

<button
  className="btn btn-success"
  onClick={() =>
    handleDownloadResume(app._id)
  }
>
  Download Resume
</button>
                  </>
                ) : (
                  <span className="text-danger">
                    Resume Not Uploaded
                  </span>
                )}

              </div>

              {app.status ===
              "Pending" ? (
                <>
                  <button
                    className="btn btn-success me-2"
                    onClick={() =>
                      acceptApplicant(
                        app._id
                      )
                    }
                  >
                    Accept
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      rejectApplicant(
                        app._id
                      )
                    }
                  >
                    Reject
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-secondary"
                  disabled
                >
                  Action Completed
                </button>
              )}

            </div>

          </div>

        </div>
      </div>
    ))
  )}

</div>

);
}

export default ManageApplicants;
