import React, { useMemo, useState } from "react";
import "./FileDownloader.css";
import type { FileModel } from "../../types/FileModel";
import {
  getFileKey,
  getAvailableFiles,
  getSelectAllState,
  toggleKey,
  formatDownloadMessage,
} from "../../utils/fileHandlerUtils";

interface FileDownloaderProps {
  filesData: FileModel[];
  downloadFiles?: (files: FileModel[]) => void;
}

const FileDownloader: React.FC<FileDownloaderProps> = ({
  filesData,
  downloadFiles,
}) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const availableFiles = useMemo(
    () => getAvailableFiles(filesData),
    [filesData]
  );

  const availableKeys = useMemo(
    () => availableFiles.map(getFileKey),
    [availableFiles]
  );

  const selectAllState = useMemo(
    () => getSelectAllState(selectedKeys, availableKeys),
    [selectedKeys, availableKeys]
  );

  const toggleSelectAll = () => {
    setSelectedKeys(selectAllState === "all" ? [] : availableKeys);
  };

  const toggleFile = (file: FileModel) => {
    const key = getFileKey(file);
    setSelectedKeys((prev) => toggleKey(key, prev));
  };

  const handleDownload = () => {
    const selectedFiles = filesData.filter((file) =>
      selectedKeys.includes(getFileKey(file))
    );

    if (downloadFiles) {
      downloadFiles(selectedFiles);
    } else {
      alert(
        `Downloading selected files:\n\n${formatDownloadMessage(selectedFiles)}`
      );
    }
  };

  if (filesData.length === 0) {
    return <p role="status">No files available.</p>;
  }

  return (
    <section className="wrapper">
      <div className="file-controls">
        <input
          type="checkbox"
          id="select-all"
          className="select-file"
          checked={selectAllState === "all"}
          ref={(el) => {
            if (el) el.indeterminate = selectAllState === "some";
          }}
          onChange={toggleSelectAll}
          aria-checked={
            selectAllState === "some" ? "mixed" : selectAllState === "all"
          }
        />
        <label htmlFor="select-all" className="cb-label">
          {selectedKeys.length > 0
            ? `Selected ${selectedKeys.length}`
            : "None Selected"}
        </label>

        <button
          className="primary download-btn"
          onClick={handleDownload}
          disabled={selectedKeys.length === 0}
        >
          <img
            src="/assets/download-icon.png"
            alt=""
            aria-hidden="true"
            className="download-icon"
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
          {filesData.map((file) => {
            const key = getFileKey(file);
            const isSelected = selectedKeys.includes(key);
            const isAvailable = file.status === "available";

            return (
              <tr key={key} className={isSelected ? "selected" : ""}>
                <td>
                  <label htmlFor={`checkbox-${key}`}>
                    <input
                      type="checkbox"
                      id={`checkbox-${key}`}
                      className="select-file"
                      checked={isSelected}
                      disabled={!isAvailable}
                      onChange={() => toggleFile(file)}
                      aria-label={`Select file: ${file.name}`}
                      aria-checked={isSelected}
                      aria-disabled={!isAvailable}
                    />
                  </label>
                </td>
                <td>{file.name}</td>
                <td>{file.device}</td>
                <td>{file.path}</td>
                <td className="status">
                  <span>{file.status}</span>
                  {isAvailable && (
                    <span
                      className="green-tick"
                      role="img"
                      aria-label="Available"
                    ></span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default FileDownloader;
