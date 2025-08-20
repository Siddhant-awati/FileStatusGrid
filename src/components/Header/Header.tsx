import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-text">File Status Grid Demo</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
