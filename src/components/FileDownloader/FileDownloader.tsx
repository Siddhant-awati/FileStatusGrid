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

const PAGE_SIZE = 10;

const FileDownloader: React.FC<FileDownloaderProps> = ({
  filesData,
  downloadFiles,
}) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(filesData.length / PAGE_SIZE);
  const paginatedFiles = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filesData.slice(start, start + PAGE_SIZE);
  }, [filesData, currentPage]);

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
        <label htmlFor="select-all" className="touch-target cb-label">
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
          {selectedKeys.length > 0
            ? `Selected ${selectedKeys.length}`
            : "None Selected"}
        </label>

        <button
          className="primary download-btn touch-target"
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
            <th className="status" scope="col">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedFiles.map((file) => {
            const key = getFileKey(file);
            const isSelected = selectedKeys.includes(key);
            const isAvailable = file.status === "available";

            const handleRowClick = (e: React.MouseEvent) => {
              if (
                (e.target as HTMLElement).tagName.toLowerCase() === "input" ||
                !isAvailable
              )
                return;
              toggleFile(file);
            };

            return (
              <tr
                key={key}
                className={`${isSelected ? "selected" : ""} ${
                  isAvailable ? "clickable" : "disabled"
                }`}
                onClick={handleRowClick}
              >
                <td>
                  <label
                    htmlFor={`checkbox-${key}`}
                    className={`touch-target ${!isAvailable ? "disabled" : ""}`}
                  >
                    <input
                      type="checkbox"
                      id={`checkbox-${key}`}
                      className="select-file"
                      checked={isSelected}
                      disabled={!isAvailable}
                      onChange={() => toggleFile(file)}
                      aria-label={`Select file: ${file.name}`}
                    />
                  </label>
                </td>
                <td>{file.name}</td>
                <td>{file.device}</td>
                <td>{file.path}</td>
                <td className="status">
                  {isAvailable && (
                    <span
                      className="green-tick"
                      role="img"
                      aria-label="Available"
                    ></span>
                  )}
                  <span className={file.status}>{file.status}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="page-btn"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default FileDownloader;
