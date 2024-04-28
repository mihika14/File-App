import React, { useState } from 'react';
import './SideMenu.css'; // Import CSS file for styling
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
function SideMenu() {
 return (
    <div className='side-navbar'>
    <div className='sidebar'>
      <div className="logo-details">
        <div className="logo_name">Upload Files</div>
      </div>
      <ul className="nav-list">
        <li>
          <Link to='/home'>
            <i className='bx bx-user'></i>
            <span className="links_name">Home</span>
          </Link>
        </li>
        <li>
          <Link to='/uploadfile'>
            <i className='bx bx-desktop'></i>
            <span className="links_name">Computers</span>
            </Link>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-star'></i>
            <span className="links_name">Starred</span>
          </a>
        </li>
      </ul>
    </div>
    </div>
  );
}

export default SideMenu;
