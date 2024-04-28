import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FileList.css";
import fileimage from "./fileimage.png";
export default function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/files");
      console.log("Response:", response.data);
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const downloadFile = async (filename) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/download/${filename}`,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const blob = new Blob([response.data]);

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", filename);

      // Simulate a click on the link to trigger the download
      document.body.appendChild(link);
      link.click();

      // Remove the link from the DOM
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      <h2 className="filelist-header">All Files</h2>
      <div className="card-container">
        {files.map((file) => (
          <div className="card" key={file._id}>
            <div className="file-info">
              <i className="bx bxs-file-blank"></i>
              <p className="card-title">{file.filename}</p>
            </div>

            <p className="card-body">
              Added on: {new Date(file.dateAdded).toISOString().split("T")[0]}
            </p>

            <div className="btn-down">
              <button
                onClick={() => downloadFile(file.filename)}
                class="download-btn"
                type="button"
              >
                <span class="button__text">Download</span>
                <span class="button__icon">
                  <i class="bx bxs-download"></i>
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
