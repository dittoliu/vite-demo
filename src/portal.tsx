import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/portal.scss";

interface DocumentValidationProps {}

const DocumentValidation: React.FC<DocumentValidationProps> = () => {
  const [documentId, setDocumentId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch documentId from the server after component mounts
    axios
      .get("/get-document-id")
      .then((response) => {
        setDocumentId(response.data.documentId);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const handleDownload = () => {
    setLoading(true);

    axios
      .post("/redacted-download", { documentId })
      .then((response) => {
        // Assuming a successful response status is 2xx
        // Handle the downloaded document, e.g., open it in a new tab
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Current Document is: {documentId}</h1>
      <button
        className="btn-primary"
        onClick={handleDownload}
        disabled={loading}
      >
        {loading ? "Downloading..." : "Download Redacted Copy"}
      </button>
      {/* todo: Error component */}
      {/* {error && <div style={{ color: "red" }}>{error}</div>} */}
    </div>
  );
};

export default DocumentValidation;
