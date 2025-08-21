import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container" data-testid="header-container">
        <div className="logo" data-testid="logo">
          <span className="logo-text">File Status Grid Demo</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
