import React, { useEffect, useState } from 'react';
import fileService from '../services/fileService';
import FileUpload from '../components/FileUpload';
import { useParams } from "react-router-dom";

function RepositoryDetail() {
  const { id } = useParams();
  const repoId = id;
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const data = await fileService.listFiles(repoId);
      setFiles(data);
    } catch (error) {
      console.error("Failed to load files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [repoId]);

  const handleDownload = async (fileId, fileName) => {
    const blob = await fileService.downloadFile(repoId, fileId);
    const url = window.URL.createObjectURL(new Blob([blob]));
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  };

  const handleDelete = async (fileId) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      await fileService.deleteFile(repoId, fileId);
      setFiles(files.filter((f) => f.id !== fileId)); 
      alert("File deleted successfully!");
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file!");
    }
  };

  return (
    <div>
      <h3>Files</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Author</th>  
            <th>Uploaded</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {files.map(file => (
            <tr key={file.id}>
              <td>{file.name}</td>
              <td>{file.fileType}</td>
              <td>{file.authorName}</td>   
              <td>{new Date(file.createdAt).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => handleDownload(file.id, file.name)}
                  className="btn btn-sm btn-outline-primary"
                >
                  Download
                </button>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="btn btn-sm btn-outline-danger ms-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <FileUpload repoId={repoId} onFileUploaded={fetchFiles} />
    </div>
  );
}

export default RepositoryDetail;
