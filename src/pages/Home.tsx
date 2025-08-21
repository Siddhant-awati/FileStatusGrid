import React from "react";
import "./Home.css";
import FileDownloader from "../components/FileDownloader/FileDownloader";
import { useFilesData } from "../hooks/useFilesData";

/*
Change this URL to load other test data

For all scheduled files
const URL = "/mock-data/files-one.json"

For all available files
const URL = "/mock-data/files-two.json"

For pagination
const URL = "/mock-data/files-pages.json"
*/

const URL = "/mock-data/files.json";
const Home: React.FC = () => {
  const { filesData, loading, error } = useFilesData(URL);

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
