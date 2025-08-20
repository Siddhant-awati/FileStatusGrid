import React from "react";
import "./Home.css";
import FileDownloader from "../components/FileDownloader/FileDownloader";

const Home: React.FC = () => {
  return (
    <div className="content">
      <h1>This page demonstrates the FileDownloader component in action</h1>
      <FileDownloader />
    </div>
  );
};

export default Home;
