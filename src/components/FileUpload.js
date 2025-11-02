import React, { useState } from 'react';
import fileService from '../services/fileService';

function FileUpload({ repoId, onFileUploaded }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = e => setSelectedFile(e.target.files[0]);

  const handleUpload = async () => {
    if (selectedFile) {
      await fileService.uploadFile(repoId, selectedFile);
      if (onFileUploaded) onFileUploaded(); // Refresh files list
      setSelectedFile(null);
    }
  };

  return (
    <div className="mt-4">
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="btn btn-success ms-2"
        disabled={!selectedFile}
      >
        Upload
      </button>
    </div>
  );
}

export default FileUpload;
