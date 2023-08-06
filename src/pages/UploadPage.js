import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'

const UploadPage = () => {
    // This is the upload page, only logged in users can access this page. 
    // Currently Nothing in this page works, I tried to implement the upload functionality but there seems to be some request error. 
    let { authTokens } = useContext(AuthContext);

    // const [selectedFiles, setSelectedFiles] = useState([]);
    // const handleFileChange = (e) => {
    //     setSelectedFiles([...e.target.files]);
    // };

    // const handleUpload = async () => {
    //     if (selectedFiles.length === 0) {
    //         alert('Please select files first');
    //         return;
    //     }
    //     const formData = new FormData();
    //     selectedFiles.forEach((file) => {
    //         formData.append('files', file);
    //     });

    //     try {
    //         // Replace this URL with your server-side endpoint for handling file uploads
    //         const response = await fetch('http://localhost:8000/api/upload/', {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': `Bearer ${String(authTokens.access)}`
    //             },
    //             body: formData,
    //         });
    //         if (response.ok) {
    //             alert('Files uploaded successfully');
    //         } else {
    //             alert('Failed to upload the files');
    //         }
    //     } catch (error) {
    //         console.error('Error while uploading the files:', error);
    //         alert('Error occurred while uploading the files');
    //     }
    // };

    return (
        <div>
            <p>This is the Upload Page.</p>
            {/* <div>
                <h2>Multiple File Upload</h2>
                <input type="file" multiple onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div> */}

        </div>
    )
}

export default UploadPage

