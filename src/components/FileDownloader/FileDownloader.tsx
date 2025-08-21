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
    return <p role="status">No files available.</p>;
  }

  return (
    <section className="wrapper">
      <div className="file-controls">
        <label htmlFor="selectAll" className="cb-label">
          <input id="selectAll" type="checkbox" className="select-file" />
          Select All
        </label>

        <button className="primary download-btn">
          <img
            className="download-icon"
            src="/assets/download-icon.png"
            alt=""
            aria-hidden="true"
          />
          <span>Download Selected</span>
        </button>
      </div>

      <table className="file-table" aria-label="File download table">
        <thead>
          <tr>
            <th scope="col">Select</th>
            <th scope="col">Name</th>
            <th scope="col">Device</th>
            <th scope="col">Path</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {filesData.map((file, index) => (
            <tr key={`${file.device}-${file.path}`}>
              <td>
                <label>
                  <input
                    className="select-file"
                    type="checkbox"
                    aria-label={`Select file: ${file.name}`}
                    disabled={file.status !== "available"}
                  />
                </label>
              </td>
              <td>{file.name}</td>
              <td>{file.device}</td>
              <td>{file.path}</td>
              <td className="status">
                <span>{file.status}</span>
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
    </section>
  );
};

export default FileDownloader;
