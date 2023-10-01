import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './css/SortedDocuments.css';
import AuthContext from '../context/AuthContext';

function SortedDocumentErrors() {
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [sortColumn, setSortColumn] = useState('document');
  const [sortOrder, setSortOrder] = useState('asc');
  const { authTokens } = useContext(AuthContext);
  const [documentCounts, setDocumentCounts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000//api/errors/details', {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authTokens.access}`,
      },
    })
      .then((response) => {
        setData(response.data);
        groupDataByErrorType(response.data);
        groupDataByDocument(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const groupDataByErrorType = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      const errorType = item.error_type;
      const errorSubType = item.error_sub_type;
      const key = `${errorType}-${errorSubType}`;
      if (!groupedData[key]) {
        groupedData[key] = {
          error_type: errorType,
          error_sub_type: errorSubType,
          count: 1,
        };
      } else {
        groupedData[key].count += 1;
      }
    });
    const groupedDataArray = Object.values(groupedData);
    setGroupedData(groupedDataArray);
  };

  const handleSort = (column) => {
    const newSortOrder = column === sortColumn ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    const sortedData = [...data];

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
      if (a[column] != null && b[column] != null) {
        return newSortOrder === 'asc'
          ? a[column].toString().localeCompare(b[column].toString())
          : b[column].toString().localeCompare(a[column].toString());
      }
      return 0;
    });

    setData(sortedData);
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const handleGroupedSort = (column) => {
    const newSortOrder = column === sortColumn ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    const sortedGroupedData = [...groupedData];

    sortedGroupedData.sort((a, b) => {
      if (column === 'error_type') {
        return newSortOrder === 'asc'
          ? a.error_type.localeCompare(b.error_type)
          : b.error_type.localeCompare(a.error_type);
      } else if (column === 'error_sub_type') {
        return newSortOrder === 'asc'
          ? a.error_sub_type.localeCompare(b.error_sub_type)
          : b.error_sub_type.localeCompare(a.error_sub_type);
      } else if (column === 'count') {
        return newSortOrder === 'asc' ? a.count - b.count : b.count - a.count;
      }
      return 0;
    });

    setGroupedData(sortedGroupedData);
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };
  const groupDataByDocument = (data) => {
    const documentCountsMap = new Map();
    data.forEach((item) => {
      const document = item.document;
      if (!documentCountsMap.has(document)) {
        documentCountsMap.set(document, 1);
      } else {
        documentCountsMap.set(document, documentCountsMap.get(document) + 1);
      }
    });
    const documentCountsArray = Array.from(documentCountsMap).map(([document, count]) => ({
      document,
      count,
    }));
    setDocumentCounts(documentCountsArray);
  };
  const renderSortArrow = (column) => {
    if (column === sortColumn) {
      if (sortOrder === 'asc') {
        return <i className="arrow-up"></i>;
      } else {
        return <i className="arrow-down"></i>;
      }
    } else {
      return null; // No arrow if the column is not currently sorted
    }
  };

  return (
    <div>
      <h1 className="mt-4">By Error Type</h1>
      <table className="custom-table">
        <thead className="custom-table-header">
          <tr>
            <th onClick={() => handleGroupedSort('error_type')}>
              Error Type {renderSortArrow('error_type')}
            </th>
            <th onClick={() => handleGroupedSort('error_sub_type')}>
              Error Subtype {renderSortArrow('error_sub_type')}
            </th>
            <th onClick={() => handleGroupedSort('count')}>
              Count {renderSortArrow('count')}
            </th>
          </tr>
        </thead>
        <tbody>
          {groupedData.map((item, index) => (
            <tr key={index}>
              <td>{item.error_type}</td>
              <td>{item.error_sub_type}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1 className="mt-4">DocumentError Details</h1>
      <table className="custom-table">
        <thead className="custom-table-header">
          <tr>
            <th onClick={() => handleSort('document')}>
              Document {renderSortArrow('document')}
            </th>
            <th onClick={() => handleSort('error_type')}>
              Error Type {renderSortArrow('error_type')}
            </th>
            <th onClick={() => handleSort('error_sub_type')}>
              Error Subtype {renderSortArrow('error_sub_type')}
            </th>
            <th onClick={() => handleSort('error_msg')}>
              Error Message {renderSortArrow('error_msg')}
            </th>
            <th onClick={() => handleSort('sentence')}>
              Sentence {renderSortArrow('sentence')}
            </th>
            <th onClick={() => handleSort('char_position_in_text_from')}>
              Char Position From {renderSortArrow('char_position_in_text_from')}
            </th>
            <th onClick={() => handleSort('char_position_in_text_to')}>
              Char Position To {renderSortArrow('char_position_in_text_to')}
            </th>
            <th onClick={() => handleSort('replacements')}>
              Replacements {renderSortArrow('replacements')}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.document}</td>
              <td>{item.error_type}</td>
              <td>{item.error_sub_type}</td>
              <td>{item.error_msg}</td>
              <td>{item.sentence}</td>
              <td>{item.char_position_in_text_from}</td>
              <td>{item.char_position_in_text_to}</td>
              <td>{item.replacements}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SortedDocumentErrors;
