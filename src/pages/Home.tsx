import React from "react";
import "./Home.css";
import FileDownloader from "../components/FileDownloader/FileDownloader";
import { useFilesData } from "../hooks/useFilesData";

const Home: React.FC = () => {
  const { filesData, loading, error } = useFilesData("/mock-data/files.json");

  return (
    <div className="content">
      <h1>This page demonstrates the FileDownloader component in action</h1>

      {loading && <p>Loading files...</p>}
      {error && <p className="error">Error: {String(error)}</p>}
      {!loading && !error && filesData && (
        <FileDownloader filesData={filesData} />
      )}
    </div>
  );
};

export default Home;
