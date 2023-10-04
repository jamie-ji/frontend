import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './css/SortedDocuments.css';
import AuthContext from '../context/AuthContext';

function SortedDocuments() {
  const [data, setData] = useState([]);
  const [sortColumn, setSortColumn] = useState('uploaded_at');
  const [sortOrder, setSortOrder] = useState('asc');

  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    axios.get('http://localhost:8000//api/documents', {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authTokens.access}`,
      },
    }).then((response) => {
        setData(response.data);
    }).catch((error) => {
        console.error('Error:', error);
    });
  }, [authTokens.access]);

  const handleButtonClick = () => {
    axios.get("http://localhost:8000/api/submit", {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authTokens.access}`
      },
    }).then((response) => {
        console.log('Response:', response.data);
    }).catch((error) => {
        console.error('Error:', error);
    });
  };
  const handleSort = (column) => {
  // Toggle sorting order if clicking on the same column
  const newSortOrder = column === sortColumn ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';

  // Sort the data based on the selected column and order
  const sortedData = [...data]; // Create a copy of the data array

  sortedData.sort((a, b) => {
    if (column === 'uploaded_at') {
      const dateA = new Date(a[column]).getTime();
      const dateB = new Date(b[column]).getTime();
      return newSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
    if (column === 'word_count') {
      const numA = parseInt(a[column], 10);
      const numB = parseInt(b[column], 10);

      return newSortOrder === 'asc' ? numA - numB : numB - numA;
    }
    // For non-date columns, use localeCompare for string comparison
    if (a[column] != null && b[column] != null) {
      return newSortOrder === 'asc'
        ? a[column].toString().localeCompare(b[column].toString())
        : b[column].toString().localeCompare(a[column].toString());
    }

    return 0;
  });

  setData(sortedData);
  // console.log(sortedData)
  setSortColumn(column);
  setSortOrder(newSortOrder);
};

return (
    <div>
      <h1 className="mt-4">Documents</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Button on the right using the custom CSS class */}
        <button className="btn btn-primary align-right" onClick={handleButtonClick}>
          analyze
        </button>
      </div>
      <table className="custom-table">
        <thead className="custom-table-header">
          <tr>
            <th onClick={() => handleSort('filename')}>Filename</th>
            <th onClick={() => handleSort('category')}>Genre</th>
            <th onClick={() => handleSort('word_count')}>Word Count</th>
            <th
              onClick={() => handleSort('uploaded_at')}
              className={sortColumn === 'uploaded_at' ? 'active' : ''}
            >
              Date
              {sortColumn === 'uploaded_at' && sortOrder === 'asc' && <i className="arrow-up"></i>}
              {sortColumn === 'uploaded_at' && sortOrder === 'desc' && <i className="arrow-down"></i>}
            </th>
            <th onClick={() => handleSort('author')}>Author</th>
            <th onClick={() => handleSort('analysis_complete')}>Analysis Complete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.filename}</td>
              <td>{item.category}</td>
              <td>{item.word_count}</td>
              <td>
                {new Date(item.uploaded_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>
              <td>{item.author}</td>
              <td>{item.analysis_complete ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SortedDocuments;
