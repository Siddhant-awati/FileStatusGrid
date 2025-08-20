import React from "react";
import "./FileDownloader.css";
import { useFilesData } from "../../hooks/useFilesData";

const FileDownloader: React.FC = () => {
  const { filesData, loading, error } = useFilesData("/mock-data/files.json");

  return (
    <div className="file-downloader">
      {loading && <p>Loading files...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {filesData.map((file) => (
            <li key={file.name}>
              <strong>{file.name}</strong> on <strong>{file.device}</strong> —{" "}
              {file.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileDownloader;
