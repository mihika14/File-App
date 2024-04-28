import React, { useState } from "react";
import SideMenu from "../SideMenu/SideMenu";
import Navbar from "../Navbar/Navbar";
import FileList from "../FileList/FileList";
import './Homepage.css'

export default function Homepage() {
  return (
    <div className="homepage">
      <SideMenu />
      <Navbar />
      <div className="filelist-container">
        <FileList />
      </div>
    </div>
  );
}
