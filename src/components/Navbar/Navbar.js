import React, { useState } from "react";
import "./Navbar.css";
import { FaRegUserCircle } from "react-icons/fa";
export default function Navbar() {
  const [showSignOut, setShowSignOut] = useState(false);

  const handleUserIconClick = () => {
    setShowSignOut(!showSignOut);
  };

  const handleSignOut = () => {
    console.log("Signing out...");
  };

  return (
    <div>
      <div class="topnav">
        <div class="group">
          <i class="bx bx-search-alt-2 icon"></i>
          <input placeholder="Search in Drive" type="search" class="input" />
        </div>

        <div className="user-icon-container">
          <i class="bx bxs-user-circle" onClick={handleUserIconClick}></i>
          {showSignOut && (
            <div className="sign-out-options">
              <p onClick={handleSignOut}>Sign Out</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
