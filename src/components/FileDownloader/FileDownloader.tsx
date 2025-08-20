import React from "react";
import "./FileDownloader.css";

interface File {
  name: string;
  device: string;
  path: string;
  status: string;
}

interface FileDownloaderProps {
  filesData: File[];
}

const FileDownloader: React.FC<FileDownloaderProps> = ({ filesData }) => {
  if (!filesData || filesData.length === 0) {
    return <p>No files available.</p>;
  }

  return (
    <table className="file-table" aria-label="File download table">
      <thead>
        <tr>
          <th>Select</th>
          <th>Name</th>
          <th>Device</th>
          <th>Path</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {filesData.map((file) => (
          <tr key={`${file.device}-${file.path}`}>
            <td>
              <input type="checkbox" aria-label={`Select ${file.name}`} />
            </td>
            <td>{file.name}</td>
            <td>{file.device}</td>
            <td>{file.path}</td>
            <td className="status">
              {file.status}
              {file.status === "available" && (
                <span
                  className="green-tick"
                  role="img"
                  aria-label="Available"
                ></span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FileDownloader;
