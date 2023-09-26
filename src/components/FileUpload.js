import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  
  const onDrop = async (acceptedFiles) => {
    
    acceptedFiles.forEach(async file => {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post('http://localhost:8000/api/upload/', formData);
        console.log('Files uploaded successfully', response.data);
        setUploadedFiles(prevState => [...prevState, file])
      } catch (error) {
        console.error('Error uploading files', error);
      }
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag and drop files here, or click to select files</p>
      </div>
      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;
