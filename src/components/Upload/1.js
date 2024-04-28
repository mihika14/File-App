import React, { useState } from "react";
import axios from "axios";
import "./Upload.css";
import SideMenu from "../SideMenu/SideMenu";
import Navbar from "../Navbar/Navbar";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadTime, setUploadTime] = useState(null);

  const onChange = (e) => {
    setFiles(e.target.files);
  };

  const onDelete = () => {
    setFiles([]);
    setUploadedFiles([]);
    setUploadTime(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const startTime = performance.now();

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadedFiles(res.data);
      alert("Files uploaded successfully");
    } catch (err) {
      console.error("Error uploading files: ", err);
    } finally {
      setLoading(false);
      const endTime = performance.now();
      const timeTaken = (endTime - startTime) / 1000;
      setUploadTime(timeTaken.toFixed(2));
    }
  };

  return (
    <>
      <Navbar />
      <SideMenu />
      <h2 className="upload-header">Upload Files</h2>
      <div className="file-upload">
        <div className="container">
          <div className="header">
            <label htmlFor="files">
              <i className="bx bx-cloud-upload cloudicon"></i>
              <p>Browse Files to upload!</p>
            </label>
            <input id="files" type="file" multiple onChange={onChange} />
          </div>
          <div className="footer">
            <i className="bx bxs-file-blank"></i>
            <p>{files.length > 0 ? `${files.length} files selected` : "Files not selected"}</p>
          </div>
          <div className="btn-group">
            <button className="upload-btn" onClick={onSubmit}>
              {loading ? "Uploading..." : "Upload"}
            </button>
            <button className="upload-btn" onClick={onDelete}>
              Delete
            </button>
          </div>
          {uploadTime && (
            <p>Time taken to upload: {uploadTime} seconds</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Upload;
